import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const SingleCard = (props) => (
  <Card sx={{ width: '95%',margin:'10px', padding:'10px' }}>
    123
  </Card>
)

const Output = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: '70vw',
        height: '90vh',
      },
    }}
  >
    <Paper elevation={3}>

      <SingleCard />

    </Paper>
  </Box>
  );
}

export default Output;