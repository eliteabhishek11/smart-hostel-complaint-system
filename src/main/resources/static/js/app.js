// Smart Hostel Complaint Management System - Amity University Edition

let currentRole = null;
let activeComplaintId = null;
let currentRatingValue = 5;

// Initial Pre-Seeded Dataset for Interviews & Demonstrations
let complaints = [
    {
        id: 101,
        title: "Short Circuit & Sparks in Switchboard",
        category: "Electrical",
        priority: "High",
        hostelBlock: "Block A",
        roomNumber: "204",
        status: "In Progress",
        studentName: "Rahul Sharma",
        studentEmail: "rahul.a@amity.edu",
        assignedStaffName: "Ramesh Electrician",
        description: "Main light switch sparked when turning on fan in Room 204. Dangerous smell coming.",
        createdAt: "2026-09-07 10:15 AM",
        rating: null,
        feedbackComment: null
    },
    {
        id: 102,
        title: "Severe Pipe Leakage under Bathroom Sink",
        category: "Plumbing",
        priority: "High",
        hostelBlock: "Block A",
        roomNumber: "105",
        status: "Pending",
        studentName: "Amit Kumar",
        studentEmail: "amit.k@amity.edu",
        assignedStaffName: "Unassigned",
        description: "Bathroom sink pipe burst and water flooding room hallway.",
        createdAt: "2026-09-07 11:30 AM",
        rating: null,
        feedbackComment: null
    },
    {
        id: 103,
        title: "Amity Hostel WiFi Access Point Down",
        category: "Internet/WiFi",
        priority: "Medium",
        hostelBlock: "Block B",
        roomNumber: "310",
        status: "Completed",
        studentName: "Priya Singh",
        studentEmail: "priya.s@amity.edu",
        assignedStaffName: "Suresh IT Staff",
        description: "No internet connection on 3rd floor router since morning.",
        createdAt: "2026-09-06 04:20 PM",
        rating: 5,
        feedbackComment: "Fixed router within 2 hours! Excellent service."
    },
    {
        id: 104,
        title: "Study Table Leg Broken",
        category: "Furniture",
        priority: "Low",
        hostelBlock: "Block C",
        roomNumber: "402",
        status: "In Progress",
        studentName: "Neha Gupta",
        studentEmail: "neha.g@amity.edu",
        assignedStaffName: "Vikas Carpenter",
        description: "Right table joint cracked and unsteady.",
        createdAt: "2026-09-07 02:00 PM",
        rating: null,
        feedbackComment: null
    }
];

let auditLogs = [
    { time: "2026-09-07 11:35 AM", complaintId: "#CMP-0102", action: "CREATED", user: "Amit Kumar (Student)", details: "New high priority plumbing complaint submitted" },
    { time: "2026-09-07 10:45 AM", complaintId: "#CMP-0101", action: "STATUS_CHANGE", user: "Madan Sir (Warden)", details: "Warden updated status to In Progress" },
    { time: "2026-09-06 06:10 PM", complaintId: "#CMP-0103", action: "RESOLVED", user: "Pawan Sir (Superintendent)", details: "Marked Completed after warden inspection." }
];

let chatMessages = {
    101: [
        { sender: "Rahul Sharma", role: "STUDENT", text: "Hello Madan Sir, switchboard sparks were scary in Room 204. Please dispatch electrician soon.", time: "10:20 AM" },
        { sender: "Madan Sir (Warden)", role: "WARDEN", text: "Don't worry Rahul, Ramesh Electrician is already dispatched to Room 204. Call me at +91 97205 24913 if any emergency.", time: "10:25 AM" }
    ]
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    renderAllViews();
    initChart();
    fetchDailyMaintenanceTip();
    fetchRandomJoke();
    fetchIPSecurityLocation();
});

// FREE API 2: Daily Maintenance & Safety Advice API (AdviceSlip)
async function fetchDailyMaintenanceTip() {
    try {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        if (data && data.slip && data.slip.advice) {
            document.getElementById('dailyTipText').innerText = `Tip: ${data.slip.advice}`;
        }
    } catch (e) {
        document.getElementById('dailyTipText').innerText = `Tip: Inspect electrical appliances during rainy weather.`;
    }
}

// FREE API 5: Official Joke API for Student Refreshment Widget
async function fetchRandomJoke() {
    try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        if (data && data.setup) {
            document.getElementById('jokeWidgetText').innerText = `${data.setup} - ${data.punchline}`;
        }
    } catch (e) {
        document.getElementById('jokeWidgetText').innerText = `Why do programmers prefer dark mode? Because light attracts bugs!`;
    }
}

