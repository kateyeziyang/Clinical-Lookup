import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import './Home.css'



const SearchBar = (props) => {
  const {setUrl} = props;
  const [id, setId] = useState("");
  const [gender, setGender] = useState("Any")
  const handleSubmit = (e) => {
    e.preventDefault();
    let temp_url = "http://127.0.0.1:5000/search?";
    if (id !== "") {
      temp_url += "&id=" + id;
    }
    if (gender !== "Any" && gender !== "") {
      temp_url += "&gender=" + gender; 
    }
    setUrl(temp_url);
    console.log(temp_url)
  }

  const handleIDChange = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: '30vw',
      },
    }}>
      <Paper elevation={3}>
        <form  className='InputForm' onSubmit={handleSubmit}>
          <TextField id="standard-basic" label="ID" variant="standard" onChange={handleIDChange} />
          <TextField id="standard-basic" label="Gender" variant="standard" onChange={handleGenderChange} />
          <div className='SubmitButton'>
            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </ Box>
  );
}

export default SearchBar;