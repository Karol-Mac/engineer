package com.example.engineer.service.impl;

import com.example.engineer.entity.Report;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.ReportDto;
import com.example.engineer.repository.CommentRepository;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.repository.ReportRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.ReportService;
import com.example.engineer.util.AuthorType;
import com.example.engineer.util.mappers.ReportMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ReportMapper reportMapper;

    public ReportServiceImpl(ReportRepository reportRepository, ProductRepository productRepository,
                             CommentRepository commentRepository, UserRepository userRepository,
                             ReportMapper reportMapper) {
        this.reportRepository = reportRepository;
        this.productRepository = productRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.reportMapper = reportMapper;
    }

    @Override
    public ReportDto createReport(long productId, long commentId, String message) {

        User reporter = getUserFromDB();

        if(productId == 0){
            var comment = commentRepository.findById(commentId).orElseThrow(
                    () -> new NotFoundException("Comment", commentId));

            Report report = Report.builder()
                    .comment(comment)
                    .message(message)
                    .authorId(comment.getUser().getId())
                    .reporter(reporter)
                    .isDone(false)
                    .authorType(AuthorType.USER)
                    .build();

            var saved = reportRepository.save(report);

            return reportMapper.mapToDto(saved);
        } else if (commentId == 0) {
            var product = productRepository.findById(productId).orElseThrow(
                    () -> new NotFoundException("Product", productId));

            Report report = Report.builder()
                    .product(product)
                    .message(message)
                    .authorId(product.getSeller().getId())
                    .reporter(reporter)
                    .isDone(false)
                    .authorType(AuthorType.SELLER)
                    .build();

            var saved = reportRepository.save(report);

            return reportMapper.mapToDto(saved);
        } else throw new BadCredentialsException("product Id or comment id is wrong");
    }

    @Override
    public List<ReportDto> getAllReports() {
        return reportRepository.findAll()
                        .stream()
                        .map(reportMapper::mapToDto)
                        .toList();
    }

    @Override
    public ReportDto updateReport(long reportId, boolean isDone) {

        var report = reportRepository.findById(reportId).orElseThrow(
                () -> new NotFoundException("Report", reportId));

        report.setIsDone(isDone);
        var updated = reportRepository.save(report);

        return reportMapper.mapToDto(updated);
    }

    private User getUserFromDB(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found with email: " + email));
    }
}
