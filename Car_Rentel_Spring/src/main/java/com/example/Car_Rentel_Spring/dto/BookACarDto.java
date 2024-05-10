package com.example.Car_Rentel_Spring.dto;

import com.example.Car_Rentel_Spring.enums.BookCarStatus;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;
@RequiredArgsConstructor
@Data
public class BookACarDto {

    private Long id ;

    private Date fromDate ;
    private Date toDate ;
    private Long days ;
    private Long price ;

    private BookCarStatus bookCarStatus;

    private Long cardId ;

    private Long userId ;

    private String username;

    private String email ;



}
