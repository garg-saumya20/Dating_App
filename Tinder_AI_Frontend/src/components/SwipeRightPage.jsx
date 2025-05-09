import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Avatar, Paper } from '@mui/material';
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
    console.log(profileId, "SwipeRightPage");
    navigate(`/api/chat/${profileId}`);
  };

  return (
    <Paper sx={{ 
      padding: 4, 
      backgroundColor: '#f0f4f8', 
      background: 'linear-gradient(135deg, #f0f4f8 0%, #d0e2f2 100%)', 
      minHeight: '100vh' 
    }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Matched Profiles
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {matches.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <Card sx={{ 
              boxShadow: 3, 
              borderRadius: 4, 
              padding: 2, 
              backgroundColor: '#ffffff', 
              transition: 'transform 0.3s', 
              '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
            }}>
              <Avatar 
                src={`http://localhost:8080${profile.imageUrl}`} 
                alt={profile.firstName} 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  margin: 'auto', 
                  border: '4px solid #1976d2', 
                  marginBottom: 2 
                }} 
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#333' }}>
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>Age: {profile.age}</Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>Gender: {profile.gender}</Typography>
                <Button 
                  onClick={() => handleCardClick(profile.id)} 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ marginTop: 2, padding: '10px', textTransform: 'none' }}
                >
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default SwipeRightPage;
