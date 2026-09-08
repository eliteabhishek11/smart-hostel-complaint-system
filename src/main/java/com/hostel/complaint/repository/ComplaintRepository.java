package com.hostel.complaint.repository;

import com.hostel.complaint.entity.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByStudentEmail(String email);
    List<Complaint> findByHostelBlock(String hostelBlock);
    List<Complaint> findByStatus(String status);
    List<Complaint> findByAssignedStaffId(String staffId);
    List<Complaint> findByHostelBlockAndRoomNumberAndStatusNot(String hostelBlock, String roomNumber, String status);
}
