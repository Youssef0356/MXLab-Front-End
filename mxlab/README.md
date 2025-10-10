# MXLab CMMS - Frontend Application

A modern Computerized Maintenance Management System (CMMS) built with React, TypeScript, and Vite. This application provides comprehensive maintenance management capabilities including equipment tracking, intervention management, user administration, and site surveillance.

## 📋 Prerequisites

Before running this project, make sure you have the following installed:


## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <https://github.com/Youssef0356/MXLab-Front-End.git>
cd "MXLab Front End/mxlab"
```

### 2. Install Dependencies
```bash
npm install
```

## 🏃‍♂️ Running the Project

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```


The application will be available at `http://localhost:5173`

### Build for Production
Create a production build:
```bash
npm run build
```


## 📦 Dependencies

**React**
npm install react@^19.1.1

**React DOM**
npm install react-dom@^19.1.1

**React Router DOM**
npm install react-router-dom@^7.9.3

**React Hook Form**
npm install react-hook-form@^7.64.0

**TanStack React Query**
npm install @tanstack/react-query@^5.90.2

**Tailwind CSS**
npm install --save-dev tailwindcss@^4.1.14

**Tailwind CSS Vite Plugin**
npm install @tailwindcss/vite@^4.1.14

**Lucide React**
npm install lucide-react@^0.545.0

**QRCode**
npm install qrcode@^1.5.4
npm install @types/qrcode@^1.5.5

**Vite**
npm install --save-dev vite@^7.1.7

**TypeScript**
npm install --save-dev typescript@~5.9.3

**ESLint**
npm install --save-dev eslint@^9.36.0

**Autoprefixer**
npm install --save-dev autoprefixer@^10.4.21

**Vite React SWC Plugin**
npm install --save-dev @vitejs/plugin-react-swc@^4.1.0

**@types/react**
npm install --save-dev @types/react@^19.1.16

**@types/react-dom**
npm install --save-dev @types/react-dom@^19.1.9

**@types/node**
npm install --save-dev @types/node@^24.6.0

**Install All Dependencies**
npm install

## 🏗️ Project Structure

```
src/
├── Components/
│   └── Common/
│       ├── Layout.tsx          # Main layout component
│       └── Sidebar.tsx         # Navigation sidebar
├── Pages/
│   └── MainPage/
│       ├── Dashboard/          # Dashboard components
│       │   ├── Dashboard.tsx   # Main dashboard
│       │   └── Visualisations.tsx # Data visualizations
│       ├── Equipments/         # Equipment management
│       ├── Maintenance/        # Maintenance modules
│       ├── Intervention/       # Intervention management
│       ├── Utilisateur/        # User management
│       └── Site/              # Site management
├── App.tsx                     # Main app component
├── App.css                     # Global styles
└── main.tsx                    # Application entry point
```

## 🌐 Available Routes

- `/` - Login page
- `/dashboard` - Main dashboard
- `/visualisations` - Data visualizations
- `/interventionRequests` - Intervention requests
- `/interventionCreate` - Create intervention
- `/userList` - User management
- `/userCreate` - Create user
- `/siteView` - Site overview
- `/siteCreate` - Create site
- `/equipmentsView` - Equipment list
- `/equipmentsCreate` - Create equipment
- `/equipmentsIOT` - IoT equipment
- `/maintenanceHistory` - Maintenance history
- `/maintenance-view` - Preventive maintenance
- `/calendar` - Maintenance calendar

