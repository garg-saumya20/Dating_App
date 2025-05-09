package com.dating.bot.controller;

import java.util.List;
import java.util.Map;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dating.bot.entity.AiProfile;
import com.dating.bot.entity.UserMatch;
import com.dating.bot.repository.AiProfileRepository;
import com.dating.bot.repository.MatchRepository;
import com.dating.bot.service.MatchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {
	
	private final MatchService matchService;
	private final MatchRepository matchRepository;
	private final AiProfileRepository aiProfileRepository;

	@PostMapping("/swipe-right/{profileId}")
	public ResponseEntity<?> swipeRight(@PathVariable Long profileId) {
	    Long userId = 1L; // Static user for now

	    try {
	        UserMatch match = matchService.createMatch(profileId, userId);
	        return ResponseEntity.status(HttpStatus.CREATED).body(match);
	    } catch (RuntimeException e) {
	        // This catches "Profile not found"
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body(Map.of("error", "An unexpected error occurred"));
	    }
	}

	
	@GetMapping("/all-matches")
	public ResponseEntity<List<AiProfile>> getAllMatchedProfiles() {
	    // Fetch all ai_profile_id from user_match table
	    List<Long> aiProfileIds = matchRepository.findAllAiProfileIds();

	    // If no ai_profile_ids found, return 204 No Content
	    if (aiProfileIds.isEmpty()) {
	        return ResponseEntity.noContent().build();
	    }

	    // Fetch AiProfile entities by the ids
	    List<AiProfile> matchedProfiles = aiProfileRepository.findAllById(aiProfileIds);

	 

	    // Return matched profiles with 200 OK status
	    return ResponseEntity.ok(matchedProfiles);
	}



}
