package com.example.engineer.service.impl;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.Role;
import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.AccountDto;
import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.repository.*;
import com.example.engineer.service.AccountManagementService;
import com.example.engineer.util.AccountMapper;
import com.example.engineer.util.RoleBeans;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class AccountManagementServiceImpl implements AccountManagementService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;
    private final CommentRepository commentRepository;


    public AccountManagementServiceImpl(UserRepository userRepository,
                                        SellerRepository sellerRepository,
                                        RoleRepository roleRepository,
                                        PasswordEncoder passwordEncoder,
                                        AccountMapper accountMapper, CommentRepository commentRepository){
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountMapper = accountMapper;
        this.commentRepository = commentRepository;
    }

    @Override
    public RegisterUserDto changeCredentials(String username, String password){
        User user = getUserFromDB();

        if(username != null) user.setUsername(username);
        if(password != null) user.setPassword(passwordEncoder.encode(password));

        var savedUser = userRepository.save(user);

        return new RegisterUserDto(
                savedUser.getRealUsername(),
                savedUser.getEmail(),
                savedUser.getPassword());
    }

    @Override
    public List<AccountDto> getAllUsers(){
        var users = userRepository.findAll()
                .stream().map(accountMapper::mapToDto);
        var sellers = sellerRepository.findAll()
                .stream().map(accountMapper::mapToDto);

        return Stream.concat(sellers, users).toList();
    }

    @Override
    public List<AccountDto> getAccountsByName(String name) {

        return getAllUsers()
                .stream()
                .filter(account ->
                        account.getUsername().contains(name))
                .toList();

    }

//    @Override
//    public AccountDto getUser(String type, long id){
//
//        var user = getUserById(type, id);
//        if(type.equals(RoleBeans.USER)){
//            return accountMapper.mapToDto((User) user);
//        } else {
//            return accountMapper.mapToDto((Seller) user);
//        }
//    }

    @Override
    public AccountDto updateUser(AccountDto account)
            throws BadCredentialsException, BadRequestException {

        var email = account.getEmail();
        if(userRepository.existsByEmail(email)){
            var user = userRepository.findByEmail(email).get();

            user.setIsBlocked(account.getIsBlocked());
            user.setIsDeleted(account.getIsDeleted());
            user.setRole(getRoleByName(account.getRole()));
            User updated = userRepository.save(user);
            return accountMapper.mapToDto(updated);
        } else {
            var seller = sellerRepository.findByEmail(email).orElseThrow(
                    () -> new BadCredentialsException("User with email " + email + " not found"));

            seller.setDeleted(account.getIsDeleted());
            seller.setRole(getRoleByName(account.getRole()));
            Seller updated = sellerRepository.save(seller);
            return accountMapper.mapToDto(updated);
        }
    }

    private Role getRoleByName(String roleName) throws BadRequestException {
        return roleRepository.findByName("ROLE_" + roleName.toUpperCase())
                .orElseThrow(() -> new BadRequestException("Role name is incorrect"));
    }


    @Override
    public String removeAllComments(long id){
        User user = (User) getUserById(RoleBeans.USER, id);

        List<Comment> wrotedComments = commentRepository.findByUser(user);

        wrotedComments.forEach(comment -> comment.setVisible(false));
        commentRepository.saveAll(wrotedComments);

        return "All user's comments removed successfully";
    }


    private UserDetails getUserById(String type, long id){

        if(type.equalsIgnoreCase(RoleBeans.USER)) {
            return userRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("User", id));
        }
        return sellerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Seller", id));
    }

    private User getUserFromDB(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found with email: " + email));
    }

}
