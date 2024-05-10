package com.example.Car_Rentel_Spring.dto;

import com.example.Car_Rentel_Spring.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id ;

    private String name ;

    private String email ;

    private UserRole userRole ;
}
