package com.example.engineer.service;

import com.example.engineer.payload.ReportDto;

import java.util.List;

public interface ReportService {
    ReportDto createReport(long productId, long commentId, String message);

    List<ReportDto> getAllReports();

    ReportDto updateReport(long reportId, boolean isDone);
}
