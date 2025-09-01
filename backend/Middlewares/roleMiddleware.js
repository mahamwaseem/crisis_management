// roleMiddleware.js
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Check if user exists and has role
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required.", success: false });
    }
    
    if (!req.user.role) {
      return res.status(403).json({ message: "User role not found.", success: false });
    }
    
    // Convert single role to array for consistency
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`, 
        success: false 
      });
    }
    
    next();
  };
};

module.exports = roleMiddleware;