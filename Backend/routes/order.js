const router = require ("express").Router();
const { authenticateToken } = require ("./userAuth");
const Book = require("../models//book");
const Order = require("../models/order");
const User  = require ("../models/user");

router.post("/place order",  async (req, res) => {
    try {
        const {id} = req.headers;
        const { order } = req.body;
        for (const orderData of order){
            const newOrder = new Order({user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();
            await User.findByIdAndUpdate(id,{
                $push: {orders: orderDataFromDb._id},
            });
            await User.findByIdAndUpdate(id,{
                $pull: {cart: orderData.id},
            });
        }
        return res.json({
            status:"success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred"
        });
    }
});

router.get("/get order history", async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book"},
        });
        const orderData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: orderData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred"
        });
    }
});


router.put("/update-status/:id", async (req, res) => {
    const { status } = req.body; 

    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        const updatedOrder = await Order.findById(id); 
        return res.json({
            status: "success",
            data: updatedOrder, 

            status: "success",
            data: orderData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred"
        });
    }
});
module.exports = router;
