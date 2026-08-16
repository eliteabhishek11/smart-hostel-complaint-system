package com.hostel.complaint.controller;

import com.hostel.complaint.dto.AIAnalysisResponse;
import com.hostel.complaint.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/analyze")
    public ResponseEntity<AIAnalysisResponse> analyzeComplaint(@RequestBody Map<String, String> payload) {
        String title = payload.getOrDefault("title", "");
        String description = payload.getOrDefault("description", "");
        String category = payload.getOrDefault("category", "Electrical");
        String hostelBlock = payload.getOrDefault("hostelBlock", "Block A");
        String roomNumber = payload.getOrDefault("roomNumber", "101");

        AIAnalysisResponse response = aiService.analyzeComplaint(title, description, category, hostelBlock, roomNumber);
        return ResponseEntity.ok(response);
    }
}
