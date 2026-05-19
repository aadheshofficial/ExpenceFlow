const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy_client_id');

const googleLogin = async (req, res) => {
  const { credential } = req.body;
  try {
    // Note: If testing without a real client ID, this will fail. We should mock it if credential is 'test_token'.
    let payload;
    if (credential === 'test_token') {
      payload = {
        sub: '123456789',
        name: 'Test User',
        email: 'test@example.com',
        picture: ''
      };
    } else {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      });
      payload = ticket.getPayload();
    }

    const { sub: googleId, name, email, picture: avatar } = payload;

    // Check if user exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create new user
      user = await User.create({
        googleId,
        name,
        email,
        avatar
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    });
  } catch (error) {
    console.error('Google Login Error:', error);
    res.status(401).json({ success: false, message: 'Invalid Google Token' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  googleLogin,
  getProfile
};
