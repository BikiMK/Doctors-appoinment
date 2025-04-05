import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || false);
    const [adminToken, setAdminToken] = useState(localStorage.getItem("atoken") || false);
    const [userData, setUserData] = useState(false);

    // Fetch user doctors list (for users)
    const getDoctorsData = useCallback(async () => {
        try {
            console.log("Fetching doctors from API...");
            const response = await axios.get(`${backendUrl}/api/admin/doctors`);
            console.log("API Response:", response);
            if (response.data.success) {
                setDoctors(response.data.doctors);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.response?.data?.message || "Error fetching doctors.");
        }
    }, [backendUrl]);
    
    

    // Fetch doctors for admin panel
    const getAdminDoctorsData = useCallback(async () => {
        if (!adminToken) return;
        try {
            console.log("Fetching doctors for admin...");
            const { data } = await axios.post(
                `${backendUrl}/api/admin/all-doctors`,
                {},
                { headers: { Authorization: `Bearer ${adminToken}` } }
            );
            console.log("Admin Doctors API Response:", data);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Admin doctor fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch doctors for admin.");
        }
    }, [adminToken, backendUrl]);

    // Fetch user profile data
    const loadUserProfileData = useCallback(async () => {
        if (!token) return;
        try {
            console.log("Fetching user profile...");
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("User Profile Response:", data);
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to load user profile.");
        }
    }, [token, backendUrl]);

    useEffect(() => {
        getDoctorsData();
    }, [getDoctorsData]);

    useEffect(() => {
        if (adminToken) getAdminDoctorsData();
    }, [adminToken, getAdminDoctorsData]);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token, loadUserProfileData]);

    const value = {
        doctors,
        currencySymbol,
        token, setToken,
        adminToken, setAdminToken,
        backendUrl,
        userData, setUserData, loadUserProfileData,
        getDoctorsData, getAdminDoctorsData
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;