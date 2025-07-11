
import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
});

const sosDetailsSchema = new mongoose.Schema(
  {
    useremail: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },

    personalInfo: {
      fullName: { type: String, required: true },
      dob: { type: String, required: true },
      age: { type: Number, required: true },
      bloodType: { type: String },
      medicalConditions: { type: String },
      allergies: { type: String },
      medications: { type: String },
      emergencyMedicalInfo: { type: String },
      passportPhotoUrl: { type: String, required: true },
    },
    emergencyContacts: {
      type: [emergencyContactSchema],
      validate: {
        validator: (contacts) =>
          contacts.length > 0 &&
          contacts.length <= 5 &&
          contacts.filter((c) => c.isPrimary).length === 1,
        message: "Provide 1 to 5 contacts with exactly one primary contact.",
      },
    },
    locationInfo: {
      homeAddress: { type: String },
      workAddress: { type: String },
      frequentLocations: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SosDetail", sosDetailsSchema);
