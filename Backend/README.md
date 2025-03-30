# 🏥 **Medical Appointment Management System**

Welcome to the **Medical Appointment Management System**! This project is a backend application designed to streamline interactions between administrators, doctors, and users in a medical context. The system allows users to book appointments, upload prescriptions, manage medical records, and more. Additionally, it integrates an **AI Health Assistant** feature to provide personalized health recommendations and doctor suggestions.

Below is a breakdown of each component and how they work together to create a robust and maintainable backend.

---

## 🗂️ **Project Structure**

```bash
📦backend
 ┣ 📂config
 ┃ ┣ 📜cloudinary.js
 ┃ ┗ 📜mongodb.js
 ┣ 📂controllers
 ┃ ┣ 📜adminController.js
 ┃ ┣ 📜doctorController.js
 ┃ ┣ 📜userController.js
 ┃ ┗ 📜aiController.js
 ┣ 📂middlewares
 ┃ ┣ 📜authAdmin.js
 ┃ ┣ 📜authDoctor.js
 ┃ ┣ 📜authUser.js
 ┃ ┗ 📜multer.js
 ┣ 📂models
 ┃ ┣ 📜appointmentModel.js
 ┃ ┣ 📜doctorModel.js
 ┃ ┗ 📜userModel.js
 ┣ 📂routes
 ┃ ┣ 📜adminRoute.js
 ┃ ┣ 📜doctorRoute.js
 ┃ ┣ 📜userRoute.js
 ┃ ┗ 📜aiRoute.js
 ┣ 📜.env
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜server.js
 ┗ 📜vercel.json
```

---

## 📖 **Overview of Key Components**

### 1. **Config**
- **cloudinary.js**: Manages Cloudinary configurations for file uploads, such as user profile pictures and prescription documents.
- **mongodb.js**: Handles the connection to MongoDB, which stores data related to users, doctors, and appointments.

### 2. **Controllers**
- **adminController.js**, **doctorController.js**, **userController.js**: Contain the core business logic for handling actions like creating appointments, managing users, and doctor-specific functionalities.
- **aiController.js**: Manages AI-related functionalities like health recommendations, doctor suggestions, and other AI-powered health insights. This is an **add-on feature** that enhances the user experience.

### 3. **Middlewares**
- **authAdmin.js**, **authDoctor.js**, **authUser.js**: These files handle role-based authentication, ensuring that only authorized users (admins, doctors, and users) can access specific endpoints.
- **multer.js**: Configures Multer to handle file uploads, including prescription images and other documents.

### 4. **Models**
- **appointmentModel.js**, **doctorModel.js**, **userModel.js**: Define MongoDB schemas for appointments, doctors, and users. These schemas represent the data structure and relationships within the system.

### 5. **Routes**
- **adminRoute.js**, **doctorRoute.js**, **userRoute.js**: Map HTTP requests to the appropriate controller functions based on the user role (admin, doctor, user).
- **aiRoute.js**: Defines routes for interacting with the AI feature, such as getting health recommendations and doctor suggestions.

### 6. **Root Files**
- **.env**: Stores environment variables such as database URLs, API keys, and secrets.
- **package.json & package-lock.json**: Manage project dependencies.
- **server.js**: The main entry point that initializes the Express server, connects routes, middleware, and configurations.
- **vercel.json**: Configures deployment settings for easy deployment on Vercel.

---

## 🚀 **Getting Started**

### 📋 **Prerequisites**
1. **Node.js**: Make sure Node.js is installed. You can download it [here](https://nodejs.org/en/download/).
2. **MongoDB**: Ensure you have a MongoDB instance running locally or sign up for a free MongoDB Atlas cluster [here](https://www.mongodb.com/cloud/atlas).
3. **Cloudinary**: Set up a Cloudinary account to handle image uploads. You'll need your API key and secret.
4. **Optional: AI Integration**: If you want to use the AI Health Assistant feature, you'll need an API for the AI service (if using a custom AI service).

---

### 🧑‍💻 **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/MedicalAppointmentSystem.git
   cd MedicalAppointmentSystem
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key
   ADMIN_MAIL=your_admin_emailid
   ADMIN_PASSWORD=your_password
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

   The server will be up and running at [http://localhost:3000](http://localhost:3000).

---

## 📡 **API Endpoints**

### **Admin Endpoints**:
- **GET /admin/…**: Admin-specific actions (e.g., managing users, doctors, appointments).
  
### **Doctor Endpoints**:
- **GET /doctor/…**: Doctor-specific actions (e.g., viewing appointments, managing prescriptions).

### **User Endpoints**:
- **GET /user/…**: User-specific actions (e.g., viewing health recommendations, uploading prescriptions).

### **AI Health Assistant**:
- **POST /ai/chat**: Users can provide their symptoms or medical concerns in a chat-like interface, and the AI will analyze the information to offer personalized health recommendations, potential diagnoses, and treatment suggestions.
- **POST /ai/ocr**: Users can upload an image or PDF of their prescription, and the AI will extract relevant details using Optical Character Recognition (OCR). This includes medication names, dosages, and doctor information to help track prescriptions and improve doctor-patient communication.!
  
---

## 💊 **Prescription Upload & Management**

This feature allows users to upload and manage their prescriptions, enabling doctors and users to track medical records.

1. **Upload Prescription**:
   - Users can upload their prescriptions (images or PDFs) through the **POST /user/upload-prescription** endpoint.
   - Prescriptions are securely stored in **Cloudinary** for easy retrieval and access.

2. **View Prescription**:
   - Uploaded prescriptions include details such as medication name, dosage, doctor information, and prescription date.

3. **Manage Prescriptions**:
   - Doctors can update prescriptions if necessary, and users can access their prescription history at any time.

---

## 🧠 AI Health Assistant 

The AI Health Assistant provides personalized health advice based on the symptoms, health concerns, or queries submitted by the user.

### **How It Works**:

1. **Health Recommendations & Symptom Checker**:
   - **POST /ai/chat**: Users can provide their symptoms or medical concerns in a chat-like interface, and the AI will analyze the information and offer personalized health recommendations, potential diagnoses, and treatment suggestions. This endpoint enables users to interact with the AI and receive tailored advice.

2. **Prescription OCR & Details Extraction**:
   - **POST /ai/ocr**: Users can upload an image of their prescription, and the AI will process the document using Optical Character Recognition (OCR) to extract relevant details such as medication names, dosages, and doctor information. This helps users track their medications and makes it easier for doctors to access prescription data.

---

## 🛠️ **Technologies Used**

- **Node.js** – Server-side JavaScript runtime for building the backend.
- **Express.js** – Web framework for creating RESTful APIs.
- **MongoDB** – NoSQL database for storing user, doctor, and appointment data.
- **Cloudinary** – For handling media uploads (prescriptions, images).
- **JWT** – Secure authentication via JSON Web Tokens.
- **Multer** – Middleware for handling file uploads.
- **AI Integration** – Custom AI service (or third-party API) for health recommendations and doctor suggestions.

---

## 📂 **Deployment**

This project is pre-configured for deployment on **Vercel**. To deploy, simply link this repository to your Vercel project, and it will automatically deploy based on the `vercel.json` configuration.

---

