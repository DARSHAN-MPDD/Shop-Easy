const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// In-memory storage for development
let users = [];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'shopeasysecret', {
    expiresIn: '30d'
  });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: null,
      verificationTokenExpires: null,
      resetPasswordToken: null,
      resetPasswordExpires: null
    };

    users.push(user);

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate OTP for verification
exports.generateOTP = () => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to user (simulated)
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Generate OTP
    const otp = this.generateOTP();
    
    // Set expiration time (10 minutes)
    const expires = Date.now() + 10 * 60 * 1000;
    
    // Save OTP and expiration to user
    user.verificationToken = otp;
    user.verificationTokenExpires = expires;
    
    // In a real application, you would send the OTP via email/SMS
    // For now, we'll just return a success message
    res.json({ 
      message: 'OTP sent successfully',
      // In real app, don't send OTP in response
      expiresIn: '10 minutes'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Find user with this email
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Check if OTP is valid and not expired
    if (user.verificationToken !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
    
    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    
    res.json({ 
      message: 'OTP verified successfully',
      verified: true
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Set reset password fields
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    // In a real application, you would send an email with the reset link
    // For now, we'll just return the token
    res.json({
      message: 'Reset token generated',
      resetToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    
    // Find user with this token and check if it's not expired
    const user = users.find(user => 
      user.resetPasswordToken === resetToken && 
      user.resetPasswordExpires > Date.now()
    );
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Set new password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};