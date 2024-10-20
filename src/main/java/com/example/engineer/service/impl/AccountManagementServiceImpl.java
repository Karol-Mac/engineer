package com.example.engineer.service.impl;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.Role;
import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.AccountDto;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.repository.*;
import com.example.engineer.service.AccountManagementService;
import com.example.engineer.util.UserUtil;
import com.example.engineer.util.mappers.AccountMapper;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final UserUtil userUtil;


    public AccountManagementServiceImpl(UserRepository userRepository,
                                        SellerRepository sellerRepository,
                                        RoleRepository roleRepository,
                                        PasswordEncoder passwordEncoder,
                                        AccountMapper accountMapper,
                                        CommentRepository commentRepository, UserUtil userUtil){
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountMapper = accountMapper;
        this.commentRepository = commentRepository;
        this.userUtil = userUtil;
    }

    @Override
    public RegisterUserDto changeCredentials(String username, String password, String email){
        User user = userUtil.getUser(email);

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
                .stream()
                .map(accountMapper::mapToDto);
        var sellers = sellerRepository.findAll()
                .stream()
                .map(accountMapper::mapToDto);

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

    @Override
    public RegisterSellerDto getSellerById(long sellerId){
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow( () -> new UsernameNotFoundException("Seller with id: " + sellerId + " not found"));

        return mapToDto(seller);
    }

    @Override
    public AccountDto updateUser(AccountDto account)
            throws BadCredentialsException, BadRequestException {

        var email = account.getEmail();
        if(userRepository.existsByEmail(email)){
            var user = userUtil.getUser(email);

            user.setIsBlocked(account.getIsBlocked());
            user.setIsDeleted(account.getIsDeleted());
            user.setRole(getRoleByName(account.getRole()));
            User updated = userRepository.save(user);
            return accountMapper.mapToDto(updated);
        } else {
            var seller = sellerRepository.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("User with email " + email + " not found"));

            seller.setIsDeleted(account.getIsDeleted());
            seller.setRole(getRoleByName(account.getRole()));
            Seller updated = sellerRepository.save(seller);
            return accountMapper.mapToDto(updated);
        }
    }


    @Override
    public String removeAllComments(long id) throws BadRequestException {
        if( id <= 0) throw new BadRequestException("Id must be greater than 0");
        User user = userRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("User", id));

        List<Comment> wrotedComments = commentRepository.findByUser(user);

        wrotedComments.forEach(comment -> comment.setIsVisible(false));
        commentRepository.saveAll(wrotedComments);

        return "All user's comments removed successfully";
    }

    @Override
    public List<RegisterSellerDto> getSellers(){
        return sellerRepository.findAll().stream().map(this::mapToDto).toList();
    }

    private Role getRoleByName(String roleName) throws BadRequestException {
        return roleRepository.findByName("ROLE_" + roleName.toUpperCase())
                .orElseThrow(() -> new BadRequestException("Role name is incorrect"));
    }

    private RegisterSellerDto mapToDto(Seller seller){
        var sellerDto = new RegisterSellerDto();
        sellerDto.setId(seller.getId());
        sellerDto.setShopName(seller.getShopName());
        sellerDto.setEmail(seller.getEmail());
        sellerDto.setPassword(seller.getPassword());
        sellerDto.setKrsNumber(seller.getKRS());
        sellerDto.setImageName(seller.getImageName());

        return sellerDto;
    }
}
