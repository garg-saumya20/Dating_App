package com.dating.bot.controller;

import com.dating.bot.entity.AiProfile;
import com.dating.bot.repository.AiProfileRepository;
import com.dating.bot.service.AiProfileService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AiProfileController {

    private final AiProfileService aiProfileService;
    private final AiProfileRepository aiProfileRepository;

    @PostMapping("/generate")
    public AiProfile generateProfile() {
        return aiProfileService.generateRandomProfile();
    }
    
    @GetMapping("/{profileId}")
    public ResponseEntity<?> getProfile(@PathVariable Long profileId) {
        // Attempt to fetch the profile from the repository
        AiProfile profile = aiProfileRepository.findById(profileId).orElse(null);
        
        if (profile == null) {
            // If no profile is found, return a NOT_FOUND response
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Profile with ID " + profileId + " not found.");
        }
        
        // If profile is found, return it in the response body
        return ResponseEntity.ok(profile);
    }
}
