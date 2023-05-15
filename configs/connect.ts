import mongoose, { Connection } from "mongoose";

let isConnected: Connection | null = null;

const connect = async () => {
  if (isConnected) return;

  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = dbConnection.connection;
    console.log('Connected to database');
  } 
  catch({ message }: any) {
    console.log(message);
  }
};

export default connect;