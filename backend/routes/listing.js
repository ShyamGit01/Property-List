const router = require("express").Router();

const Listing = require("../model/ListingModel");

router.get("/", async (req, res) => {
    // res.send("Welcome to listing");
    try{
        const listing = await Listing.find();
        res.status(200).json({
            status : 0,
            message : "Data Fetch Successfully",
            data : listing
        })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

// Add new listing
router.post("/", async (req, res) => {
    const listing = new Listing({
        title : req.body.title,
        price : req.body.price,
        locality : req.body.locality,
        details : req.body.details
    });
    try{
        const savedListing = await listing.save();
        res.send(savedListing);
    } catch(error){
        res.status(400).send(error);
    }
})

// Single Listing
router.get("/:listingId", async (req, res) => {
    try{
        const listing = await Listing.findById(req.params.listingId);
        res.status(200).json({
            status : 0,
            message : "Data Fetch Successfully",
            data : listing
        })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

// Update Listing
router.put("/:listingId", (req, res) => {
    res.send("Update listing");
})

// Delete Listing
router.delete("/:listingId", (req, res) => {
    res.send("Delete listing");
})
module.exports = router;