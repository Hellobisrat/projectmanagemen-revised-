import mongoose from "mongoose";

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    default:""
  },
  priority:{
    type:String,
    enum:['Low','Medium','High'],
    default:'Low'
  },
  dueDate:{
    type:Date
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  completed:{
    type:Boolean,
    default:false
  },
   createdAt:{
    type:Date,
    default:Date.now
   }
})

const Task=mongoose.model('Task',taskSchema)
export default Task;