package com.example.engineer.controller;

import com.example.engineer.payload.ReportDto;
import com.example.engineer.service.ReportService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;


    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    @PreAuthorize("hasRole(@userRole)")
    public ResponseEntity<ReportDto> createReport(
            @RequestParam(defaultValue = "0", required = false) long productId,
            @RequestParam(defaultValue = "0", required = false) long commentId,
            @RequestBody(required = false) String message) throws BadRequestException{
        return new ResponseEntity<>(
                reportService.createReport(productId, commentId, message),
                HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<List<ReportDto>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @PutMapping
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<ReportDto> updateReport(@RequestParam long reportId,
                                                  @RequestBody Boolean isDone) {
        return ResponseEntity.ok(reportService.updateReport(reportId, isDone));
    }
}
