package com.hostel.complaint.repository;

import com.hostel.complaint.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByComplaintIdOrderByTimestampAsc(Long complaintId);
}
