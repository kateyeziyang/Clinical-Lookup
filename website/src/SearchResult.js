import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';
import './Home.css';

const SearchResult = (props) => {
  const {doc, isloading} = props;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style_loading = {
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
        <div className='CardContent'>
          <Card sx={{margin:'5px', padding:'10px' }} onClick={handleOpen}>
            {props.content["id"]}
          </Card>
        </div>
        <PopUp content={props.content["brief_summary"]} open={open} handleClose={handleClose}/>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.content}
          </Typography>
        </Box>
    </Modal>
  )


  const Loading = () => (
    <Modal
        open={isloading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style_loading}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <LoadingSpinner />
          </Typography>
        </Box>
    </Modal>
  )


  return (
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: '30vw',
        height: '70vh',
      },
    }}
  >
    <Paper elevation={3} style={{overflow:'auto'}}>

      {
        doc === undefined ? <Error /> : doc.map((e,i) => {
          return(
            <SingleCard content={e} key={i} idx={i} />
          );
        })
      }

    </Paper>
    <Loading />
  </Box>
  );
}

export default SearchResult;