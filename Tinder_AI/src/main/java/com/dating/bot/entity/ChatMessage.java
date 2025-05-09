package com.dating.bot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @ManyToOne
    private AiProfile aiProfile;

    private String sender; // "USER" or "AI"
    
    @Column(columnDefinition = "TEXT")
    private String message;
    private LocalDateTime sentAt;
}


//We use sender = "USER" or "AI" to keep it simple.

//Messages are linked to AIProfile and static userId = 1.
