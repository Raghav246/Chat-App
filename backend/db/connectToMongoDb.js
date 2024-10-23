import mongoose from "mongoose";

export const connectToDb=async()=>{ 
        try{
     await mongoose.connect();
   
        }
        catch(e){
          console.log(e.error)
        }

}