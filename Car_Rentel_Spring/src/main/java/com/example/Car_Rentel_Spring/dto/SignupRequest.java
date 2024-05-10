package com.example.Car_Rentel_Spring.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String name ;
    private String password ;
}
