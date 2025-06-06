package com.travelplanner.itinerary.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Itinerary {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	private UUID userId;
	private String username;
	private String title;
	private LocalDate startDate;
	private LocalDate endDate;

	

	private String notes;
	private LocalDate lastUpdated;
	private boolean isShared;
	private String shareToken;

	@ElementCollection
	private List<String> destinations;

	@ElementCollection
	private List<String> activities;

	@ElementCollection
	private List<UUID> collaborators;

	@ElementCollection
	private List<String> bookings; // Booking details from external API

	// Getters and Setters

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public List<String> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<String> destinations) {
		this.destinations = destinations;
	}

	public List<String> getActivities() {
		return activities;
	}

	public void setActivities(List<String> activities) {
		this.activities = activities;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public List<UUID> getCollaborators() {
		return collaborators;
	}

	public void setCollaborators(List<UUID> collaborators) {
		this.collaborators = collaborators;
	}

	public LocalDate getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(LocalDate lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public boolean isShared() {
		return isShared;
	}

	public void setShared(boolean shared) {
		isShared = shared;
	}

	public String getShareToken() {
		return shareToken;
	}

	public void setShareToken(String shareToken) {
		this.shareToken = shareToken;
	}

	public List<String> getBookings() {
		return bookings;
	}

	public void setBookings(List<String> bookings) {
		this.bookings = bookings;
	}

}