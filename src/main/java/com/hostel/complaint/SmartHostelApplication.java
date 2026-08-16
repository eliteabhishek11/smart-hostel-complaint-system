package com.hostel.complaint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartHostelApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartHostelApplication.class, args);
        System.out.println("==========================================================");
        System.out.println("🚀 Smart Hostel Complaint Management System Started!");
        System.out.println("🌐 Access Web Portal at: http://localhost:8080");
        System.out.println("💾 Database H2 Console at: http://localhost:8080/h2-console");
        System.out.println("==========================================================");
    }
}
