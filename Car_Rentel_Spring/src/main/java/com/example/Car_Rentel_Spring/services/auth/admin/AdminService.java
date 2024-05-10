package com.example.Car_Rentel_Spring.services.auth.admin;

import com.example.Car_Rentel_Spring.dto.BookACarDto;
import com.example.Car_Rentel_Spring.dto.CarDto;
import com.example.Car_Rentel_Spring.dto.CarDtoListDto;
import com.example.Car_Rentel_Spring.dto.SearchCarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    boolean postCar(CarDto carDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);


    //get car by id

    CarDto getCarById(Long id);

    //update car api

    boolean updateCar(Long carId , CarDto carDto) throws IOException;

    //get bookings

    List<BookACarDto> getBookings();

    boolean changeBookingStatus(Long bookingId , String status);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
