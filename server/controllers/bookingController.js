const Bookings = require("../models/bookingModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Show = require("../models/showModel");
const EmailHelper = require("../util/EmailHelper");

const makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    console.log(token.email, token.id);

    const paymentIntent = await stripe.charges.create({
      amount: amount, // Amount always needs to be in cents
      currency: "usd",
      receipt_email: token.email,
      source: "tok_visa",
      description: "Booking Movie",
    });

    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message:
        "Payment Processing. You will receive a confirmation once the payment is complete.",
      data: transactionId,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const bookShow = async (req, res) => {
  try {
    const newBooking = new Bookings(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    const populateBooking = await Bookings.findById(newBooking._id)
      .populate("users")
      .populate("shows")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    await EmailHelper("ticketTemplate.html", populateBooking.user.email, {
      name: populateBooking.user.name,
      movie: populateBooking.show.movie.movieName,
      theatre: populateBooking.show.theatre.name,
      date: populateBooking.show.date,
      time: populateBooking.show.time,
      seats: populateBooking.show.seats,
      amount: populateBooking.seats.length * populateBooking.show.ticketPrice,
      transactionId: populateBooking.transactionId,
    });

    res.send({
      success: true,
      message: "New Booking done",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ user: req.body.userId })
      .populate("users")
      .populate("shows")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched",
      data: bookings,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = { makePayment, bookShow, getAllBookings };