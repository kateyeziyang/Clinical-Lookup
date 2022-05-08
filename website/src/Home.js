import React, {useState, useEffect} from 'react';
import Input from './Input';
import Output from './Output';
import fetch from './fetchWithTimeout';
import './Home.css';

const Home = () => {
  const [topic, setTopic] = useState("");
  const [doc, setDoc] = useState();
  const [data, setData] = useState({})
  const [url, setUrl] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [warning, setWarning] = useState(true);


  useEffect(() => {
    if (url !== ""){
      setIsloading(true);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      },20000).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(data => {
        console.log(data)
        setDoc(data);
        setIsloading(false);
      }).catch(error => {
        console.log(error);
        setIsloading(false);
      })
    }
  }, [url, data])

  return (
    <>
      <div className='HomeContainer'>
        <Input topic={topic} setTopic={setTopic} setUrl={setUrl} setData={setData} />
      </div>
      <div className='HomeContainer'>
        <Output doc={doc} isloading={isloading} warning={warning} setWarning={setWarning} />
      </div>
    </>

  );
}

export default Home;