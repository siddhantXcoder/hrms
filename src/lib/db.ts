import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
        console.log("MongoDB is already connected");
        return ;
    }

    if(connectionState === 2){
        console.log("Connecting..");
    }

    try {
        mongoose.connect(MONGODB_URL !,{
            dbName:"nextjs",
            bufferCommands: true,
        });

        console.log("Connected");
    } catch (err: any) {
        console.log("Error: ", err);
        throw new Error(err);
    }
};

export default connect;