import mongoose from "mongoose";


const RoomScheema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxpeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{ number: Number, unAvailavableDates: { type: [Date] } }],


})

export default mongoose.model("Room", RoomScheema)