// FREE API 6: Web Speech API (Speech Recognition Voice Input)
function startVoiceInput(fieldId) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser. Try Google Chrome!");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    const btn = event.target;
    btn.innerHTML = `<i class="bi bi-record-circle text-danger"></i> Listening...`;

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = transcript;
            triggerAIAnalysis();
        }
        btn.innerHTML = `<i class="bi bi-mic-fill"></i> Voice Input`;
    };

    recognition.onerror = () => {
        btn.innerHTML = `<i class="bi bi-mic-fill"></i> Voice Input`;
    };
}

// FREE API 7: Web Speech Synthesis API (Voice Announcement Audio Readout)
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Text to speech not supported!");
    }
}

// FREE API 8: Geo IP Security Audit Location API (ipapi.co)
async function fetchIPSecurityLocation() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data && data.ip) {
            auditLogs.unshift({
                time: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
                complaintId: `#SEC-LOG`,
                action: "IP_AUDIT",
                user: `${data.ip} (${data.city}, ${data.country_name})`,
                details: `Amity Wi-Fi Security Session Verified via ${data.org || 'ISP'}`
            });
            renderAdminView();
        }
    } catch(e) {}
}

// Open Login Modal with Selected Role
function openLoginModal(role) {
    document.getElementById('loginRoleInput').value = role;
    const roleTitles = {
        'STUDENT': 'Student Portal Login',
        'WARDEN': 'Warden Portal Login',
        'ADMIN': 'Admin Portal Login'
    };
    const roleUsernames = {
        'STUDENT': 'rahul.sharma@amity.edu',
        'WARDEN': 'madan.sir@amity.edu',
        'ADMIN': 'pawan.sir@amity.edu'
    };

    document.getElementById('loginRoleLabel').innerText = roleTitles[role] || 'Portal Login';
    document.getElementById('loginUsername').value = roleUsernames[role] || '';

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(roleTitles[role] || 'Portal')}&background=001c3d&color=ffb800&rounded=true`;
    document.getElementById('loginAvatarPreview').src = avatarUrl;

    new bootstrap.Modal(document.getElementById('loginModal')).show();
}

function handleModalLogin(e) {
    e.preventDefault();
    const role = document.getElementById('loginRoleInput').value;
    const modalEl = document.getElementById('loginModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    
    switchRole(role);
}

// Show Landing Page Hero
function showLandingPage() {
    currentRole = null;
    document.getElementById('landingHeroSection').classList.remove('d-none');
    document.querySelectorAll('.role-section').forEach(sec => sec.classList.add('d-none'));
    document.getElementById('loggedUserContainer').classList.add('d-none');
}

// Role Switcher to Active Portal
function switchRole(role) {
    currentRole = role;

    const labels = {
        'STUDENT': 'Rahul Sharma (Student)',
        'WARDEN': 'Madan Sir (Block Warden)',
        'ADMIN': 'Pawan Sir (Superintendent)'
    };
    document.getElementById('currentUserLabel').innerText = labels[role] || 'User Profile';

    // FREE API 3: UI-Avatars API for Dynamic User Avatars
    const nameForAvatar = (labels[role] || 'User').split(' (')[0];
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=001c3d&color=ffb800&rounded=true`;
    document.getElementById('userAvatarImg').src = avatarUrl;

    // Show Logged User Profile and Hide Landing Hero
    document.getElementById('landingHeroSection').classList.add('d-none');
    document.getElementById('loggedUserContainer').classList.remove('d-none');

    // Hide all sections then show target active portal
    document.querySelectorAll('.role-section').forEach(sec => sec.classList.add('d-none'));
    if (role === 'STUDENT') document.getElementById('studentPortal').classList.remove('d-none');
    if (role === 'WARDEN') document.getElementById('wardenPortal').classList.remove('d-none');
    if (role === 'ADMIN') document.getElementById('adminPortal').classList.remove('d-none');

    renderAllViews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleLogout() {
    showLandingPage();
    alert("🔒 You have logged out of the Amity Hostel Portal.");
}

function renderAllViews() {
    renderStudentView();
    renderWardenView();
    renderAdminView();
}

