import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import mongoose from 'mongoose';

const router = express.Router();

// Validation and sanitization middleware
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('projectType').optional().trim().escape(),
  body('message').trim().notEmpty().withMessage('Message is required').escape()
];

// POST /api/contact — submit contact form
router.post('/', contactValidation, async (req, res) => {
  // 1. Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, projectType, message } = req.body;
    
    // 2. Attempt Database Storage (graceful when DB is offline)
    if (mongoose.connection.readyState === 1) {
      const contact = new Contact({
        name,
        email,
        projectType,
        message,
      });
      await contact.save();
      console.log(`[CONTACT SAVED] New inquiry from ${name} (${email}) for project type: ${projectType || 'General'}`);
    } else {
      // Log the submission even when DB is offline so no data is silently lost
      console.log(`[CONTACT RECEIVED - DB OFFLINE] From: ${name} (${email}), Type: ${projectType || 'General'}, Message: ${message}`);
    }

    // 3. Always send success to the user
    res.status(201).json({ success: true, message: 'Message received successfully. Our team will get back to you shortly.' });
    
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ error: 'Failed to process message due to a server error.' });
  }
});

export default router;
