import express from 'express';

const router = express.Router();

// ✅ Contact form submission endpoint
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, inquiry, region, description, subscribe } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !inquiry) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Log the contact form submission
    console.log('📧 Contact Form Submission:', {
      firstName,
      lastName,
      email,
      phone,
      inquiry,
      region,
      description: description?.substring(0, 50) + '...',
      subscribe,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// ✅ Health check for contact routes
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Contact routes are working'
  });
});

export default router;
