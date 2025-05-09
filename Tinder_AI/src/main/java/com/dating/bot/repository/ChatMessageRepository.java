package com.dating.bot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dating.bot.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	
	List<ChatMessage> findByAiProfileIdOrderBySentAtAsc(Long aiProfileId);
}
