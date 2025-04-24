const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const User = require("../models/user"); 

router.put("/add-favourite", async (req, res) => {
    try {
        const { bookid } = req.body; 
        const { id } = req.headers;
        const userData = await User.findById(id);
        const idBookFavourite = userData.favourites.includes(bookid);

        if (idBookFavourite) {
            return res.status(200).json({ message: "Book already in favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favourites" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/delete-favourite",  async (req, res) => {
    try {
        const { bookid } = req.body; 
        const { id } = req.headers;
        const userData = await User.findById(id);
        const idBookFavourite = userData.favourites.includes(bookid); 

        if (!idBookFavourite) {
            return res.status(400).json({ message: "Book not in favourites" });
        }
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/get-favourites", async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('favourites'); 
        return res.status(200).json({ message: "Fetched favourites successfully", data: userData.favourites });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
