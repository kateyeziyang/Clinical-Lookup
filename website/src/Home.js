import React, {useState, useEffect} from 'react';
import Input from './Input';
import Output from './Output';
import './Home.css';

const Home = () => {

  const [topic, setTopic] = useState("");
  const [doc, setDoc] = useState([]);
  const [url, setUrl] = useState("");

  return (
    <>
      <div className='HomeContainer'>
        <Input topic={topic} setTopic={setTopic} setUrl={setUrl}/>
      </div>
      <div className='HomeContainer'>
        <Output doc={doc} />
      </div>
    </>

  );
}

export default Home;