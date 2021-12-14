import mongoose from "mongoose";

const db = {
  connect: (DB_HOST: string) => {
    mongoose.connect(DB_HOST).catch((err) => {
      console.error(err);
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running."
      );
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};

export default db;
