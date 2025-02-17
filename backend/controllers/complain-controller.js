const Complain = require('../models/complainSchema.js');

const complainCreate = async (req, res) => {
    try {
        const newComplain = new Complain(req.body);
        const savedComplain = await newComplain.save();
        res.status(201).json(savedComplain);
    } catch (err) {
        res.status(500).json({ error: "Error saving complaint" });
    }
};

const complainList = async (req, res) => {
    try {
      console.log("Fetching complaints for school ID:", req.params.id); // Log the school ID
      let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
      
      console.log("Complaints found:", complains); // Log the result
      
      if (complains.length === 0) {
        return res.status(404).json({ message: "No complaints found" });
      }
  
      res.json(complains);  // Send the list of complaints as the response
    } catch (err) {
      console.error("Error fetching complaints:", err); // Log the error
      res.status(500).json(err);
    }
  };
  

module.exports = { complainCreate, complainList };
