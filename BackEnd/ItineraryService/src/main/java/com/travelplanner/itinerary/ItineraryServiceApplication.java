package com.travelplanner.itinerary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ItineraryServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ItineraryServiceApplication.class, args);
    }
}
