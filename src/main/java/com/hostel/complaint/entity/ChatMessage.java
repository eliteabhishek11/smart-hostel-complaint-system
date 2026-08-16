package com.hostel.complaint.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long complaintId;
    private String senderName;
    private String senderRole; // STUDENT, WARDEN, STAFF
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private String attachmentUrl;
    private LocalDateTime timestamp = LocalDateTime.now();
}
