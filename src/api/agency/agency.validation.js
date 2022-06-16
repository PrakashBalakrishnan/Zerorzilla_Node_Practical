const Joi = require("@hapi/joi");

const createAgency = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    phoneNumber: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    clients: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required(),
          phoneNumber: Joi.string().required(),
          totalBill: Joi.number().required(),
        })
      )
      .required(),
  }),
};

module.exports = {
  createAgency,
};
