package com.dating.bot.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private int age;
    private String ethnicity;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String bio;
    private String imageUrl;
    private String myersBriggsPersonalityType;
}
