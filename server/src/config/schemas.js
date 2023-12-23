const Joi = require("joi");

const schemas = {
  registerUserSchem: Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    image: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  }),
  loginUserSchem: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  updateUserProfileSchem: Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    image: Joi.string(),
    phoneNumber: Joi.string()
      .min(6)
      .max(20)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
  updateUserPasswordSchem: Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  }),
  createMerchantSchem: Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    image: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
    categories: Joi.number().required(),
    city: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
  }),
  loginMerchantSchem: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  createCategory: Joi.object().keys({
    name: Joi.string().min(3).required(),
  }),
  updateImageMerchantSchem: Joi.object().keys({
    image: Joi.string().required(),
  }),
  updatePasswordMerchantSchem: Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  }),
  createVenueSchem: Joi.object().keys({
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    merchantId: Joi.number().required(),
    startHour: Joi.number().required(),
    endHour: Joi.number().required(),
    image: Joi.string().required(),
  }),
  updateVenueSchem: Joi.object().keys({
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    merchantId: Joi.number().required(),
    startHour: Joi.number().required(),
    endHour: Joi.number().required(),
    image: Joi.string(),
  }),
  updateVenueImageSchem: Joi.object().keys({
    image: Joi.string().required(),
  }),
  sendEmailAfterPaymentSchem: Joi.object().keys({
    url: Joi.string().required(),
  }),
  forgotPasswordSchem: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  updateForgotPasswordSchem: Joi.object().keys({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  }),
};

module.exports = schemas;
