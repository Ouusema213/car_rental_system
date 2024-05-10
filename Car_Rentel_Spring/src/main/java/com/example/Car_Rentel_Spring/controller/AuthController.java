package com.example.Car_Rentel_Spring.controller;

import com.example.Car_Rentel_Spring.dto.AuthenticationRequest;
import com.example.Car_Rentel_Spring.dto.AuthenticationResponse;
import com.example.Car_Rentel_Spring.dto.SignupRequest;
import com.example.Car_Rentel_Spring.dto.UserDto;
import com.example.Car_Rentel_Spring.entity.User;
import com.example.Car_Rentel_Spring.repository.UserRepository;
import com.example.Car_Rentel_Spring.services.auth.AuthService;
import com.example.Car_Rentel_Spring.services.auth.jwt.UserService;
import com.example.Car_Rentel_Spring.utils.JWTutils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserService userService ;

    private final JWTutils jwTutils ;

    private final UserRepository userRepository ;


    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest){
        if (authService.hasCustomerWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("Customer already exist",HttpStatus.NOT_ACCEPTABLE);
        UserDto createdCustomerDto = authService.createCustomer(signupRequest);
        if (createdCustomerDto == null)return new  ResponseEntity<>("Customer not created , come again later", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(createdCustomerDto,HttpStatus.CREATED);
    }


    @PostMapping ("/login")
    public AuthenticationResponse createAuthenticationToken (@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try {
            authenticationManager.authenticate (new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException ("Incorrect username or password.");
        }
        final UserDetails userDetails = userService.userDetailsService ().loadUserByUsername (authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt =jwTutils.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId (optionalUser.get().getId());
            authenticationResponse.setUserRole (optionalUser.get().getUserRole());
        }
        return authenticationResponse;}

}
