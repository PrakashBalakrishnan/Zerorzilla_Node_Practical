const mongoose = require('mongoose');
const {pick} = require('lodash');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
    toObject: {getters: true},
    toJSON: {getters: true},
})

userSchema.methods.transform = function () {
    const user = this;
    return pick(user.toJSON(), ['name', 'email']);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('users', userSchema);

module.exports = User;