package com.example.Car_Rentel_Spring.services.auth.customer;

import com.example.Car_Rentel_Spring.dto.BookACarDto;
import com.example.Car_Rentel_Spring.dto.CarDto;
import com.example.Car_Rentel_Spring.dto.CarDtoListDto;
import com.example.Car_Rentel_Spring.dto.SearchCarDto;

import java.util.List;

public interface CustomerService {

    List<CarDto> getAllCars() ;

    boolean bookACar(Long carId , BookACarDto bookACarDto);

    CarDto getCarById( Long carId) ;

    List<BookACarDto> getBookingsByUserId(Long userId);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
