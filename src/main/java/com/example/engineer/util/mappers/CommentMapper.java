package com.example.engineer.util.mappers;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.User;
import com.example.engineer.payload.CommentDto;
import com.example.engineer.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    private final UserRepository userRepository;

    public CommentMapper(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    public CommentDto mapToDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setAuthorName(comment.getUser().getRealUsername());
        commentDto.setIsVisible(comment.getIsVisible());

        //checking wether user reported exact comment
        var user = getUserFromDB();
        if (user == null) commentDto.setIsReported(false);
        else commentDto.setIsReported(isReported(comment, user));

        return commentDto;
    }

    private static boolean isReported(Comment comment, User user) {
        return user.getReports().stream()
                .filter(report -> report.getComment() != null && !report.getIsDone())
                .anyMatch(report -> report.getComment().equals(comment));
    }

    private User getUserFromDB(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        /** If a user is anonymous, or it's a seller (which can't add products to favourite either)
         then return null (set isFav & isRep to false)*/
        if(email.equals("anonymousUser")) return null;
        else {
            return userRepository.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("User with email: " + email + " not found"));
        }
    }
}
