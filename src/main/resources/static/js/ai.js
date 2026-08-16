// Smart AI Priority Recommendation & Duplicate Complaint Detection Engine

function triggerAIAnalysis() {
    const title = document.getElementById('cpTitle')?.value || '';
    const desc = document.getElementById('cpDescription')?.value || '';
    const category = document.getElementById('cpCategory')?.value || '';
    const block = document.getElementById('cpBlock')?.value || '';
    const room = document.getElementById('cpRoom')?.value || '';
    const aiContainer = document.getElementById('aiBadgeContainer');

    if (!aiContainer) return;

    const text = (title + " " + desc).toLowerCase();
    
    if (text.length < 5) {
        aiContainer.innerHTML = `
            <div class="p-3 rounded-3 bg-primary bg-opacity-10 border border-primary text-primary small d-flex align-items-center justify-content-between">
                <span><i class="bi bi-robot me-2 fs-5"></i> <strong>AI Assistant:</strong> Type a title & description to get instant priority recommendation & duplicate check.</span>
            </div>`;
        return;
    }

    // AI Priority Classification Keywords
    const criticalKeywords = ['spark', 'short circuit', 'fire', 'leakage', 'overflow', 'lift trapped', 'smoke', 'gas', 'emergency', 'shattered', 'flood'];
    const moderateKeywords = ['wifi', 'no water', 'fan', 'light', 'lock', 'flush', 'door', 'geyser'];

    let suggestedPriority = 'Low';
    let urgencyColor = 'bg-info text-dark';
    let reasoning = 'Routine repair task.';

    if (criticalKeywords.some(kw => text.includes(kw))) {
        suggestedPriority = 'High';
        urgencyColor = 'bg-danger text-white';
        reasoning = '🔥 Critical Emergency Keywords Detected (Safety Risk)';
    } else if (moderateKeywords.some(kw => text.includes(kw))) {
        suggestedPriority = 'Medium';
        urgencyColor = 'bg-warning text-dark';
        reasoning = '⚡ Standard Infrastructure Maintenance';
    }

    // Auto update Priority select option
    const prioritySelect = document.getElementById('cpPriority');
    if (prioritySelect) prioritySelect.value = suggestedPriority;

    // Check Duplicate
    const isDup = complaints.some(c => c.hostelBlock === block && c.roomNumber === room && c.category === category && c.status !== 'Completed');

    aiContainer.innerHTML = `
        <div class="p-3 rounded-3 border ${isDup ? 'bg-danger bg-opacity-10 border-danger text-danger' : 'bg-success bg-opacity-10 border-success text-success'} small">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <span><i class="bi bi-cpu me-2"></i> <strong>AI Analysis Engine:</strong> ${reasoning}</span>
                <span class="badge ${urgencyColor} px-3 py-1">Suggested: ${suggestedPriority}</span>
            </div>
            ${isDup ? `<div class="fw-bold mt-1"><i class="bi bi-exclamation-triangle-fill me-1"></i> Warning: Active duplicate complaint already exists for Room ${room} in category (${category}).</div>` : ''}
        </div>`;
}

function previewUploadFile(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('uploadPreview');
    if (file && preview) {
        preview.innerHTML = `<i class="bi bi-file-earmark-check me-1"></i> Attached File: <strong>${file.name}</strong> (${(file.size/1024).toFixed(1)} KB)`;
    }
}
