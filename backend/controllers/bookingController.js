const Booking = require("../models/bookingSchema");

const getBookingPage = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }
        const allSlots = [
            "10:00-10:30", "10:30-11:00", "11:00-11:30", "11:30-12:00",
            "12:00-12:30", "12:30-1:00", "2:00-2:30", "2:30-3:00",
            "3:00-3:30", "3:30-4:00", "4:00-4:30", "4:30-5:00",
        ];
        const bookedSlots = await Booking.find({ date }).select("timeSlot");
        const bookedTimes = bookedSlots.map((slot) => slot.timeSlot);
        const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));
        res.json({ availableSlots });
    } catch (error) {
        console.error("Error fetching booking page:", error);
        res.status(500).json({ message: "Failed to fetch available dates." });
    }
};

const bookAppointment = async (req, res) => {
    try {
        const { name, phone, date, timeSlot } = req.body;

        if (!name || !phone || !date || !timeSlot) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingBooking = await Booking.findOne({ date, timeSlot });
        if (existingBooking) {
            return res.status(400).json({ error: "This slot is already booked." });
        }

        const newBooking = new Booking({ name, phone, date, timeSlot });
        await newBooking.save();

        res.status(201).json({ status: "success", message: "Appointment booked successfully!" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};


module.exports = { getBookingPage, bookAppointment };
