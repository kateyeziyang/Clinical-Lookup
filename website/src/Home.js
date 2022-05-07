import React, {useState, useEffect} from 'react';
import Input from './Input';
import Output from './Output';
import './Home.css';

const Home = () => {

  const [topic, setTopic] = useState("");
  const [doc, setDoc] = useState();
  const [data, setData] = useState({})
  const [url, setUrl] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [warning, setWarning] = useState(true);

  // useEffect(() => {
  //   alert("result might be inaccurate due to the mistakes made by models")
  // },[])

  useEffect(() => {
    setIsloading(true);
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
      setIsloading(false);
    })
  }, [url, data])

  return (
    <>
      <h1 className='Title'>Clinical LookUp</h1>
      <div className='HomeContainer'>
        <Input topic={topic} setTopic={setTopic} setUrl={setUrl} setData={setData}/>
      </div>
      <div className='HomeContainer'>
        <Output doc={doc} isloading={isloading} warning={warning} setWarning={setWarning} />
      </div>
    </>

  );
}

export default Home;