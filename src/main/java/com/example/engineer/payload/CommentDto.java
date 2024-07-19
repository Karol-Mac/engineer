package com.example.engineer.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private long id;
    private String content;
    private String authorName;

    private Boolean isVisible;
    private Boolean isReported;
}
