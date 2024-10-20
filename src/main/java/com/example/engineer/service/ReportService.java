package com.example.engineer.service;

import com.example.engineer.payload.ReportDto;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface ReportService {
    ReportDto createReport(long productId, long commentId, String message, String email) throws BadRequestException;

    List<ReportDto> getAllReports();

    ReportDto updateReport(long reportId, boolean isDone);
}
