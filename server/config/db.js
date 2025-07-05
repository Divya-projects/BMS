
const mongoose = require("mongoose");

console.log('fjdfffffffddddddddd')
// mongoose.connect(process.env.mongo_url, {});
mongoose.connect(
    process.env.mongo_url,
    {}
).then(() => console.log("db got connected"))
.catch((err) => console.error("db connection err", err))

console.log('mongoooo', process.env.mongo_url)

const connection = mongoose.connection;
console.log('djsahdsasssss', connection)
connection.on("connected", () => {
  console.log("Connection to MongoDB is successful");
});