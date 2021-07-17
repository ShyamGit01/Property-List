const router = require("express").Router();
const verify = require("../routes/verifyToken");
const Listing = require("../model/ListingModel");

router.get("/", async (req, res) => {
    try{
        const listing = await Listing.find();
        res.send(listing);
        // res.status(200).json({
        //     status : 0,
        //     message : "Data Fetch Successfully",
        //     data : listing
        // })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

// Add new listing
router.post("/", verify, async (req, res) => {
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
        // res.status(200).json({
        //     status : 0,
        //     message : "Data Fetch Successfully",
        //     data : listing
        // })
        res.status(200).send(listing);
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

// Update Listing
router.put("/:listingId", verify, async (req, res) => {
    try{
        const listing = {
            title : req.body.title,
            price : req.body.price,
            locality : req.body.locality,
            details : req.body.details
        };

        const updatedListing = await Listing.findByIdAndUpdate({_id : req.params.listingId}, listing);
        res.status(200).json({
            status : 0,
            message : "Data Updated Successfully",
            data : {
                old_data : updatedListing,
                new_data : listing
            }
        })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

// Delete Listing
router.delete("/:listingId", verify, async (req, res) => {
    try{
        const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
        res.status(200).json({
            status : 0,
            message : "Data Deleted Successfully",
            data : removeListing
        })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

module.exports = router;