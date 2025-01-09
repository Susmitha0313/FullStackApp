import React, { useEffect, useState } from "react";
import "./CSS/AppBooking.css";

const AppBooking = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  // const timeSlots = ["10:20","2:30"]
  const [selectedSlot, setSelectedSlot] = useState("");

  const apiUrl = "http://localhost:3000/api/booking";

  useEffect(() => {
    if (selectedDate) {
      fetch(`${apiUrl}/slots?date=${selectedDate}`)
        .then((response) => response.json())
        .then((data) => setTimeSlots(data.availableSlots || []))
        .catch((err) => console.error("Error fetching slots: ", err));
    }
  }, [selectedDate]);

const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

const handleBooking = () => {
  if (!name || !phone || !selectedDate || !selectedSlot) {
    setMessage("Please fill out all the fields.");
    return;
  }

  if (!validatePhone(phone)) {
    setMessage("Invalid phone number. Please enter a valid 10-digit number.");
    return;
  }

  fetch(`${apiUrl}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      date: selectedDate,
      timeSlot: selectedSlot,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        setMessage("Appointment booked successfully!");
        setTimeSlots(timeSlots.filter((slot) => slot !== selectedSlot));
      } else {
        setMessage(data.error || "Error booking appointment.");
      }
    })
    .catch((err) => setMessage("Server error. Please try again later."));
};


  return (
    <>
      <div className="booking-page">
        <h1>Appointment Booking</h1>

        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {selectedDate && (
          <div className="slots-container">
            <h2>Available Slots</h2>
            {timeSlots.length ? (
              timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`slot ${selectedSlot === slot ? "selected" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>No slots available for the selected date.</p>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="book-btn" onClick={handleBooking}>
          Book Appointment
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default AppBooking;
