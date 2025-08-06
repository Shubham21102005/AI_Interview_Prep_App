
const Session= require('../models/Session.js')
const { generateInterviewQuestions, generateMoreQuestions } = require('../services/aiService.js');


const createSession = async (req, res) => {
  try {
    const { position, description, yoe } = req.body;
    if (!position || !description || !yoe) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert yoe to number
    const yoeNumber = parseInt(yoe, 10);
    if (isNaN(yoeNumber)) {
      return res.status(400).json({ message: 'Years of experience must be a valid number' });
    }

    // 🔹 Generate questions using Gemini
    const questions = await generateInterviewQuestions(position, description, yoeNumber);

    // 🔹 Create session with questions
    const session = await Session.create({
      user: req.user._id,
      position,
      description,
      yoe: yoeNumber,
      questions
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ message: error.message });
  }
};


const getSessions= async (req,res)=>{
    try {
        const sessions= await Session.find({user: req.user._id}).sort({createdAt:-1});
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({message: error.message});
    
    }
}

const getSession = async (req,res)=>{
    try {
        const session= await Session.findById(req.params.id);

        if(!session) return  res.status(404).json({message: 'Session not found'});
        // Use .equals() for robust ObjectId comparison
        if(!session.user.equals(req.user._id)) return res.status(401).json({message:'Unauthorized'})
        res.status(200).json(session);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteSession= async (req,res)=>{
    try {
        const session= await Session.findById(req.params.id);
        if(!session) return  res.status(404).json({message: 'Session not found'});
        // Use .equals() for robust ObjectId comparison
        if(!session.user.equals(req.user._id)) return res.status(401).json({message:'Unauthorized'})
        await Session.deleteOne({_id: req.params.id});
        res.status(200).json({message: 'Session deleted successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    
    }
}

const generateAdditionalQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const { count = 5 } = req.body;

    // Validate count
    const questionCount = parseInt(count, 10);
    if (isNaN(questionCount) || questionCount < 1 || questionCount > 10) {
      return res.status(400).json({ message: 'Count must be between 1 and 10' });
    }

    // Find the session
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check authorization
    if (!session.user.equals(req.user._id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Generate additional questions
    const additionalQuestions = await generateMoreQuestions(
      session.position,
      session.description,
      session.yoe,
      session.questions,
      questionCount
    );

    // Add new questions to the session
    session.questions.push(...additionalQuestions);
    await session.save();

    res.status(200).json({
      message: `${additionalQuestions.length} additional questions generated successfully`,
      newQuestions: additionalQuestions,
      totalQuestions: session.questions.length
    });
  } catch (error) {
    console.error("Generate additional questions error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports= {createSession,getSessions,getSession,deleteSession,generateAdditionalQuestions}