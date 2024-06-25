


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button, 
  Typography,
  Box,
  TablePagination,
  CircularProgress,
  TextField, // Import TextField for search filters
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const fontFamily = '"Roboto", sans-serif';

const StyledTable = styled(Table)({
  minWidth: 750,
  width: '100%',
  fontFamily,
});

const StyledTableContainer = styled(TableContainer)({
  height: '480px',
  width: '100%',
  fontFamily,
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#333',
  '& th': {
    color: 'white',
    fontWeight: 'bold',
    fontFamily,
  },
});

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
  fontFamily,
});

const ProfilePic = styled('img')({
  borderRadius: '50%',
});

const VehiclePic = styled('img')({
  borderRadius: '10%',
});

const ApproveButton = styled(Button)({
  marginTop: '10px',
  fontFamily,
});

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  fontFamily,
});

const TableWrapper = styled(Box)({
  width: '95%',
  maxWidth: '1300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'hidden',
  fontFamily,
  overflowX: 'auto',
});

const SearchForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  fontFamily,
});

const Riders: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "rider"));
        const dataList: any[] = [];
        querySnapshot.forEach((doc) => {
          const riderData = { id: doc.id, ...doc.data() };
          // Check if any field matches the search term
          if (
            riderData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            riderData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            riderData.phone.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            dataList.push(riderData);
          }
        });
        setData(dataList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleApprove = async (id: string) => {
    try {
      const riderRef = doc(db, "rider", id);
      await updateDoc(riderRef, { status: 'approved' });
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  if (loading) {
    return (
      <PageContainer>
        <Typography variant="h4" gutterBottom>Rider Management</Typography>
        <Box mb={2}>
          <Typography variant="body1">Loading...</Typography>
          <CircularProgress style={{ marginTop: 20 }} />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>Rider Management</Typography>
      <SearchForm>
        <TextField
          label="Search by Name, Email, or Phone"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </SearchForm>
      <TableWrapper>
        <StyledTableContainer as={Paper}>
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Bank Account Number</TableCell>
                <TableCell>Bank Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>NIN</TableCell>
                <TableCell>Profile Picture</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Vehicle Photo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Where and How Would You Deliver</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((item) => (
                <StyledTableRow key={item.id} onClick={() => navigate(`/rider/${item.id}`)} style={{ cursor: 'pointer' }}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.bankAccountNumber || 'N/A'}</TableCell>
                  <TableCell>{item.bankName || 'N/A'}</TableCell>
                  <TableCell>{item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{item.dob || 'N/A'}</TableCell>
                  <TableCell>{item.nin || 'N/A'}</TableCell>
                  <TableCell><ProfilePic src={item.profilePicture || 'default_profile.png'} alt="Profile" width="50" /></TableCell>
                  <TableCell>{item.vehicle || 'N/A'}</TableCell>
                  <TableCell><VehiclePic src={item.vehiclePhoto || 'default_vehicle.png'} alt="Vehicle" width="50" /></TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.whereAndHowWouldYouDeliver || 'N/A'}</TableCell>
                  <TableCell>
                    {item.status === 'pending' && (
                      <ApproveButton variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleApprove(item.id); }}>
                        Approve
                      </ApproveButton>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={16} />
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage="Rows per page:"
        />
      </TableWrapper>
    </PageContainer>
  );
};

export default Riders;
