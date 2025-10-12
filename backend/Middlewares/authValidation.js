const Joi = require('joi');

const signupValidation = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
    role: Joi.string().valid("Citizen", "Admin", "Moderator").optional().default("Citizen"),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(), // 10–15 digit phone number
    address: Joi.string().max(200).optional(),
    cnic: Joi.string().pattern(/^[0-9]{13}$/).optional(), // 13 digits CNIC
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }

  req.body = value; 
  next();
};


const loginValidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
  });

  const { error } = Schema.validate(req.body);
  if(error){
    return res.status(400).json({message:"Bad request", error});
  }
  next();
}

const validateReport = (req, res, next) => {
  const { error } = createReportSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

const updateProfileValidation = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid("Citizen", "Admin", "Moderator").optional(),
    password: Joi.string().min(4).max(10).optional(),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }

  req.body = value;
  next();
};


module.exports = {
  signupValidation,
  loginValidation,
  updateProfileValidation,
  validateReport
}