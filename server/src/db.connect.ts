import mongoose from "mongoose";

export default (connectionString: any) => {
  const connect = () => {
    try {
      mongoose
        .connect(connectionString)
        .then(() => {
          return console.info(`Successfully connected to ${connectionString}`);
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
