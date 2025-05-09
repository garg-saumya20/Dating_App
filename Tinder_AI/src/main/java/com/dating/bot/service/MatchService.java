package com.dating.bot.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.dating.bot.entity.AiProfile;
import com.dating.bot.entity.UserMatch;
import com.dating.bot.repository.AiProfileRepository;
import com.dating.bot.repository.MatchRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchService {
	
	private final MatchRepository matchRepository;
    private final AiProfileRepository aiProfileRepository;

    public UserMatch createMatch(Long aiProfileId, Long userId) {
        AiProfile aiProfile = aiProfileRepository.findById(aiProfileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        UserMatch  match = UserMatch .builder()
                .userId(userId)
                .aiProfile(aiProfile)
                .matchedAt(LocalDateTime.now())
                .build();
        System.out.println(match);

        return matchRepository.save(match);
    }

}
