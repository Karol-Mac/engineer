package com.example.engineer.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {

    private long id;

    private LocalDate createdAt;

    private Boolean isDone;

    private String message;

    private long commentId;

    private long productId;

    private long reporterId;

    private long authorId;
}
