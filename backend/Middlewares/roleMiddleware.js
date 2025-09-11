const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    
    if (!req.user.role) {
      return res.status(403).json({ success: false, message: "User role not found." });
    }

    
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required: ${roles.join(" or ")} | Your role: ${req.user.role}`
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
