const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "movies", required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: "theatre", required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model("shows", showSchema);