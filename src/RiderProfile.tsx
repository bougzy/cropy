import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const fontFamily = '"Roboto", sans-serif';

const StyledPaper = styled(Paper)({
  padding: 20,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
  fontFamily,
  textAlign: 'center', // Center the contents
});

const ProfilePic = styled('img')({
  borderRadius: '50%',
  margin: '10px 0',
});

const VehiclePic = styled('img')({
  borderRadius: '10%',
  margin: '10px 0',
});

const RiderProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rider, setRider] = useState<any>(null);

  useEffect(() => {
    const fetchRider = async () => {
      try {
        if (id) {
          const docRef = doc(db, "rider", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRider(docSnap.data());
            console.log("Fetched rider:", docSnap.data()); // Debugging line
          }
        }
      } catch (error) {
        console.error("Error fetching rider:", error); // Error handling
      }
    };

    fetchRider();
  }, [id]);

  if (!rider) {
    return (
      <StyledPaper>
        <CircularProgress /> {/* Show spinner while loading */}
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>Rider Profile</Typography>
      <Typography variant="h6">ID: {id}</Typography>
      <Typography variant="h6">Name: {rider.name}</Typography>
      <Typography variant="h6">Email: {rider.email}</Typography>
      <Typography variant="h6">Phone: {rider.phone}</Typography>
      <Typography variant="h6">Address: {rider.address}</Typography>
      <Typography variant="h6">Bank Account Number: {rider.bankAccountNumber || 'N/A'}</Typography>
      <Typography variant="h6">Bank Name: {rider.bankName || 'N/A'}</Typography>
      <Typography variant="h6">Created At: {rider.createdAt?.seconds ? new Date(rider.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</Typography>
      <Typography variant="h6">DOB: {rider.dob || 'N/A'}</Typography>
      <Typography variant="h6">NIN: {rider.nin || 'N/A'}</Typography>
      <ProfilePic src={rider.profilePicture || 'default_profile.png'} alt="Profile" width="100" />
      <Typography variant="h6">Vehicle: {rider.vehicle || 'N/A'}</Typography>
      <VehiclePic src={rider.vehiclePhoto || 'default_vehicle.png'} alt="Vehicle" width="100" />
      <Typography variant="h6">Status: {rider.status}</Typography>
      <Typography variant="h6">Where and How Would You Deliver: {rider.whereAndHowWouldYouDeliver || 'N/A'}</Typography>
    </StyledPaper>
  );
};

export default RiderProfile;
