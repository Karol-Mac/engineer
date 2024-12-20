package com.example.engineer.util.mappers;

import com.example.engineer.entity.Report;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.ReportDto;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.util.AuthorType;
import org.springframework.stereotype.Component;

@Component
public class ReportMapper {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    public ReportMapper(UserRepository userRepository, SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
    }


    public ReportDto mapToDto(Report report) {
        return ReportDto.builder()
                .id(report.getId())
                .message(report.getMessage())
                .isDone(report.getIsDone())
                .reporterName(report.getReporter().getRealUsername())
                .authorName(getAuthorName(report))
                .authorId(report.getAuthorId())
                .reporterId(report.getReporter().getId())
                .createdAt(report.getCreatedAt())
                .commentId(report.getComment() == null ? null : report.getComment().getId())
                .productId(report.getProduct() == null ? null : report.getProduct().getId())
                .build();
    }

    public String getAuthorName(Report report) {
        if(report.getAuthorType() == AuthorType.SELLER) {
            return sellerRepository.findShopNameById(report.getAuthorId()).orElseThrow(
                    () -> new NotFoundException("Seller", report.getAuthorId()));
        } else {
            return userRepository.findUsernameById(report.getAuthorId()).orElseThrow(
                    () -> new NotFoundException("User", report.getAuthorId()));
        }
    }
}
