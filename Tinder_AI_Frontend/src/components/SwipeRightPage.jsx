import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SwipeRightPage = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all matched profiles
    const fetchMatchedProfiles = async () => {
      const response = await fetch('http://localhost:8080/api/match/all-matches');
      const data = await response.json();
      setMatches(data);
    };

    fetchMatchedProfiles();
  }, []);

  const handleCardClick = (profileId) => {
    // Navigate to the conversation page with the profileId
    console.log(profileId,"SwipeRightPage")
    navigate(`/api/chat/${profileId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Matched Profiles</Typography>
      <Grid container spacing={2}>
        {matches.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <Card>
              <Avatar src={`http://localhost:8080${profile.imageUrl}`} alt={profile.firstName} sx={{ width: 100, height: 100, margin: 'auto' }} />
              <CardContent>
                <Typography variant="h6">{profile.firstName} {profile.lastName}</Typography>
                <Typography variant="body2">Age: {profile.age}</Typography>
                <Typography variant="body2">Gender: {profile.gender}</Typography>
                <Button onClick={() => handleCardClick(profile.id)} variant="contained" color="primary" fullWidth>
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SwipeRightPage;
