
# MediSync Frontend

![MediSync](https://github.com/parimal1009/cs50-notes/blob/main/photos/1.jpg?raw=true)

This is the frontend for **MediSync**, a healthcare platform built using **React** that provides appointment booking, prescription analysis, and AI-powered chatbot assistance. The application helps patients connect with healthcare providers and delivers real-time recommendations and responses through AI integrations like **Google Gemini** and **Microsoft Azure Computer Vision**.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI-Powered Healthcare Chatbot**: Integrated with **Google Gemini** for intelligent health-related query responses and **Azure Computer Vision** for prescription image analysis.
- **Appointment Booking System**: Allows users to book appointments with healthcare providers based on their symptoms and doctor specialties.
- **Doctor Recommendations**: Suggests doctors based on user concerns and medical history, leveraging an internal doctor database.
- **Responsive UI**: Built with **Tailwind CSS** to ensure mobile-first design and responsive layouts across devices.
- **User Profile Management**: Users can manage their profiles, track appointments, and review their medical interactions.
- **Real-time Notifications**: Integrated **React Toastify** for user feedback on actions like booking appointments or uploading prescriptions.
- **Secure File Uploads**: Prescription images are securely processed using Azure Vision for OCR, and deleted after extraction for security.

## Project Structure

The frontend follows a **component-based architecture** with **Vite** as the build tool and **React Router** for navigation.

```
src/
├── assets/             # Static resources (images, fonts, etc.)
├── components/         # Reusable UI components (Navbar, Footer, etc.)
├── context/            # Global state management (React Context API)
├── pages/              # Main route pages (Home, Doctors, Appointments, etc.)
├── services/           # API integrations (chatbot, doctor search, etc.)
└── styles/             # Global styles (Tailwind configurations)
```

### Core Components
- **App.jsx**: The root component that defines routes, integrates global components like **Navbar** and **Footer**, and manages state using React Context API.
- **Navbar.jsx**: Handles navigation and user authentication.
- **Banner.jsx**: A hero section for the homepage with promotional content.
- **TopDoctors.jsx**: Displays a list of top-rated doctors.
- **HealthcareBot.jsx**: The AI-powered chatbot providing assistance to users.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, Vite
- **AI Services**: Google Gemini AI, Azure Computer Vision API
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Build Tools**: Vite, PostCSS
- **Deployment**: Vercel (with CI/CD pipeline)

## Installation and Setup

To get the frontend up and running locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medisync-frontend.git
   ```
   
2. Navigate into the project directory:
   ```bash
   cd medisync-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Screenshots

### Home Page
![Home Page](https://github.com/parimal1009/cs50-notes/blob/main/photos/2.jpg?raw=true)

### Doctor List
![Doctors List](https://github.com/parimal1009/cs50-notes/blob/main/photos/8.jpg?raw=true)

### Appointment Booking
![Appointment Booking](https://github.com/parimal1009/cs50-notes/blob/main/photos/4.jpg?raw=true)

### Healthcare Chatbot
![Healthcare Bot](https://github.com/parimal1009/cs50-notes/blob/main/photos/5.jpg?raw=true)

### Prescription Upload
![Prescription Upload](https://github.com/parimal1009/cs50-notes/blob/main/photos/7.jpg?raw=true)

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
