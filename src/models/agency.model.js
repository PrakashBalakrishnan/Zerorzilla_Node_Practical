const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agencySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Agency = mongoose.model("agency", agencySchema);

module.exports = Agency;
