package com.hostel.complaint.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.time.LocalDateTime;

@Document(collection = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    private String id;

    private String title;
    private String description;
    private String category; // Electrical, Plumbing, Internet/WiFi, Furniture, Water Supply, Mess, Cleaning, Security, Lift, Other
    private String priority; // High, Medium, Low
    private String hostelBlock; // Block A, Block B, Block C, Block D
    private String roomNumber;
    private String status = "Pending"; // Pending, Assigned, In Progress, Waiting for Parts, Completed, Rejected, Closed

    private String studentName;
    private String studentEmail;
    private String assignedStaffName;
    private String assignedStaffId;

    private String beforeImageUrl;
    private String afterImageUrl;

    private Double rating;
    private String feedbackComment;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime resolvedAt;
}
