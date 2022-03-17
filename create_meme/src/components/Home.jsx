import React from 'react';
import { Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom";


function Home() {
  const history = useHistory()
  function navigate() {
    history.push("/creatememe")
  }
  return (
    <div className='App App-header'>
      <h1>Online Meme Creatore</h1>
      <Button onClick={navigate} >Click Here to create</Button>
      <img src='/home.png' alt='..' width={600} className="m-4"></img>
    </div>
  );
}

export default Home;
