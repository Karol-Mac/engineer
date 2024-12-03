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
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
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

    @ParameterizedTest
    @CsvSource({
            "email@example.com, password, jwtToken, USER",
            "admin@example.com, adminPassword, adminJwtToken, ADMIN",
            "user1@example.com, password1, jwtToken1, USER",
            "user2@example.com, password2, jwtToken2, USER",
            "user3@example.com, password3, jwtToken3, USER",
            "user4@example.com, password4, jwtToken4, USER",
            "user5@example.com, password5, jwtToken5, USER",
            "user6@example.com, password6, jwtToken6, USER",
            "user7@example.com, password7, jwtToken7, ADMIN",
            "user8@example.com, password8, jwtToken8, USER",
            "user9@example.com, password9, jwtToken9, USER",
            "user10@example.com, password10, jwtToken10, USER",
            "user11@example.com, password11, jwtToken11, ADMIN",
            "user12@example.com, password12, jwtToken12, USER",
            "user13@example.com, password13, jwtToken13, USER",
            "user14@example.com, password14, jwtToken14, USER"
    })
    void login_returnsJwtAuthResponse_whenValidUserCredentials(String email, String password, String expectedToken, String expectedRole) {
        LoginDto loginDto = new LoginDto(email, password);
        Role role = new Role();
        role.setName("ROLE_" + expectedRole);
        User user = User.builder().email(email).role(role).build();

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(userRepository.existsByEmail(anyString())).thenReturn(true);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn(expectedToken);

        JwtAuthResponse response = authService.login(loginDto, false);

        assertNotNull(response);
        assertEquals(expectedToken, response.getAccessToken());
        assertEquals(expectedRole, response.getTokenType());
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