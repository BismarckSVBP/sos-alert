import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Phone,
  MapPin,
  Camera,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { useToast } from "@/hooks/use-toast.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { API_BASE_URL } from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

const SosDetailsForm = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [dob, setDob] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user?.name || "",
      age: "",
      bloodType: "",
      medicalConditions: "",
      allergies: "",
      medications: "",
      emergencyMedicalInfo: "",
    },
    emergencyContacts: [
      { name: "", relation: "", phone: "", email: "", isPrimary: true },
    ],
    locationInfo: {
      homeAddress: "",
      workAddress: "",
      frequentLocations: "",
    },
    mobile: "",

    email: user?.email || "",
  });

  // useEffect(() => {
  //   const fetchSosDetails = async () => {
  //     if (!user?.email) return;

  //     try {
  //       const res = await axios.get(`${API_BASE_URL}/getSosDetails`, {
  //         params: { email: user.email },
  //       });

  //       if (res.data) {
  //         navigate("/update-sos-details");
  //       }
  //     } catch (err) {
  //       console.error("Error checking existing SOS details:", err);
  //     }
  //   };

  //   fetchSosDetails();
  // }, [user, navigate]);
  console.log("ksie", isAuthenticated);

  const handlePersonalInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...formData.emergencyContacts];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, emergencyContacts: updated }));
  };

  const handlePrimaryChange = (index) => {
    const updated = formData.emergencyContacts.map((c, i) => ({
      ...c,
      isPrimary: i === index,
    }));
    setFormData((prev) => ({ ...prev, emergencyContacts: updated }));
  };

  const addContact = () => {
    if (formData.emergencyContacts.length >= 5) return;
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", relation: "", phone: "", email: "", isPrimary: false },
      ],
    }));
  };

  const removeContact = (index) => {
    const updated = [...formData.emergencyContacts];
    updated.splice(index, 1);
    if (!updated.some((c) => c.isPrimary) && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    setFormData((prev) => ({ ...prev, emergencyContacts: updated }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      locationInfo: { ...prev.locationInfo, [field]: value },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    handlePersonalInfoChange("age", age.toString());
  };

  const validateContacts = () => {
    const emails = formData.emergencyContacts
      .map((c) => c.email.trim())
      .filter(Boolean);
    const uniqueEmails = new Set(emails);
    if (uniqueEmails.size !== emails.length) {
      toast({
        variant: "destructive",
        title: "Duplicate Emails",
        description: "Duplicate emergency contact emails are not allowed.",
      });
      return false;
    }
    if (!formData.emergencyContacts.some((c) => c.isPrimary)) {
      toast({
        variant: "destructive",
        title: "Primary Contact Missing",
        description: "Please select at least one primary contact.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactEmails = formData.emergencyContacts
      .map((c) => c.email?.trim())
      .filter(Boolean);

    const allEmails = [formData.email.trim(), ...contactEmails];
    const emailSet = new Set(allEmails);
    if (emailSet.size !== allEmails.length) {
      return toast({
        variant: "destructive",
        title: "Duplicate Emails Found",
        description: "Primary and emergency contact emails must be unique.",
      });
    }

    // Check for duplicate phone numbers
    const contactPhones = formData.emergencyContacts
      .map((c) => c.phone?.trim())
      .filter(Boolean);
    const allPhones = [formData.mobile.trim(), ...contactPhones];
    const phoneSet = new Set(allPhones);
    if (phoneSet.size !== allPhones.length) {
      return toast({
        variant: "destructive",
        title: "Duplicate Phone Numbers",
        description: "Primary and emergency contact numbers must be unique.",
      });
    }

    if (!imageFile) {
      toast({
        variant: "destructive",
        title: "Missing Photo",
        description: "Please upload your photo.",
      });
      return;
    }

    if (!dob) {
      toast({
        variant: "destructive",
        title: "Missing DOB",
        description: "Please select your date of birth.",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      toast({
        variant: "destructive",
        title: "Invalid Mobile",
        description: "Enter a valid 10-digit mobile number.",
      });
      return;
    }

    if (!validateContacts()) return;

    setIsLoading(true);

    try {
      const photoForm = new FormData();
      photoForm.append("image", imageFile);

      const uploadRes = await axios.post(
        `${API_BASE_URL}/api/auth/upload`,
        photoForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const photoUrl = uploadRes.data.imageUrl;

      const submissionData = {
        personalInfo: {
          ...formData.personalInfo,
          dob: dob ? dob.toISOString().split("T")[0] : "",
          passportPhotoUrl: photoUrl,
        },
        emergencyContacts: formData.emergencyContacts,
        locationInfo: formData.locationInfo,
        useremail: formData.email || user?.email, // <-- USE form email input
        mobile: formData.mobile,
      };

      await axios.post(
        `${API_BASE_URL}/api/auth/SosDetailssubmit`,
        submissionData
      );

      toast({
        title: "SOS Details Submitted",
        description: "Your emergency details have been submitted successfully!",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              SOS Emergency Details
            </h1>
            <p className="text-muted-foreground">
              Fill in your emergency information to ensure quick response in
              critical situations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload + Preview */}

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        required
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="mb-2"
                      onClick={() =>
                        document.getElementById("profileImage").click()
                      }
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload a recent photo for identification
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      value={formData.personalInfo.fullName}
                      onChange={(e) =>
                        handlePersonalInfoChange("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                      disabled
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="contact@example.com"
                      disabled
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {" "}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setFormData((prev) => ({ ...prev, mobile: val }));
                      }}
                      placeholder="Enter your 10-digit mobile number"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Date of Birth *
                    </label>
                    <DatePicker
                      selected={dob}
                      onChange={(date) => {
                        setDob(date);
                        if (date && date <= new Date()) {
                          calculateAge(date);
                        } else {
                          toast({
                            variant: "destructive",
                            title: "Invalid DOB",
                            description: "Date of birth must be in the past.",
                          });
                        }
                      }}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select your DOB"
                      className="w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground border-input"
                      maxDate={new Date()}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.personalInfo.age}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,3}$/.test(value)) {
                          handlePersonalInfoChange("age", value);
                        }
                      }}
                      placeholder="Auto-calculated from Date of Birth"
                      className="no-spinner"
                      disabled
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Blood Type
                    </label>
                    <select
                      value={formData.personalInfo.bloodType}
                      onChange={(e) =>
                        handlePersonalInfoChange("bloodType", e.target.value)
                      }
                      className="w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground border-input"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Medical Conditions
                    </label>
                    <Input
                      value={formData.personalInfo.medicalConditions}
                      onChange={(e) =>
                        handlePersonalInfoChange(
                          "medicalConditions",
                          e.target.value
                        )
                      }
                      placeholder="Any chronic conditions"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Allergies
                  </label>
                  <Input
                    value={formData.personalInfo.allergies}
                    onChange={(e) =>
                      handlePersonalInfoChange("allergies", e.target.value)
                    }
                    placeholder="Food, medication, or environmental allergies"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Current Medications
                  </label>
                  <Textarea
                    value={formData.personalInfo.medications}
                    onChange={(e) =>
                      handlePersonalInfoChange("medications", e.target.value)
                    }
                    placeholder="List current medications and dosages"
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Additional Emergency Medical Information
                  </label>
                  <Textarea
                    value={formData.personalInfo.emergencyMedicalInfo}
                    onChange={(e) =>
                      handlePersonalInfoChange(
                        "emergencyMedicalInfo",
                        e.target.value
                      )
                    }
                    placeholder="Any other important medical information for first responders"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {formData.emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-foreground">
                        {index === 0
                          ? "Primary Contact"
                          : `Emergency Contact ${index + 1}`}
                      </h4>
                      {index === 0 && (
                        <span className="bg-red-100 dark:bg-red-900/20 text-red-600 text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                      {formData.emergencyContacts.length > 1 && index !== 0 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => removeContact(index)}
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Name {index === 0 ? "*" : ""}
                        </label>
                        <Input
                          value={contact.name}
                          onChange={(e) =>
                            handleContactChange(index, "name", e.target.value)
                          }
                          placeholder="Contact name"
                          required={index === 0}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Relationship
                        </label>
                        <Input
                          value={contact.relation}
                          onChange={(e) =>
                            handleContactChange(
                              index,
                              "relation",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Father, Sister, Friend"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Phone Number {index === 0 ? "*" : ""}
                        </label>
                        <Input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => {
                            const val = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            handleContactChange(index, "phone", val);
                          }}
                          placeholder="+1 (555) 123-4567"
                          required={index === 0}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={contact.email}
                          onChange={(e) =>
                            handleContactChange(index, "email", e.target.value)
                          }
                          placeholder="contact@example.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.emergencyContacts.length < 5 && (
                  <Button type="button" onClick={addContact} variant="outline">
                    + Add Another Contact
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Home Address
                  </label>
                  <Input
                    value={formData.locationInfo.homeAddress}
                    onChange={(e) =>
                      handleLocationChange("homeAddress", e.target.value)
                    }
                    placeholder="Enter your home address"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Work Address
                  </label>
                  <Input
                    value={formData.locationInfo.workAddress}
                    onChange={(e) =>
                      handleLocationChange("workAddress", e.target.value)
                    }
                    placeholder="Enter your work address"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block ">
                    Frequent Locations
                  </label>
                  <Textarea
                    value={formData.locationInfo.frequentLocations}
                    onChange={(e) =>
                      handleLocationChange("frequentLocations", e.target.value)
                    }
                    placeholder="List places you visit frequently (gym, school, etc.)"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link to="/dashboard">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save SOS Details
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SosDetailsForm;
