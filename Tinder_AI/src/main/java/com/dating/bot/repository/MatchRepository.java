package com.dating.bot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dating.bot.entity.UserMatch;



@Repository
public interface MatchRepository extends JpaRepository<UserMatch , Long> {
	
	boolean existsByAiProfileId(Long ai_profile_id);

//	List<UserMatch> findByUserProfileId(Long profileId);

  
	 @Query("SELECT um.aiProfile.id FROM UserMatch um") // JPQL query
    List<Long> findAllAiProfileIds();
}
