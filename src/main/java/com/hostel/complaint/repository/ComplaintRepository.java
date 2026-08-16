package com.hostel.complaint.repository;

import com.hostel.complaint.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudentEmail(String email);
    List<Complaint> findByHostelBlock(String hostelBlock);
    List<Complaint> findByStatus(String status);
    List<Complaint> findByAssignedStaffId(String staffId);
    
    @Query("SELECT c FROM Complaint c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Complaint> searchComplaints(String query);

    List<Complaint> findByHostelBlockAndRoomNumberAndStatusNot(String hostelBlock, String roomNumber, String status);
}
