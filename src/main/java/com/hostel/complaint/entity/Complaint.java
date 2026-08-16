package com.hostel.complaint.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String category; // Electrical, Plumbing, Internet/WiFi, Furniture, Water Supply, Mess, Cleaning, Security, Lift, Other

    @Column(nullable = false)
    private String priority; // High, Medium, Low

    @Column(nullable = false)
    private String hostelBlock; // Block A, Block B, Block C, Block D

    @Column(nullable = false)
    private String roomNumber;

    @Column(nullable = false)
    private String status; // Pending, Assigned, In Progress, Waiting for Parts, Completed, Rejected, Closed

    private String studentName;
    private String studentEmail;
    private String assignedStaffName;
    private String assignedStaffId;

    @Column(columnDefinition = "TEXT")
    private String beforeImageUrl;

    @Column(columnDefinition = "TEXT")
    private String afterImageUrl;

    private Double rating;
    @Column(columnDefinition = "TEXT")
    private String feedbackComment;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime resolvedAt;
}
