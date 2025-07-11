import SosDetail from "../models/registerSosDetails.model.js"; 


export const getAllSosDetails = async (req, res) => {
  try {
    const sosDetails = await SosDetail.find().sort({ createdAt: -1 }); 
    console.log("Fetched SOS details:", sosDetails);
    res.status(200).json(sosDetails);
  } catch (err) {
    console.error("Error fetching SOS details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
