package com.example.engineer.service.impl;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.Product;
import com.example.engineer.entity.Report;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.ApiException;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.ReportDto;
import com.example.engineer.repository.CommentRepository;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.repository.ReportRepository;
import com.example.engineer.service.ReportService;
import com.example.engineer.util.AuthorType;
import com.example.engineer.util.UserUtil;
import com.example.engineer.util.mappers.ReportMapper;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;
    private final ReportMapper reportMapper;
    private final UserUtil userUtil;

    public ReportServiceImpl(ReportRepository reportRepository, ProductRepository productRepository,
                             CommentRepository commentRepository, ReportMapper reportMapper, UserUtil userUtil) {
        this.reportRepository = reportRepository;
        this.productRepository = productRepository;
        this.commentRepository = commentRepository;
        this.reportMapper = reportMapper;
        this.userUtil = userUtil;
    }

    @Override
    @PreAuthorize("hasRole(@userRole)")
    public ReportDto createReport(long productId, long commentId, String message, String email) throws BadRequestException {

        User reporter = userUtil.getUser(email);
        if(reporter.getIsBlocked())
            throw new ApiException("You cannot perform this operation - you're blocked", HttpStatus.FORBIDDEN);

        if((productId == 0 && commentId == 0) || (productId != 0 && commentId != 0)){
            throw new BadRequestException("productId or commentId - " +
                                "one of them needs to be in request (not both or zero)");
        }
        else if(productId == 0){
            var comment = commentRepository.findById(commentId).orElseThrow(
                    () -> new NotFoundException("Comment", commentId));

            Report report = createReport(message, comment, reporter);
            var saved = reportRepository.save(report);
            return reportMapper.mapToDto(saved);
        } else {
            var product = productRepository.findById(productId).orElseThrow(
                    () -> new NotFoundException("Product", productId));

            Report report = createReport(message, product, reporter);
            var saved = reportRepository.save(report);
            return reportMapper.mapToDto(saved);
        }
    }


    @Override
    @PreAuthorize("hasRole(@adminRole)")
    public List<ReportDto> getAllReports() {
        return reportRepository.findAll()
                        .stream()
                        .map(reportMapper::mapToDto)
                        .toList();
    }

    @Override
    @PreAuthorize("hasRole(@adminRole)")
    public ReportDto updateReport(long reportId, boolean isDone) {

        var report = reportRepository.findById(reportId).orElseThrow(
                () -> new NotFoundException("Report", reportId));

        report.setIsDone(isDone);
        var updated = reportRepository.save(report);

        return reportMapper.mapToDto(updated);
    }

    private static Report createReport(String message, Product product, User reporter) {
        return Report.builder()
                .product(product)
                .message(message)
                .authorId(product.getSeller().getId())
                .reporter(reporter)
                .isDone(false)
                .authorType(AuthorType.SELLER)
                .build();
    }

    private static Report createReport(String message, Comment comment, User reporter) {
        return Report.builder()
                .comment(comment)
                .message(message)
                .authorId(comment.getUser().getId())
                .reporter(reporter)
                .isDone(false)
                .authorType(AuthorType.USER)
                .build();
    }
}