package com.example.engineer.controller;

import com.example.engineer.payload.ReportDto;
import com.example.engineer.service.ReportService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<ReportDto> createReport(
            @RequestParam(defaultValue = "0", required = false) long productId,
            @RequestParam(defaultValue = "0", required = false) long commentId,
            @RequestBody(required = false) String message,
            Principal principal) throws BadRequestException{
        return new ResponseEntity<>(
                reportService.createReport(productId, commentId, message, principal.getName()),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ReportDto>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @PutMapping
    public ResponseEntity<ReportDto> updateReport(@RequestParam long reportId,
                                                  @RequestBody Boolean isDone) {
        return ResponseEntity.ok(reportService.updateReport(reportId, isDone));
    }
}
