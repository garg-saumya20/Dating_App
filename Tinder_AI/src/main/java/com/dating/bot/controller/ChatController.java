package com.dating.bot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dating.bot.entity.AiProfile;
import com.dating.bot.entity.AiProfile;
import com.dating.bot.entity.ChatMessage;
import com.dating.bot.repository.MatchRepository;
import com.dating.bot.service.ChatService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

	private final ChatService chatService;
	private final MatchRepository matchRepository;

//	@GetMapping("/{profileId}")
//	public ResponseEntity<?> getChat(@PathVariable Long profileId) {
//		
//		boolean profileExists = matchRepository.existsByAiProfileId(profileId);
//		if(!profileExists)
//		{
//			return ResponseEntity.status(HttpStatus.NOT_FOUND)
//	                .body("NO conversation found.Please make a match with profile first.");
//		}
//	    List<ChatMessage> chatHistory = chatService.getChatHistory(profileId);
//           
//	    if (chatHistory.isEmpty()) {
//	        return ResponseEntity.status(HttpStatus.FORBIDDEN)
//	                .body("No chat history found for this profile, Please start a conversation first.");
//	    }
//
//	    // Fetch profile details (from AIProfileService or Repository)
//	    AiProfile profile = chatService.getProfileDetails(profileId); // You'll need to implement this
//
//	    ChatResponse response = new ChatResponse();
//	    response.setProfile(profile);
//	    response.setMessages(chatHistory);
//
//	    return ResponseEntity.ok(response);
//	}
	
	@GetMapping("/{profileId}")
	public ResponseEntity<?> getChat(@PathVariable Long profileId) {
	    System.out.println("Received request for chat with profileId: " + profileId);

	    boolean profileExists = matchRepository.existsByAiProfileId(profileId);
	    System.out.println("Profile match exists: " + profileExists);

	    if (!profileExists) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body("NO conversation found. Please make a match with profile first.");
	    }

	    List<ChatMessage> chatHistory = chatService.getChatHistory(profileId);
	    System.out.println("Chat history size: " + chatHistory.size());

	    if (chatHistory.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN)
	            .body("No chat history found for this profile, Please start a conversation first.");
	    }

	    AiProfile profile = chatService.getProfileDetails(profileId);
	    System.out.println("Fetched profile: " + profile.getFirstName());

	    ChatResponse response = new ChatResponse();
	    response.setProfile(profile);
	    response.setMessages(chatHistory);

	    return ResponseEntity.ok(response);
	}

	
	
	
    @PostMapping("/{profileId}")
    public ResponseEntity<?> sendMessage(@PathVariable Long profileId, @RequestBody MessageDTO userMessage) {
        // Check if profileId exists in UserMatch
        boolean isMatched = matchRepository.existsByAiProfileId(profileId);

        if (!isMatched) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("❌ No match found for this profile. Please match before starting a conversation.");
        }

        ChatMessage chatMessage = chatService.sendUserMessage(profileId, userMessage.getMessage());
        return ResponseEntity.ok(chatMessage);
    }


    @Data
    public static class MessageDTO {
        private String message;
    }
    
    @Data
    public static class ChatResponse {
        private AiProfile profile;
        private List<ChatMessage> messages;
    }
}
