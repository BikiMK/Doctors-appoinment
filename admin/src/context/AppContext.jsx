import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};


// ADDitional
const getDoctorsData = useCallback(async () => {
  try {
      console.log("Fetching doctors from API...");
      const response = await axios.get(`${backendUrl}/api/admin/doctors`);
      console.log("API Response:", response.data); // Log the full response
      if (response.data.success) {
          setDoctors(response.data.doctors);
          console.log("Doctors List:", response.data.doctors); // Log the doctors list
      } else {
          toast.error(response.data.message);
      }
  } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || "Error fetching doctors.");
  }
}, [backendUrl]);


export default AppContextProvider;
