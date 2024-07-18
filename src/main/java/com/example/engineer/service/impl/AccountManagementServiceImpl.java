package com.example.engineer.service.impl;

import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.AccountDto;
import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.repository.*;
import com.example.engineer.service.AccountManagementService;
import com.example.engineer.util.RoleBeans;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class AccountManagementServiceImpl implements AccountManagementService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public AccountManagementServiceImpl(UserRepository userRepository,
                                        SellerRepository sellerRepository,
                                        ProductRepository productRepository,
                                        CommentRepository commentRepository,
                                        RoleRepository roleRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.commentRepository = commentRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterUserDto changeCredentials(String username, String password){
        User user = (User) getUserFromDB(RoleBeans.USER);

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
                .stream().map(AccountManagementServiceImpl::mapToDto);
        var sellers = sellerRepository.findAll()
                .stream().map(AccountManagementServiceImpl::mapToDto);

        return Stream.concat(sellers, users).toList();
    }

    @Override
    public AccountDto getUser(String type, long id){
        return null;
    }

    @Override
    public AccountDto updateUser(AccountDto account) throws NotFoundException{
        return null;
    }

    @Override
    public String removeAllComments(long id){
        return "";
    }


    private UserDetails getUserFromDB(String type){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if(type.equalsIgnoreCase(RoleBeans.USER)){
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("User not found", 1));
        }

        return sellerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Seller not found"));
    }

    private static AccountDto mapToDto(User user){
        AccountDto accountDto = new AccountDto();

        accountDto.setId(user.getId());
        accountDto.setUsername(user.getRealUsername());
        accountDto.setEmail(user.getEmail());
        accountDto.setIsBlocked(user.getIsBlocked());
        accountDto.setIsDeleted(user.getIsDeleted());
        //only role name, not ROLE_NAME
        accountDto.setRole(user.getRole().getName().substring(5));
        accountDto.setReportsCount(user.getReports().size());
        accountDto.setCommentsCount(user.getComments().size());

        //FIXME: ???
        var reportedCommentsCount = user.getReports().stream()
                .filter(report -> report.getComment() != null).count();
        var reportedProductsCount = user.getReports().stream()
                .filter(report -> report.getProduct() != null).count();


        accountDto.setReportedCommentsCount(reportedCommentsCount);
        accountDto.setReportedProductsCount(reportedProductsCount);
        accountDto.setAddedProductsCount(0);

        return accountDto;
    }

    private static AccountDto mapToDto(Seller seller){
        AccountDto accountDto = new AccountDto();

        accountDto.setId(seller.getId());
        accountDto.setUsername(seller.getShopName());
        accountDto.setEmail(seller.getEmail());
        accountDto.setIsBlocked(false);
        accountDto.setIsDeleted(seller.getIsDeleted());
        //only role name, not ROLE_NAME
        accountDto.setRole(seller.getRole().getName().substring(5));

        accountDto.setReportsCount(0);
        accountDto.setCommentsCount(0);
        accountDto.setReportedCommentsCount(0);
        accountDto.setReportedProductsCount(0);

        accountDto.setAddedProductsCount(seller.getProducts().size());

        return accountDto;
    }

}
