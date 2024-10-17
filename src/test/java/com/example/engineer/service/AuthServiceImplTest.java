package com.example.engineer.service;

import com.example.engineer.entity.Role;
import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.repository.RoleRepository;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuthServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private SellerRepository sellerRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void registerCompany_createsSellerAccount_whenValidInput() {
        RegisterSellerDto registerSellerDto = new RegisterSellerDto(0L, "shopName", "email@example.com", "password", "krsNumber", "imageName");
        Role role = new Role();

        when(sellerRepository.existsByEmail(anyString())).thenReturn(false);
        when(roleRepository.findByName(anyString())).thenReturn(Optional.of(role));
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        String result = authService.registerCompany(registerSellerDto);

        assertEquals("seller account created", result);
        verify(sellerRepository, times(1)).save(any(Seller.class));
    }

    @Test
    void registerCompany_throwsException_whenEmailAlreadyExists() {
        RegisterSellerDto registerSellerDto = new RegisterSellerDto(0L, "shopName", "email@example.com", "password", "krsNumber", "imageName");

        when(sellerRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(BadCredentialsException.class, () -> authService.registerCompany(registerSellerDto));
    }

    @Test
    void login_returnsJwtAuthResponse_whenValidUserCredentials() {
        LoginDto loginDto = new LoginDto("email@example.com", "password");
        Role role = new Role();
        role.setName("ROLE_USER");
        User user = User.builder().email("example@email.com").role(role).build();

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(userRepository.existsByEmail(anyString())).thenReturn(true);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        JwtAuthResponse response = authService.login(loginDto, false);

        assertNotNull(response);
        assertEquals("jwtToken", response.getAccessToken());
        assertEquals("USER", response.getTokenType());
    }

    @Test
    void login_returnsJwtAuthResponse_whenValidSellerCredentials() {
        LoginDto loginDto = new LoginDto("email@example.com", "password");
        Seller seller = new Seller();
        seller.setEmail("email@example.com");
        Role role = new Role();
        role.setName("ROLE_SELLER");
        seller.setRole(role);

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(sellerRepository.existsByEmail(anyString())).thenReturn(true);
        when(sellerRepository.findByEmail(anyString())).thenReturn(Optional.of(seller));
        when(jwtService.generateToken(any(Seller.class))).thenReturn("jwtToken");

        JwtAuthResponse response = authService.login(loginDto, true);

        assertNotNull(response);
        assertEquals("jwtToken", response.getAccessToken());
        assertEquals("SELLER", response.getTokenType());
    }

    @Test
    void login_throwsException_whenUserEmailDoesNotExist() {
        LoginDto loginDto = new LoginDto("email@example.com", "password");

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> authService.login(loginDto, false));
    }

    @Test
    void login_throwsException_whenSellerEmailDoesNotExist() {
        LoginDto loginDto = new LoginDto("email@example.com", "password");

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(sellerRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> authService.login(loginDto, true));
    }
}