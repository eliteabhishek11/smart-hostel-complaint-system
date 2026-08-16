package com.hostel.complaint.service;

import com.hostel.complaint.dto.AIAnalysisResponse;
import com.hostel.complaint.entity.Complaint;
import com.hostel.complaint.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class AIService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public AIAnalysisResponse analyzeComplaint(String title, String description, String category, String hostelBlock, String roomNumber) {
        String combined = (title + " " + description).toLowerCase(Locale.ROOT);

        // High priority keywords
        boolean isCritical = combined.contains("spark") || combined.contains("short circuit") || 
                             combined.contains("fire") || combined.contains("leakage") || 
                             combined.contains("overflow") || combined.contains("lift trapped") || 
                             combined.contains("smoke") || combined.contains("gas") || combined.contains("emergency");

        // Medium priority keywords
        boolean isModerate = combined.contains("wifi down") || combined.contains("no water") || 
                             combined.contains("fan broken") || combined.contains("light off") || 
                             combined.contains("door lock") || combined.contains("flush");

        String suggestedPriority = "Low";
        double score = 0.3;

        if (isCritical) {
            suggestedPriority = "High";
            score = 0.95;
        } else if (isModerate) {
            suggestedPriority = "Medium";
            score = 0.65;
        }

        // Duplicate check for active complaints in same block & room
        List<Complaint> activeSameRoom = complaintRepository.findByHostelBlockAndRoomNumberAndStatusNot(hostelBlock, roomNumber, "Completed");
        boolean isDuplicate = false;
        String existingId = null;

        for (Complaint c : activeSameRoom) {
            if (c.getCategory().equalsIgnoreCase(category)) {
                isDuplicate = true;
                existingId = "#CMP-" + String.format("%04d", c.getId());
                break;
            }
        }

        String reasoning = isCritical ? "Detected critical emergency keywords (safety risk)." :
                           isModerate ? "Detected standard infrastructure degradation." :
                           "Routine maintenance issue detected.";

        return AIAnalysisResponse.builder()
                .suggestedPriority(suggestedPriority)
                .categoryDetected(category != null ? category : "General")
                .urgencyScore(score)
                .isPotentialDuplicate(isDuplicate)
                .existingComplaintId(existingId)
                .reasoning(reasoning)
                .build();
    }
}