// ================= STUDENT RENDER =================
function renderStudentView() {
    const list = document.getElementById('studentComplaintList');
    if (!list) return;

    list.innerHTML = complaints.map(c => `
        <tr>
            <td class="fw-bold text-primary">#CMP-${String(c.id).padStart(4, '0')}</td>
            <td>
                <div class="fw-bold">${c.title}</div>
                <span class="badge bg-secondary bg-opacity-10 text-secondary extra-small px-2">${c.category}</span>
            </td>
            <td>${c.hostelBlock} - ${c.roomNumber}</td>
            <td><span class="badge ${c.priority === 'High' ? 'bg-danger' : c.priority === 'Medium' ? 'bg-warning text-dark' : 'bg-info'}">${c.priority}</span></td>
            <td><span class="badge ${getStatusBadgeClass(c.status)}">${c.status}</span></td>
            <td class="small text-muted">${c.createdAt}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 rounded-pill" onclick="openChatDrawer(${c.id})" title="Chat with Warden"><i class="bi bi-chat-text"></i></button>
                <button class="btn btn-sm btn-outline-dark me-1 rounded-pill" onclick="generateQRCode(${c.id})" title="QR Tracking"><i class="bi bi-qr-code"></i></button>
                <button class="btn btn-sm btn-outline-secondary me-1 rounded-pill" onclick="speakText('${c.title}. Description: ${c.description}')" title="Listen Audio Readout"><i class="bi bi-volume-up"></i></button>
                ${c.status === 'Completed' && !c.rating ? `<button class="btn btn-sm btn-success rounded-pill" onclick="openRatingModal(${c.id})"><i class="bi bi-star"></i> Rate</button>` : ''}
            </td>
        </tr>
    `).join('');

    // Update Stat Counts
    document.getElementById('stTotalComplaints').innerText = complaints.length;
    document.getElementById('stPendingComplaints').innerText = complaints.filter(c => c.status !== 'Completed').length;
    document.getElementById('stResolvedComplaints').innerText = complaints.filter(c => c.status === 'Completed').length;
}

// ================= WARDEN RENDER =================
function renderWardenView() {
    const list = document.getElementById('wardenComplaintList');
    if (!list) return;

    list.innerHTML = complaints.map(c => `
        <tr>
            <td class="fw-bold">#CMP-${String(c.id).padStart(4, '0')}</td>
            <td>${c.studentName}</td>
            <td class="fw-semibold">${c.title}</td>
            <td>${c.hostelBlock} (${c.roomNumber})</td>
            <td><span class="badge ${c.priority === 'High' ? 'bg-danger' : 'bg-warning text-dark'}">${c.priority}</span></td>
            <td><span class="badge ${getStatusBadgeClass(c.status)}">${c.status}</span></td>
            <td>
                <div class="dropdown d-inline-block me-1">
                    <button class="btn btn-sm btn-outline-primary rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Status
                    </button>
                    <ul class="dropdown-menu shadow">
                        <li><a class="dropdown-item small" href="#" onclick="updateStatus(${c.id}, 'In Progress')">In Progress</a></li>
                        <li><a class="dropdown-item small" href="#" onclick="updateStatus(${c.id}, 'Completed')">Completed</a></li>
                    </ul>
                </div>
                <button class="btn btn-sm btn-primary rounded-pill px-3" onclick="openChatDrawer(${c.id})"><i class="bi bi-chat-dots"></i> Chat Student</button>
            </td>
        </tr>
    `).join('');

    document.getElementById('wdTotal').innerText = complaints.length;
    document.getElementById('wdHighPriority').innerText = complaints.filter(c => c.priority === 'High').length;
    document.getElementById('wdUnassigned').innerText = complaints.filter(c => c.status === 'Pending').length;
}

// ================= ADMIN RENDER =================
function renderAdminView() {
    const stream = document.getElementById('auditLogStream');
    if (!stream) return;

    stream.innerHTML = auditLogs.map(a => `
        <tr>
            <td class="small text-muted">${a.time}</td>
            <td class="fw-bold text-primary">${a.complaintId}</td>
            <td><span class="badge bg-secondary">${a.action}</span></td>
            <td class="fw-medium">${a.user}</td>
            <td class="small">${a.details}</td>
        </tr>
    `).join('');
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'Pending': return 'badge-pending';
        case 'Assigned': return 'badge-assigned';
        case 'In Progress': return 'badge-inprogress';
        case 'Completed': return 'badge-completed';
        default: return 'badge-pending';
    }
}

// Handle Form Submission
function handleComplaintSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('cpTitle').value;
    const category = document.getElementById('cpCategory').value;
    const block = document.getElementById('cpBlock').value;
    const room = document.getElementById('cpRoom').value;
    const priority = document.getElementById('cpPriority').value;
    const description = document.getElementById('cpDescription').value;

    const newId = complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 101;
    const newComplaint = {
        id: newId,
        title,
        category,
        priority,
        hostelBlock: block,
        roomNumber: room,
        status: "Pending",
        studentName: "Rahul Sharma",
        studentEmail: "rahul.a@amity.edu",
        assignedStaffName: "Madan Sir (Warden)",
        description,
        createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        rating: null,
        feedbackComment: null
    };

    complaints.unshift(newComplaint);
    auditLogs.unshift({
        time: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        complaintId: `#CMP-${String(newId).padStart(4, '0')}`,
        action: "CREATED",
        user: "Rahul Sharma (Student)",
        details: `Created new complaint: ${title}`
    });

    renderAllViews();
    bootstrap.Modal.getInstance(document.getElementById('raiseComplaintModal')).hide();
    document.getElementById('raiseComplaintForm').reset();
    alert("🎉 Complaint #CMP-" + String(newId).padStart(4, '0') + " submitted successfully!");
}

