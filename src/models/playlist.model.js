import mongoose,{Schema} from "mongoose";

const playListSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    video : [{
        type : Schema.Types.ObjectId,
        ref : "Video"
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    visibility : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

export const PlayList = mongoose.model("PlayList",playListSchema)