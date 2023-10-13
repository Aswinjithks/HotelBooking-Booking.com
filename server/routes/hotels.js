import express from "express";
import { createHotel, deleteHotel, getHotel, updateHotel, getHotels, countByCity, countByType,getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/veryToken.js";




const router = express.Router()

//CREATE
router.post('/', verifyAdmin, createHotel)
//UPDATE
router.put('/:id', verifyAdmin, updateHotel)
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)
//GET SINGLE HOTEL
router.get('/find/:id', getHotel)
// GET BY CITY
router.get('/countByCity', countByCity)
// GET BY TYPE
router.get('/countByType', countByType)
// GET ALL HOTEL
router.get('/', getHotels)
// GET HOTEL ROOM
router.get('/room/:id',getHotelRooms)





export default router