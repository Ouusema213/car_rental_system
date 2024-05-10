package com.example.Car_Rentel_Spring.controller;

import com.example.Car_Rentel_Spring.dto.BookACarDto;
import com.example.Car_Rentel_Spring.dto.CarDto;
import com.example.Car_Rentel_Spring.dto.SearchCarDto;
import com.example.Car_Rentel_Spring.services.auth.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService ;
    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars (){
        List<CarDto> carDtoList = customerService.getAllCars();
        return  ResponseEntity.ok(carDtoList);
    }
    @PostMapping("/car/book/{carId}")
    public ResponseEntity<Void> bookACar(@PathVariable Long carId , @RequestBody BookACarDto bookACarDto){
        boolean success = customerService.bookACar(carId , bookACarDto);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId){
        CarDto carDto = customerService.getCarById(carId);
        if (carDto == null ) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(carDto);
    }

    @GetMapping("/car/bookings/{userId}")
    public  ResponseEntity<List<BookACarDto>> getBookingsByUserId (@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getBookingsByUserId(userId));
    }

    @PostMapping("/car/search")
    public ResponseEntity<?> searchCar(@RequestBody SearchCarDto searchCarDto){
        return ResponseEntity.ok(customerService.searchCar(searchCarDto));
    }
}
