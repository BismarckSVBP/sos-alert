// ✅ Updated Controllers
import SosDetail from "../models/registerSosDetails.model.js";

// Helper: Calculate age from DOB
const calculateAgeFromDOB = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const registerSosDetails = async (req, res) => {
  try {
    const {
      useremail,
      mobile,

      personalInfo,
      emergencyContacts,
      locationInfo,
    } = req.body;

    if (
      !useremail ||
      !mobile ||
      !personalInfo ||
      !emergencyContacts ||
      !locationInfo
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await SosDetail.findOne({ useremail });
    if (existing) {
      return res
        .status(409)
        .json({ message: "SOS details already submitted." });
    }

    const newSos = new SosDetail({
      useremail,
      mobile,

      personalInfo: {
        ...personalInfo,
        age: calculateAgeFromDOB(personalInfo.dob),
      },
      emergencyContacts,
      locationInfo,
    });

    await newSos.save();
    return res
      .status(201)
      .json({ message: "SOS details submitted successfully." });
  } catch (error) {
    console.error("SOS Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSosDetails = async (req, res) => {
  try {
    const {
      useremail,
      mobile,

      personalInfo,
      emergencyContacts,
      locationInfo,
    } = req.body;

    if (!useremail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const existing = await SosDetail.findOne({ useremail });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "No SOS details found for this user." });
    }

    existing.mobile = mobile;

    existing.personalInfo = {
      ...personalInfo,
      age: calculateAgeFromDOB(personalInfo.dob),
    };
    existing.emergencyContacts = emergencyContacts;
    existing.locationInfo = locationInfo;

    await existing.save();
    return res
      .status(200)
      .json({ message: "SOS details updated successfully." });
  } catch (error) {
    console.error("Update SOS Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSosDetails = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    //console.log("updatse", email);
    const sos = await SosDetail.findOne({ useremail: email });
    //console.log("sos3", sos);
    if (!sos) {
      return res
        .status(404)
        .json({ message: "No SOS details found for this user" });
    }

    return res.status(200).json(sos);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
