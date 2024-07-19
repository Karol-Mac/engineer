package com.example.engineer.controller;

import com.example.engineer.service.ReportService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportController {

    private final ReportService reportService;


    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }


}
