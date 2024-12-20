const express = require('express');
const router = express.Router();

// Database model (example using Mongoose)
const Character = require('./models/Character');

router.post('/api/characters', async (req, res) => {
  try {
    const {
      email,
      website,
      description,
      voice,
      avatar
    } = req.body;

    // Create new character in database
    const character = new Character({
      email,
      website,
      description,
      voice: {
        id: voice.id,
        name: voice.name
      },
      avatar: {
        url: avatar.url,
        customizations: avatar.customizations
      },
      status: 'pending', // For tracking creation progress
      createdAt: new Date()
    });

    await character.save();

    // Send confirmation email
    await sendConfirmationEmail(email, {
      characterId: character._id,
      voiceName: voice.name
    });

    res.status(201).json({
      message: 'Character creation initiated',
      characterId: character._id
    });

  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({
      error: 'Failed to create character'
    });
  }
});

module.exports = router; 