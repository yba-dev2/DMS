const jwt = require('jsonwebtoken');
const { User } = require('../../config/dbConnector');

const verifyToken = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ error: 'Missing token in query', received_params: req.query });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employeeId = decoded.employee_id || decoded.employeeId;
    if (!employeeId) {
      return res.status(400).json({ error: 'Missing employeeId in token' });
    }

    const userInfo = {
      employeeId,
      name: decoded.name,
      email: decoded.email,
      employeeCode: decoded.employee_code || decoded.employeeCode,
      department: decoded.department,
    };
    // Upsert user in MSSQL via Sequelize
    await User.upsert(userInfo);
    const user = await User.findOne({ where: { employeeId } });
    res.cookie('erp_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    req.session.userId = user.id;
    res.redirect('/welcome');

  } catch (err) {
    console.error('❌ Token verification error:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token', details: err.message });
  }
};

module.exports = { verifyToken };
