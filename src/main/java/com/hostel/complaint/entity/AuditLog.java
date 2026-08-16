package com.hostel.complaint.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long complaintId;
    private String action; // STATUS_CHANGE, ASSIGNMENT, CREATION, RATING
    private String performedBy;
    private String details;
    private LocalDateTime timestamp = LocalDateTime.now();
}
