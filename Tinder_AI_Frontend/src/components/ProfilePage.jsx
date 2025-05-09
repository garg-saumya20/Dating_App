import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import GroupIcon from '@mui/icons-material/Group'; // 👈 Import the icon
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/profiles/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSwipeLeft = () => {
    console.log('Swiped Left');
    fetchProfile(); // Load new profile
  };

  const handleSwipeRight = async () => {
    console.log('Swiped Right');
    if (!profile) return;

    try {
      const response = await fetch(`http://localhost:8080/api/match/swipe-right/${profile.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Failed to create match: ${response.status}`);
      const result = await response.json();
      console.log('Match created:', result);

      navigate(`api/chat/${profile.id}`);
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  if (!profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #FFAFBD 0%, #ffc3a0 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top Right People Icon */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <IconButton
          onClick={() => navigate('/api/match/all-matches')} // 👈 Change the route as needed
          sx={{
            backgroundColor: '#ffffffaa',
            '&:hover': { backgroundColor: '#ffffff' },
          }}
        >
          <GroupIcon sx={{ color: '#ff1744' }} />
        </IconButton>
      </Box>

      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          mb: 5,
          textAlign: 'center',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}
      >
        Welcome to Tinder AI Dating App
      </Typography>

      {/* Profile Card */}
      <Card
        sx={{
          width: { xs: '90%', sm: 400 },
          p: 3,
          borderRadius: 4,
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.05)' },
          border: '2px solid #ff1744',
        }}
      >
        <Avatar
          src={`http://localhost:8080${profile.imageUrl}`}
          alt={`${profile.firstName} ${profile.lastName}`}
          sx={{
            width: 120,
            height: 120,
            mx: 'auto',
            mb: 2,
            border: '5px solid #ff1744',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        />
        <CardContent sx={{ padding: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}
            gutterBottom
          >
            {profile.firstName} {profile.lastName}, {profile.age}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ff1744' }}>
            Gender: {profile.gender}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ff1744' }}>
            Ethnicity: {profile.ethnicity}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ff1744' }} gutterBottom>
            MBTI: {profile.myersBriggsPersonalityType}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#555' }}>
            {profile.bio}
          </Typography>
        </CardContent>

        {/* Swipe Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 4 }}>
          <IconButton
            onClick={handleSwipeLeft}
            sx={{
              backgroundColor: '#ff1744',
              color: 'white',
              '&:hover': { backgroundColor: '#d50032' },
              width: 60,
              height: 60,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <ClearIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleSwipeRight}
            sx={{
              backgroundColor: '#00e676',
              color: 'white',
              '&:hover': { backgroundColor: '#00c853' },
              width: 60,
              height: 60,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;
