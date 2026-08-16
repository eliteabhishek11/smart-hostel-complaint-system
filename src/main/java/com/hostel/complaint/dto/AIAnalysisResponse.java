package com.hostel.complaint.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIAnalysisResponse {
    private String suggestedPriority; // High, Medium, Low
    private String categoryDetected;
    private Double urgencyScore; // 0.0 - 1.0
    private Boolean isPotentialDuplicate;
    private String existingComplaintId;
    private String reasoning;
}
