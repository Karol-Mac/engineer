package com.example.engineer.service.impl;

import com.example.engineer.entity.Role;
import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.repository.RoleRepository;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.AuthService;
import com.example.engineer.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SellerRepository sellerRepository;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                           JwtService jwtService, SellerRepository sellerRepository){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.sellerRepository = sellerRepository;
    }

    @Override
    public String register(RegisterUserDto registerUserDto) throws BadCredentialsException{

        if(userRepository.existsByEmail(registerUserDto.getEmail()))
                    throw new BadCredentialsException("User with given email (" + registerUserDto.getEmail() +") already exist");

        Role role = roleRepository.findByName("ROLE_USER").get();

        var user = User.builder()
                .username(registerUserDto.getUsername())
                .password(passwordEncoder.encode(registerUserDto.getPassword()))
                .email(registerUserDto.getEmail())
                .role(role)
                .isBlocked(false)
                .isDeleted(false)
                .isDarkModeOn(false)
                .build();

        userRepository.save(user);

        return "user account created";
    }

    @Override
    public String registerCompany(RegisterSellerDto registerSellerDto) throws BadCredentialsException{
        if(sellerRepository.existsByEmail(registerSellerDto.getEmail()))
            throw new BadCredentialsException("Seller with given email (" + registerSellerDto.getEmail() +") already exist");

        Role role = roleRepository.findByName("ROLE_SELLER").get();

        var seller = Seller.builder()
                .shopName(registerSellerDto.getShopName())
                .email(registerSellerDto.getEmail())
                .password(passwordEncoder.encode(registerSellerDto.getPassword()))
                .KRS(registerSellerDto.getKrsNumber())
                .role(role)
                .isDeleted(false)
                .imageName(registerSellerDto.getImageName())
                .build();

        sellerRepository.save(seller);

        return "seller account created";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto, boolean isSeller) {
        authenticate(loginDto);

        UserDetails user;
        if(isSeller) {
            if(!sellerRepository.existsByEmail(loginDto.getEmail()))
                throw new BadCredentialsException("Seller's email (" + loginDto.getEmail() +") does not exist");
            user = sellerRepository.findByEmail(loginDto.getEmail()).get();
        } else {
            if(!userRepository.existsByEmail(loginDto.getEmail()))
                throw new BadCredentialsException("User's email (" + loginDto.getEmail() +") does not exist");
            user = userRepository.findByEmail(loginDto.getEmail()).get();
        }

        var role = user.getAuthorities().stream()
                                        .findFirst()
                                        .get()
                                        .getAuthority()
                                        .substring(5);

        JwtAuthResponse authResponse = new JwtAuthResponse();
        authResponse.setAccessToken(jwtService.generateToken(user));
        authResponse.setTokenType(role);

        return authResponse;
    }

    private void authenticate(LoginDto loginDto){
        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
