const jwt = require('jsonwebtoken');
const User = require('../../model/users');

const verifyToken = async (req, res) => {
  const token = req.query.token; // Or get from headers if needed
  console.log(process.env.JWT_SECRET);
  console.log(token);
  if (!token) {
    return res.status(400).json({
      error: 'Missing token in query',
      received_params: req.query,
    });
  }

  try {
    // Verify the token from ERP
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use public key if RS256
	
    const employeeId = decoded.employee_id || decoded.employeeId;
    if (!employeeId) {
      return res.status(400).json({ error: 'Missing employeeId in token' });
    }

    // Check if the user exists in DB
    const existingUser = await User.findOne({ employeeId });

    const userInfo = {
      employeeId: decoded.employee_id || decoded.employeeId,
      name: decoded.name,
      email: decoded.email,
      employeeCode: decoded.employee_code || decoded.employeeCode,
      department: decoded.department,
    };

    // Upsert user
    const user = await User.findOneAndUpdate(
      { employeeId },
      userInfo,
      { new: true, upsert: true }
    );

    // Save the original ERP token in cookie (not a new one)
    res.cookie('erp_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    req.session.userId = user._id;
    res.redirect('/welcome');

  } catch (err) {
    console.error('❌ Token verification error:', err.message);
    return res.status(403).json({
      error: 'Invalid or expired token',
      details: err.message,
    });
  }
};

module.exports = { verifyToken };
