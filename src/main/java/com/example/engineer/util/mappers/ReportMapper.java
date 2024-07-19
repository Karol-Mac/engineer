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
        ReportDto dto = new ReportDto();
        dto.setId(report.getId());
        dto.setMessage(report.getMessage());
        dto.setIsDone(report.getIsDone());
        dto.setReporterName(report.getReporter().getRealUsername());
        dto.setAuthorName(getAuthorName(report));
        dto.setCreatedAt(report.getCreatedAt());
        dto.setCommentId(report.getComment() == null ? null : report.getComment().getId());
        dto.setProductId(report.getProduct() == null ? null : report.getProduct().getId());

        return dto;
    }

    public String getAuthorName(Report report) {

        if(report.getAuthorType() == AuthorType.SELLER) {
            var seller = sellerRepository.findById(report.getAuthorId()).orElseThrow(
                    () -> new NotFoundException("Seller", report.getAuthorId()));

            return seller.getShopName();
        } else {
            var user = userRepository.findById(report.getAuthorId()).orElseThrow(
                    () -> new NotFoundException("User", report.getAuthorId()));

            return user.getRealUsername();
        }
    }
}
