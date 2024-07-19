package com.example.engineer.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {

    private Long id;

    private LocalDate createdAt;

    private Boolean isDone;

    private String message;

    private Long commentId;

    private Long productId;

    private String reporterName;

    private String authorName;
}
