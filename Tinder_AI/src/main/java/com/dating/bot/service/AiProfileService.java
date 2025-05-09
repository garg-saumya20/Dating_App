package com.dating.bot.service;

import java.io.File;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.dating.bot.entity.AiProfile;
import com.dating.bot.entity.Gender;
import com.dating.bot.repository.AiProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiProfileService {

    private final AiProfileRepository repository;

    public AiProfile generateRandomProfile() {
        String[] firstNames = {"Ava", "Liam", "Mia", "Noah", "Zoe"};
        String[] lastNames = {"Smith", "Lee", "Patel", "Garcia"};
        String[] ethnicities = {"Asian", "Caucasian", "Hispanic", "African"};
        String[] mbtiTypes = {"INTJ", "ENFP", "ISTP", "INFJ"};
        String[] bios = {
            "I love hiking and exploring new places.",
            "Coffee addict and book lover.",
            "Sarcastic but lovable. Swipe right and find out!"
        };

        Random random = new Random();
        Gender gender = Gender.values()[random.nextInt(Gender.values().length)];

        String imagePath = gender == Gender.MALE ? "images/men" : "images/women";
        String selectedImage = getRandomImageFileName(imagePath);

        AiProfile profile = AiProfile.builder()
                .firstName(firstNames[random.nextInt(firstNames.length)])
                .lastName(lastNames[random.nextInt(lastNames.length)])
                .age(18 + random.nextInt(10))
                .ethnicity(ethnicities[random.nextInt(ethnicities.length)])
                .gender(gender)
                .bio(bios[random.nextInt(bios.length)])
                .imageUrl("/" + imagePath + "/" + selectedImage)
                .myersBriggsPersonalityType(mbtiTypes[random.nextInt(mbtiTypes.length)])
                .build();

        return repository.save(profile);
    }

    private String getRandomImageFileName(String folderPath) {
        File folder = new File("src/main/resources/static/" + folderPath);
        File[] files = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg") 
                                                  || name.toLowerCase().endsWith(".png")
                                                  || name.toLowerCase().endsWith(".jpeg"));
        if (files == null || files.length == 0) {
            throw new RuntimeException("No images found in folder: " + folderPath);
        }
        return files[new Random().nextInt(files.length)].getName();
    }
}
