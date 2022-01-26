require("dotenv").config();
const mongoose = require("mongoose");

const Dishes = require("./models/dishes");
const url = process.env.MONGO_DB || `mongodb://localhost:27017/`;

mongoose
  .connect(url)
  .then((db) => {
    console.log("Connected correctly to server.");
    return Dishes.create({
      name: "Uthappizza 2",
      description: "Test Pizza",
    });
  })
  .then((dish) => {
    console.log(dish);
    return Dishes.findByIdAndUpdate(
      dish._id,
      {
        $set: { description: "Updated Pizza" },
      },
      {
        new: true,
      }
    ).exec();
  })
  .then((dish) => {
    console.log(dish);
    dish.comments.push({
      rating: 5,
      comments: "Great Job",
      author: "Kiattipong",
    });
    return dish.save();
  })
  .then((result) => {
    console.log(result);
    return Dishes.deleteMany({});
  })
  .then((result) => {
    console.log(result);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Disconnected.");
  })
  .catch((err) => {
    console.log(err);
  });
