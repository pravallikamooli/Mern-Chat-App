import mongoose from 'mongoose';
const connectToMongoDb=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_DB_URL}/chat-app-db`)//chat-app-db
        console.log("connected to MongoDb")

    }catch(error){
        console.log("error Connecting To MOngoDB".error.message)
    }
}
export default connectToMongoDb;