package com.example.engineer.util.mappers;

import com.example.engineer.entity.Report;
import com.example.engineer.payload.ReportDto;
import org.springframework.stereotype.Component;

@Component
public class ReportMapper {

    public ReportDto mapToDto(Report report) {
        ReportDto dto = new ReportDto();
        dto.setId(report.getId());
        dto.setMessage(report.getMessage());
        dto.setIsDone(report.getIsDone());
        dto.setReporterId(report.getReporter().getId());
        dto.setAuthorId(report.getAuthorId());
        dto.setCreatedAt(report.getCreatedAt());
        dto.setCommentId(report.getComment() == null ? null : report.getComment().getId());
        dto.setProductId(report.getProduct() == null ? null : report.getProduct().getId());

        return dto;
    }
}
