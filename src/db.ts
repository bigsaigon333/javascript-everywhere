import { connect, connection } from "mongoose";

const db = {
  connect: (DB_HOST: string) => {
    connect(DB_HOST).catch((err) => {
      console.error(err);
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running."
      );
      process.exit();
    });
  },
  close: () => {
    connection.close();
  },
};

export default db;
