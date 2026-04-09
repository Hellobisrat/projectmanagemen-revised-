import mongoose,{connect} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI =process.env.MONGO_URI

const dbConnect = async()=>{
  try {
    await mongoose.connect(URI)
 console.log('db connected ')
  } catch (error) {
    process.exit(1)
    console.log(error)
    
  }
}

export default dbConnect;