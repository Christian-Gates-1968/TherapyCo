# **Therapy Co — Full-Stack Clinic & Appointment Booking Platform**

A production-ready **React + Next-Gen Vite Frontend + Node/Express Backend** application for booking appointments with therapists and doctors.

Includes:

* User-facing booking site
* Admin/Doctor management portal
* Secure Node/Express backend
* Token-based auth, role separation
* Cloudinary uploads, Razorpay payments
* AI chatbot (Gemini)
* Fully dockerized services

Built with clean architecture, reusable React Contexts, REST APIs, and modern tooling (Vite + Tailwind).

---

## **✨ Highlights**

### **Frontend (User Site – React + Vite)**

* SPA built with React + Vite
* Context-driven state management
* Doctor listings, appointment booking, payments
* Tailwind CSS design system
* Entry: `frontend/src/App.jsx`
* Vite config: `frontend/vite.config.js`

### **Admin / Doctor Portal (React + Vite)**

* Role-based dashboard for doctors & admins
* Manage appointments, schedules, doctor profiles
* Entry: `admin/src/App.jsx`

### **Backend (Node + Express + MongoDB)**

* REST API with authentication
* JSON Web Tokens (JWT)
* Payment integration (Razorpay)
* Image uploads (Cloudinary)
* Optional chatbot route (Gemini API)
* Entry: `backend/server.js`

---

## **🗂 Project Structure Overview**

```
therapy-co/
│
├── frontend/        # User SPA
│   ├── src/
│   │   ├── App.jsx
│   │   ├── context/AppContext.jsx
│   │   └── pages/
│   │       ├── Appointment.jsx
│   │       └── MyAppointments.jsx
│   └── vite.config.js
│
├── admin/           # Admin & Doctor portal
│   ├── src/
│   │   ├── App.jsx
│   │   └── context/
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   ├── mongodb.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── doctorController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── doctorRoute.js
│   │   ├── adminRoute.js
│   │   └── chatbotRoute.js
│   └── models/
│       ├── doctorModel.js
│       └── appointmentModel.js
```

---

## **🔐 Environment Variables**

### **Backend → `/backend/.env`**

Required:

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@therapyco.com
ADMIN_PASSWORD=StrongAdminPassword123

CLOUDINARY_NAME='xxxx'
CLOUDINARY_API_KEY='xxxx'
CLOUDINARY_SECRET_KEY='xxxx'

RAZORPAY_KEY_ID='rzp_test_xxx'
RAZORPAY_KEY_SECRET='rzp_secret_xxx'

GEMINI_API_KEY='optional_key'

CURRENCY="INR"


```

### **Frontend → `/frontend/.env`**

```
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID='rzp_test_xxx'
VITE_ADMIN_URL=http://localhost:5174
VITE_CURRENCY=$
```

### **Admin → `/admin/.env`**

```
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=$
```

---

## **🚀 Local Development Setup**

Open **three terminals**—one for each service.

### **Backend**

```sh
cd backend
npm install
npm run dev
```

### **Frontend (User)**

```sh
cd frontend
npm install
npm run dev
```

### **Admin Portal**

```sh
cd admin
npm install
npm run dev
```

### **Default Ports**

* Frontend: **5173**
* Admin: **5174**
* Backend: **4000**

---

## **📌 Important Code Entry Points**

### **Backend**

* Server bootstrap → `backend/server.js`
* MongoDB config → `backend/config/mongodb.js`
* Cloudinary config → `backend/config/cloudinary.js`
* User controllers → `backend/controllers/userController.js`
* Doctor controllers → `backend/controllers/doctorController.js`
* Admin controllers → `backend/controllers/adminController.js`

### **Frontend**

* Context & API setup → `frontend/src/context/AppContext.jsx`
* Booking page → `frontend/src/pages/Appointment.jsx`
* My appointments → `frontend/src/pages/MyAppointments.jsx`

### **Admin**

* Admin context → `admin/src/context/AdminContext.jsx`
* Doctor context → `admin/src/context/DoctorContext.jsx`

---

## **💳 Payments & Uploads**

* Razorpay payment flow implemented in `userController.js`
* Cloudinary upload integration in `cloudinary.js`

---

## **🐋 Docker Support**

Each service includes a production-ready `Dockerfile`:

* `frontend/Dockerfile`
* `admin/Dockerfile`
* `backend/Dockerfile`

Optional: combine with a `docker-compose.yml` for multi-service deployments.

---




