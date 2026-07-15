import express from 'express';
import { body, validationResult } from 'express-validator';
import ChatMessage from '../models/ChatMessage.js';
import mongoose from 'mongoose';

const router = express.Router();

// Knowledge Base for the Elite Chatbot
const KNOWLEDGE_BASE = {
  vision: "Kitel's vision is to become a leading force shaping the digital future of businesses by blending local identity with global innovation.",
  mission: "Our mission is to deliver cutting-edge digital solutions that combine creativity, technology, and strategy, helping organizations improve efficiency.",
  purpose: "Our brand purpose is to bridge the gap between businesses and technology by creating intelligent digital solutions that simplify operations and unlock growth.",
  services: "We specialize in Professional Web Development, Custom Software Development, Enterprise Systems, Access Control Solutions, Integrated IT Services, and Digital Transformation.",
  tagline: "Our tagline is 'Simply Connected', which means technology made simple, everything connected, reliable solutions, long-term partnerships, and seamless digital experiences.",
  meaning: "Kitel comes from the Amharic word meaning 'Leaf'. It represents growth, innovation, adaptability, continuous evolution, sustainability, and transformation.",
  contact: "You can reach our team via the contact form on this website, or at hello@kitel.com.",
  default: "I am the Kitel AI Assistant. I can assist you with information regarding our services, mission, vision, and operations. How may I help you today?"
};

function generateResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('vision')) return KNOWLEDGE_BASE.vision;
  if (msg.includes('mission')) return KNOWLEDGE_BASE.mission;
  if (msg.includes('purpose') || msg.includes('goal')) return KNOWLEDGE_BASE.purpose;
  if (msg.includes('service') || msg.includes('web') || msg.includes('software') || msg.includes('access control') || msg.includes('it ')) return KNOWLEDGE_BASE.services;
  if (msg.includes('tagline') || msg.includes('simply connected')) return KNOWLEDGE_BASE.tagline;
  if (msg.includes('kitel mean') || msg.includes('leaf') || msg.includes('name')) return KNOWLEDGE_BASE.meaning;
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('reach')) return KNOWLEDGE_BASE.contact;
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('what') || msg.includes('who') || msg.includes('how')) return KNOWLEDGE_BASE.default;
  
  // Strict rule: DO NOT invent information.
  return "I don't have that specific information in my database. Please contact Kitel directly via our contact form or at hello@kitel.com, and our team will gladly assist you.";
}

// Validation: message is required, sessionId is optional
const chatValidation = [
  body('message').trim().notEmpty().withMessage('Message is required').escape(),
  body('sessionId').optional().trim().escape()
];

// POST /api/chat — Handle chat messages
router.post('/', chatValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { message, sessionId } = req.body;
    
    const reply = generateResponse(message);

    // Attempt DB storage only if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      try {
        const userMsg = new ChatMessage({ role: 'user', content: message, sessionId: sessionId || 'anonymous' });
        const botMsg = new ChatMessage({ role: 'bot', content: reply, sessionId: sessionId || 'anonymous' });
        await userMsg.save();
        await botMsg.save();
      } catch (dbErr) {
        console.warn('Chat DB save failed (non-critical):', dbErr.message);
      }
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process message. Please try again later.' });
  }
});

export default router;
