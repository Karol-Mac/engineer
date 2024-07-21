package com.example.engineer.service.impl;

import com.example.engineer.entity.Report;
import com.example.engineer.entity.User;
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
    public ReportDto createReport(long productId, long commentId, String message) throws BadRequestException{

        User reporter = userUtil.getUserFromDB();
        if((productId == 0 && commentId == 0) || (productId != 0 && commentId != 0)){
            throw new BadRequestException("productId or commentId - " +
                                "one of them needs to be in request (not both or zero)");
        }
        else if(productId == 0){
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
        } else {
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
        }
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
}
