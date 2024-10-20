package com.example.engineer.config;

import com.example.engineer.exceptions.RestAuthenticationEntryPoint;
import com.example.engineer.util.RoleBeans;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          RestAuthenticationEntryPoint restAuthenticationEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers("/api/auth/**").permitAll()
                                //every user should be able to see seller details (when viewing product)
                                .requestMatchers(HttpMethod.GET, "/api/accounts/{sellerId}").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/images/**").permitAll()

                                /** Jwt filter need's to be applied on those endpoints,
                                 but at the same time I need's
                                 to be accessible for every user (anonymous too)
                                 this is why I created RoleBeans
                                 */
                                .requestMatchers(HttpMethod.GET, "/api/comments").hasAnyRole(RoleBeans.getAllRoles())
                                .requestMatchers(HttpMethod.GET, "/api/products/**").hasAnyRole(RoleBeans.getAllRoles())
                                .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(restAuthenticationEntryPoint))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
