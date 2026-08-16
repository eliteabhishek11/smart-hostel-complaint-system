# 🏢 Smart Hostel Complaint Management System
> **Placement-Ready Minor Project** | Full-Stack Enterprise Architecture with AI-Assisted Prioritization & Analytics

---

## 🌟 Executive Overview
The **Smart Hostel Complaint Management System** is a full-stack, enterprise-grade web application built to streamline hostel administration, repair tracking, and student communication in college environments. Designed with high visual appeal, robust role-based security, automated workflows, and smart AI assistance, this project serves as an ideal **Minor Project / Resume Showcase** for campus placements and technical interviews.

---

## 🛠️ Technology Stack
- **Backend Framework**: Java 17, Spring Boot 3.2.2 (REST APIs, Spring Data JPA, Spring Validation, JavaMail)
- **Security & Authentication**: Spring Security, JWT (JSON Web Tokens), BCrypt Password Hashing
- **Database Layer**: PostgreSQL (Primary Production Database), H2 (In-memory fallback mode for zero-setup execution)
- **Frontend Stack**: HTML5, Vanilla CSS3 (Custom Glassmorphism Tokens & Dark Mode), Bootstrap 5, JavaScript (ES6+)
- **Analytics & Data Visualization**: Chart.js (Doughnut & Bar charts), Interactive Hostel Block Heatmap
- **Export Engines**: jsPDF (PDF Generation), XLSX / SheetJS (Excel Workbook Export)
- **Utility Tools**: QRCode.js (Complaint QR Generation & Scanner), PWA Service Worker (Installable Web App)

---

## 👥 Role-Based Architecture & Features

### 1. 🎓 Student Portal
- **Dashboard Overview**: Metrics for Total Raised, Active/Pending, Resolved, and Average Resolution Time.
- **Raise Complaint Form**:
  - Drag & Drop file attachment preview (Images/Videos).
  - **Smart AI Priority Suggestion**: Real-time keyword analysis automatically flags emergencies (e.g., short circuit, water leakage) and assigns priority levels.
  - **Duplicate Complaint Scanner**: Warns students if an active issue in the same block/room and category already exists.
- **Visual Complaint Tracker**: Stepper timeline displaying progression (Pending ➔ Assigned ➔ In Progress ➔ Completed).
- **Warden Chat Drawer**: Real-time message exchange with warden office for urgent updates.
- **QR Code Tracker**: Generates scanable QR codes for mobile status checking.
- **5-Star Rating & Review System**: Rate maintenance staff quality upon completion.

### 2. 🛡️ Warden Portal
- **Block Administration**: Overview of Block A, B, C, and D complaints.
- **Auto-Assign Wizard**: Matches complaints with available maintenance staff based on category expertise (Electrician, Plumber, Carpenter, IT) and current active workload.
- **Notice Board Publisher**: Broadcast announcements to hostel students regarding water cuts, power outages, etc.

### 3. 🔧 Maintenance Staff Portal
- **Task Queue**: Real-time view of assigned repair duties with Accept / Start Work toggles.
- **Status Updates**: Transition tasks to "In Progress" or "Completed".
- **Performance Meter**: Track SLA resolution speed and completed count.

### 4. 👑 Admin Portal
- **Analytics Dashboard**: Interactive Chart.js graphs showing category breakdown and resolution trends.
- **Hostel Block Heatmap**: Grid highlighting affected hostel blocks with severity colors (High/Medium/Low).
- **System Audit Log Stream**: Immutable event log recording every single action, status change, and assignment timestamp.
- **Data Exporting**: One-click export of system complaints into formatted **PDF** and **Excel** files.

---

## 📂 Database Schema (PostgreSQL)

```sql
users (id, username, password, full_name, email, role, active, created_at)
complaints (id, title, description, category, priority, hostel_block, room_number, status, student_name, student_email, assigned_staff_name, rating, feedback_comment, created_at, resolved_at)
audit_logs (id, complaint_id, action, performed_by, details, timestamp)
chat_messages (id, complaint_id, sender_name, sender_role, message, attachment_url, timestamp)
notices (id, title, content, category, posted_by, created_at)
```

---

## 🚀 How to Run the Project

### Option A: Instant Web Portal Execution (Zero Configuration Required)
1. Navigate to the project static directory:
   `src/main/resources/static/index.html`
2. Open `index.html` in any web browser (Chrome, Edge, Firefox).
3. Use the top **Role Switcher** bar to switch between **Student**, **Warden**, **Maintenance**, and **Admin** personas seamlessly!

### Option B: Running the Spring Boot Backend (Java 17 + Maven)
1. Ensure Java 17 and Maven are installed.
2. Build and run the project:
   ```bash
   mvn clean spring-boot:run
   ```
3. Open `http://localhost:8080` in your browser.
4. Access the H2 Database Console at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:hostel_db`).

---

## 🎯 Placement Interview Talking Points
- **Architecture**: Separated REST API architecture with Spring Security stateless JWT tokens.
- **UI Design System**: Clean Glassmorphic aesthetics with custom CSS variable tokens supporting instant Dark/Light mode switching.
- **Problem Solving**: AI-driven emergency prioritization reduces response time for critical safety hazards (short circuits, pipe bursts).
- **Auditability**: Complete audit trail logger ensures accountability for staff response times.
