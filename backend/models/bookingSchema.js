const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);