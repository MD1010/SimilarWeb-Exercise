import mongoose from "mongoose";

export default (db: any) => {
  const connect = () => {
    try {
      mongoose
        .connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          return console.info(`Successfully connected to ${db}`);
        })
        .catch((error) => {
          console.error("Error connecting to database: ", error);
          return process.exit(1);
        });
    } catch (e) {
      connect();
    }
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
