import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Home.css'



const Input = (props) => {
  const {topic, setTopic, setUrl} = props;

  const handleSubmit = (e) => {
    let url = "" + topic;
    setUrl(url);
  }

  const handleChange = (e) => {
    setTopic(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Topics" variant="standard" onChange={handleChange}/>
      <div className='SubmitButton'>
        <Button type='submit' variant='outlined'>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default Input;