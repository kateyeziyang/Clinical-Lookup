import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

export default function Searching (props) {
  const [doc, setDoc] = useState();
  const [url, setUrl] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (url !== ""){
      setIsloading(true);
      fetch(url).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(data => {
        console.log(data)
        setDoc(data);
        setIsloading(false);
      })
    }
  }, [url])

  return (
    <>
      <div className='HomeContainer'>
        <SearchBar setUrl={setUrl} />
      </div>
      <div className='HomeContainer'>
        <SearchResult doc={doc} isloading={isloading}/>
      </div>
    </>

  );
}