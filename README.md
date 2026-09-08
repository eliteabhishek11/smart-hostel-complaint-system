# 🏢 Amity University - Smart Hostel Complaint Management System
> **Placement-Ready Minor Project** | Full-Stack Enterprise Architecture with MongoDB NoSQL, AI-Assisted Prioritization & Analytics

---

## 🛠️ Technology Stack
- **Backend Framework**: Java 17, Spring Boot 3.2.2 (REST APIs, Spring Data MongoDB, Validation, JavaMail)
- **Database Layer**: **MongoDB / MongoDB Atlas Cloud Connection URI** (`mongodb+srv://...`)
- **Security & Authentication**: Spring Security, JWT (JSON Web Tokens), BCrypt Password Hashing
- **Frontend Stack**: HTML5, Vanilla CSS3 (Amity Navy & Gold Jhakkas Glassmorphism Theme), Bootstrap 5, JavaScript (ES6+)
- **Analytics & Data Visualization**: Chart.js (Doughnut & Bar charts), Interactive Hostel Block Heatmap
- **Export Engines**: jsPDF (PDF Generation), XLSX / SheetJS (Excel Workbook Export)
- **Utility Tools**: QRCode.js (Complaint QR Generation & Scanner), PWA Service Worker (Installable Web App)
- **Free Public APIs**: Open-Meteo Weather, Advice Slip, UI-Avatars, QR Server, Official Joke API, Geo IP Location Audit

---

## 🍃 MongoDB Configuration (`application.properties`)

```properties
# MongoDB Atlas Cloud Connection String
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hostel_db?retryWrites=true&w=majority
```

---

## 👥 Roles & Emergency Contacts
- 🎓 **Student Portal**: Complaint Registration, Voice Input Mic, AI Priority Recommendation, QR Tracker, 5-Star Rating.
- 🛡️ **Warden Portal**: Block Management, Auto-Assign Staff Wizard, Notice Publisher.
  - 📞 **Madan Sir (Block Warden)**: `+91 97205 24913`
  - 📞 **Pawan Sir (Superintendent)**: `+91 88002 41508`
- 🔧 **Maintenance Staff Workboard**: Task Queue, Status Progression (Start Work ➔ Complete).
- 👑 **Admin Portal**: User CRUD, Audit Trail Logs, PDF & Excel Exports.
