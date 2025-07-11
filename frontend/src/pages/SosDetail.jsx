import React from "react";
import SosDetailsForm from "./SosDetailsForm";
import UpdateSosDetails from "./UpdateSosDetails";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

import { API_BASE_URL } from "../config";

const SosDetail = () => {
  const [sosDetails, setSosDetails] = useState(null);
  const navigate = useNavigate();

  const { logout, userEmail, user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const fetchSosDetails = async () => {
      try {
        console.log("Calling /getSosDetails with email:", user.email);
        const response = await axios.get(
          `${API_BASE_URL}/api/auth/getSosDetails`,
          {
            params: { email: user.email },
          }
        );

        setSosDetails(response.data || null);
      } catch (error) {
        console.error("Error fetching SOS details:", error);
        setSosDetails(null);
      }
    };

    fetchSosDetails();
  }, [user]);

  return (
    <div>
      {sosDetails ? (
        <UpdateSosDetails sosDetails={sosDetails} />
      ) : (
        <SosDetailsForm />
      )}
    </div>
  );
};

export default SosDetail;
