const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({   
    agencyId: {
        type: mongoose.Types.ObjectId,
        ref: 'agency',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    totalBill: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toObject: {getters: true},
    toJSON: {getters: true},
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;