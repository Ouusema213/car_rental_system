package com.example.Car_Rentel_Spring.repository;

import com.example.Car_Rentel_Spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository <Car,Long> {


}
