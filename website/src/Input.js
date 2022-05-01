import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import './Home.css'



const Input = (props) => {
  const {topic, setTopic, setUrl, setData} = props;
  const [mode, setMode] = useState("bm25");

  const handleSwitch = (e) => {
    setMode(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp_url = "http://127.0.0.1:5000/" + mode;
    setUrl(temp_url);
    let temp_data = {"topic":topic};
    setData(temp_data);
  }



  const handleChange = (e) => {
    setTopic(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Topics" variant="standard" onChange={handleChange}/>
      <div className='Switch'>
        <NativeSelect defaultValue='bm25' onChange={handleSwitch}>
          <option value='bm25'>BM_25</option>
          <option value='keybert'>KeyBert</option>
        </NativeSelect>
      </div>
      <div className='SubmitButton'>
        <Button type='submit' variant='outlined'>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default Input;