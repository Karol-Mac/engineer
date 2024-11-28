package com.example.engineer.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportDto {

    private Long id;

    private LocalDateTime createdAt;

    private Boolean isDone;

    private String message;

    private Long commentId;

    private Long productId;

    private String reporterName;

    private String authorName;

    private Long authorId;

    private Long reporterId;

    private String reporterEmail;
}
