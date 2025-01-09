const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/bookingController");

bookingRouter.get("/slots", bookingController.getBookingPage)
bookingRouter.post("/book", bookingController.bookAppointment)
// bookingRouter.delete("/:taskId", bookingController.deleteTask)
// bookingRouter.put("/:taskId", bookingController.editTask)

module.exports = bookingRouter;    