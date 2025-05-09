// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Avatar,
//   Divider,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   // Define fetchProfile function inside the component scope
//   const fetchProfile = async () => {
//     try {
//       console.log('Fetching new profile...');
//       const response = await fetch('http://localhost:8080/api/profiles/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setProfile(data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   // Fetch profile on component mount, only once
//   useEffect(() => {
//     console.log('Component mounted, fetching profile...');
//     fetchProfile(); // This will be called only once when the component is mounted
//   }, []); // Empty dependency array ensures this runs only once

//   const handleSwipeLeft = () => {
//     console.log('Swiped Left');
//     fetchProfile(); // Re-fetch a new profile when swiped left
//   };

//   const handleSwipeRight = async () => {
//     console.log('Swiped Right');
//     if (!profile) return;
  
//     try {
//       // Step 1: Call match API using profile ID in the URL path
//       const response = await fetch(`http://localhost:8080/api/match/swipe-right/${profile.id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to create match: ${response.status}`);
//       }
  
//       const result = await response.json();
//       console.log('Match created:', result);
  
//       // Step 2: Navigate to the conversation page with profile ID
//       navigate(`/conversation/${profile.id}`);a
//     } catch (error) {
//       console.error('Error creating match:', error);
//     }
//   };
  
  

//   if (!profile) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
//         <Typography variant="h6">Loading...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//       <Card sx={{ width: 350, p: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//           <Avatar
//             src={`http://localhost:8080${profile.imageUrl}`}
//             alt={`${profile.firstName} ${profile.lastName}`}
//             sx={{ width: 120, height: 120 }}
//           />
//         </Box>
//         <CardContent>
//           <Typography variant="h5" align="center" gutterBottom>
//             {profile.firstName} {profile.lastName}, {profile.age}
//           </Typography>
//           <Typography variant="body2" align="center" gutterBottom>
//             Gender: {profile.gender}
//           </Typography>
//           <Typography variant="body2" align="center" gutterBottom>
//             Ethnicity: {profile.ethnicity}
//           </Typography>
//           <Typography variant="body2" align="center" gutterBottom>
//             MBTI: {profile.myersBriggsPersonalityType}
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography variant="body1" align="center">
//             {profile.bio}
//           </Typography>
//         </CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
//           <Button variant="outlined" color="error" onClick={handleSwipeLeft}>
//             Swipe Left
//           </Button>
//           <Button variant="contained" color="primary" onClick={handleSwipeRight}>
//             Swipe Right
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Fetch profile function
  const fetchProfile = async () => {
    try {
      console.log('Fetching new profile...');
      const response = await fetch('http://localhost:8080/api/profiles/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch profile on component mount
  useEffect(() => {
    console.log('Component mounted, fetching profile...');
    fetchProfile(); // This will be called only once when the component is mounted
  }, []); // Empty dependency array ensures this runs only once

  const handleSwipeLeft = () => {
    console.log('Swiped Left');
    fetchProfile(); // Re-fetch a new profile when swiped left
  };

  const handleSwipeRight = async () => {
    console.log('Swiped Right');
    if (!profile) return;

    try {
      // Step 1: Call match API using profile ID
      const response = await fetch(`http://localhost:8080/api/match/swipe-right/${profile.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to create match: ${response.status}`);
      }

      const result = await response.json();
      console.log('Match created:', result);

      // Step 2: Navigate to the conversation page with profile ID
      //navigate(`/api/chat/${profile.id}`);
      navigate(`api/match/all-matches`)
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  // Show loading message if profile is null
  if (!profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={`http://localhost:8080${profile.imageUrl}`}
            alt={`${profile.firstName} ${profile.lastName}`}
            sx={{ width: 120, height: 120 }}
          />
        </Box>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {profile.firstName} {profile.lastName}, {profile.age}
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Gender: {profile.gender}
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Ethnicity: {profile.ethnicity}
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            MBTI: {profile.myersBriggsPersonalityType}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" align="center">
            {profile.bio}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button variant="outlined" color="error" onClick={handleSwipeLeft}>
            Swipe Left
          </Button>
          <Button variant="contained" color="primary" onClick={handleSwipeRight}>
            Swipe Right
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;

