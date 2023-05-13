import mongoose, { Connection } from "mongoose";

let isConnected: Connection | null = null;

const connect = async (): Promise<Connection | null> => {
  if (isConnected) return isConnected;

  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = dbConnection.connection;

    return isConnected;
  } 
  catch({ message }: any) {
    console.log(message);
    return null;
  }
};

export default connect;