// Status update
function updateStatus(id, newStatus) {
    const c = complaints.find(item => item.id === id);
    if (c) {
        c.status = newStatus;
        auditLogs.unshift({
            time: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            complaintId: `#CMP-${String(id).padStart(4, '0')}`,
            action: "STATUS_CHANGE",
            user: "Madan Sir (Warden)",
            details: `Warden updated status to ${newStatus}`
        });
        renderAllViews();
    }
}

// Chart Initialization
function initChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Electrical', 'Plumbing', 'WiFi', 'Furniture', 'Water'],
            datasets: [{
                data: [40, 25, 20, 10, 5],
                backgroundColor: ['#2563eb', '#7c3aed', '#06b6d4', '#f59e0b', '#22c55e']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Chat Drawer Controls
function openChatDrawer(id) {
    activeComplaintId = id;
    document.getElementById('chatHeaderTitle').innerText = `Chat for #CMP-${String(id).padStart(4, '0')}`;
    renderChatMessages();
    document.getElementById('chatDrawer').classList.add('open');
}

function toggleChatDrawer(show) {
    document.getElementById('chatDrawer').classList.toggle('open', show);
}

function renderChatMessages() {
    const box = document.getElementById('chatMessagesBox');
    const msgs = chatMessages[activeComplaintId] || [
        { sender: "System", role: "SYSTEM", text: "Chat channel initialized for this complaint.", time: "Just now" }
    ];

    box.innerHTML = msgs.map(m => `
        <div class="chat-bubble ${m.sender === 'Rahul Sharma' ? 'sent' : 'received'}">
            <div class="extra-small fw-bold mb-1 opacity-75">${m.sender}</div>
            <div>${m.text}</div>
            <div class="extra-small text-end opacity-50 mt-1">${m.time}</div>
        </div>
    `).join('');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const txt = input.value.trim();
    if (!txt || !activeComplaintId) return;

    if (!chatMessages[activeComplaintId]) chatMessages[activeComplaintId] = [];
    chatMessages[activeComplaintId].push({
        sender: currentRole === 'STUDENT' ? 'Rahul Sharma' : 'Madan Sir (Warden)',
        role: currentRole,
        text: txt,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    input.value = '';
    renderChatMessages();
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

// FREE API 4: Live QR Server Public API for scannable QR Code Generation
function generateQRCode(id) {
    const container = document.getElementById('qrCodeContainer');
    const qrData = `https://hostel.college.edu/complaint/track?id=${id}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}`;
    
    container.innerHTML = `<img src="${qrApiUrl}" alt="Complaint QR" class="img-fluid rounded-3 shadow-sm">`;
    document.getElementById('qrModalTitle').innerText = `Scan Complaint #CMP-${String(id).padStart(4, '0')}`;
    new bootstrap.Modal(document.getElementById('qrModal')).show();
}

// Rating Modal
function openRatingModal(id) {
    activeComplaintId = id;
    new bootstrap.Modal(document.getElementById('ratingModal')).show();
}

function setRating(val) {
    currentRatingValue = val;
    const stars = document.querySelectorAll('#starContainer i');
    stars.forEach((s, idx) => s.classList.toggle('selected', idx < val));
}

function submitRating() {
    const comment = document.getElementById('ratingComment').value;
    const c = complaints.find(item => item.id === activeComplaintId);
    if (c) {
        c.rating = currentRatingValue;
        c.feedbackComment = comment;
        renderAllViews();
        bootstrap.Modal.getInstance(document.getElementById('ratingModal')).hide();
        alert("⭐ Thank you for your feedback!");
    }
}

// PDF & Excel Exporters
function exportDataToExcel() {
    const ws = XLSX.utils.json_to_sheet(complaints);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Complaints");
    XLSX.writeFile(wb, "Amity_Hostel_Complaints_Report.xlsx");
}

function exportDataToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Amity University Hostel Complaints Report", 14, 20);
    doc.setFontSize(10);
    doc.text("Generated on: " + new Date().toLocaleString(), 14, 28);
    
    let y = 40;
    complaints.forEach((c, idx) => {
        doc.text(`${idx+1}. #CMP-${c.id} | ${c.title} | ${c.hostelBlock} | Status: ${c.status}`, 14, y);
        y += 8;
    });

    doc.save("Amity_Hostel_Complaints_Summary.pdf");
}
