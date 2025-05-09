package com.dating.bot.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

import com.dating.bot.entity.AiProfile;
import com.dating.bot.entity.ChatMessage;
import com.dating.bot.ollama.OllamaClient;
import com.dating.bot.repository.AiProfileRepository;
import com.dating.bot.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
	
	private final ChatMessageRepository chatRepo;
    private final AiProfileRepository aiProfileRepo;
    //private final LLMClient openAIClient;
    private final OllamaClient llmClient;

    
    public List<ChatMessage> getChatHistory(Long aiProfileId) {
        return chatRepo.findByAiProfileIdOrderBySentAtAsc(aiProfileId);
    }

    public ChatMessage sendUserMessage(Long aiProfileId, String message) {
        AiProfile aiProfile = aiProfileRepo.findById(aiProfileId)
                .orElseThrow(() -> new RuntimeException("AI Profile not found"));

        ChatMessage userMessage = ChatMessage.builder()
                .userId(1L)
                .aiProfile(aiProfile)
                .sender("USER")
                .message(message)
                .sentAt(LocalDateTime.now())
                .build();

        chatRepo.save(userMessage);

        // Generate AI reply
        // String aiReply = openAIClient.generateReply(profile, message);
            String aiReply = llmClient.generateReply(aiProfile, message);

        ChatMessage aiMessage = ChatMessage.builder()
                .userId(1L)
                .aiProfile(aiProfile)
                .sender("AI")
                .message(aiReply)
                .sentAt(LocalDateTime.now())
                .build();

        return chatRepo.save(aiMessage);
    }

    public AiProfile getProfileDetails(Long profileId) {
        return aiProfileRepo.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}
