import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';


const Output = (props) => {
  const {doc, isloading} = props;


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const SingleCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <>
      <Card sx={{ width: '95%',margin:'10px', padding:'10px' }} onClick={handleOpen}>
        {props.content[0]}
      </Card>
      <PopUp content={props.content[1]} open={open} handleClose={handleClose}/>
    </>
    )
  }

  const PopUp = (props) => (
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.content}
          </Typography>
        </Box>
    </Modal>
  )
  if (isloading === false) {
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
  
        {
          doc?.map((e,i) => {
            return(
              <SingleCard content={e} key ={i} />
            );
          })
        }
  
      </Paper>
    </Box>
    );
  }else {
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
  
        Loading...
      </Paper>
    </Box>
    );
  }
 
}

export default Output;