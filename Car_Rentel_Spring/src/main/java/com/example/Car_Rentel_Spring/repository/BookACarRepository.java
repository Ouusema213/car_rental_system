package com.example.Car_Rentel_Spring.repository;

import com.example.Car_Rentel_Spring.dto.BookACarDto;
import com.example.Car_Rentel_Spring.entity.BookACar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookACarRepository extends JpaRepository<BookACar , Long> {
    List<BookACar> findAllByUserId(Long userId);
}
