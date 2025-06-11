package com.travelplanner.itinerary.repository;

import com.travelplanner.itinerary.model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItineraryRepository extends JpaRepository<Itinerary, UUID> {
    Optional<Itinerary> findByShareToken(String token);

	List<Itinerary> findByUserId(long userId);
}
