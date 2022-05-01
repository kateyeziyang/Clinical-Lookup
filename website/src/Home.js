import React, {useState, useEffect} from 'react';
import Input from './Input';
import Output from './Output';
import './Home.css';

const Home = () => {

  const [topic, setTopic] = useState("");
  const [doc, setDoc] = useState();
  const [data, setData] = useState({})
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {
      console.log(data)
      setDoc(data);
    })
  }, [url, data])

  return (
    <>
      <div className='HomeContainer'>
        <Input topic={topic} setTopic={setTopic} setUrl={setUrl} setData={setData}/>
      </div>
      <div className='HomeContainer'>
        <Output doc={doc} />
      </div>
    </>

  );
}

export default Home;