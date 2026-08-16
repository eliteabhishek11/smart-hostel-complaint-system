package com.hostel.complaint.repository;

import com.hostel.complaint.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByComplaintIdOrderByTimestampDesc(Long complaintId);
    List<AuditLog> findAllByOrderByTimestampDesc();
}
