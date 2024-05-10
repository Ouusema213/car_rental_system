package com.example.Car_Rentel_Spring.services.auth;

import com.example.Car_Rentel_Spring.dto.SignupRequest;
import com.example.Car_Rentel_Spring.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
