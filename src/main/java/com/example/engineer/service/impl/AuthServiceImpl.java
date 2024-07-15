package com.example.engineer.service.impl;

import com.example.engineer.entity.Role;
import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.AuthorizationException;
import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.repository.RoleRepository;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.AuthService;
import com.example.engineer.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SellerRepository sellerRepository;

    @Override
    public String register(RegisterUserDto registerUserDto){

        if(userRepository.existsByEmail(registerUserDto.getEmail()))
                    throw new AuthorizationException("User with given email (" + registerUserDto.getEmail() +") already exist");

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
    public JwtAuthResponse login(LoginDto loginDto){
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(), loginDto.getPassword()));
//            SecurityContextHolder.getContext().setAuthentication(authentication);     //FIXME: not necessary ?

            var user = userRepository.findByEmail(loginDto.getEmail()).get();

            //returning generated token (when user is authenticated)
            JwtAuthResponse authResponse = new JwtAuthResponse();
            authResponse.setAccessToken(jwtService.generateToken(user));

            return authResponse;
    }


    @Override
    public String registerCompany(RegisterSellerDto registerSellerDto){
        if(sellerRepository.existsByEmail(registerSellerDto.getEmail()))
            throw new AuthorizationException("Seller with given email (" + registerSellerDto.getEmail() +") already exist");

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

        return "Seller account created";
    }

    @Override
    public JwtAuthResponse loginCompany(LoginDto loginDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));
//            SecurityContextHolder.getContext().setAuthentication(authentication);     //FIXME: not necessary ?

        var seller = sellerRepository.findByEmail(loginDto.getEmail()).get();

        JwtAuthResponse authResponse = new JwtAuthResponse();
        authResponse.setAccessToken(jwtService.generateToken(seller));

        return authResponse;
    }
}
