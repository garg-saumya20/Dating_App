package com.dating.bot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dating.bot.entity.AiProfile;


@Repository
public interface AiProfileRepository extends JpaRepository<AiProfile, Long> {
}
