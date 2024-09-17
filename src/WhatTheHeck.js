import React, { useEffect,useState,useContext } from 'react'
import { hostStateContext,hostNameDispatchContext,hostNameStateContext } from './myContext/HostContext';

function WhatTheHeck() {
    const stateVal=useContext(hostStateContext);
    const selectedName=useContext(hostNameStateContext);
    const hostSelectedName=useContext(hostNameDispatchContext);
    const [typedText, setTypedText] = useState('');
    const listen=stateVal;

  useEffect(() => {
    
    const handleKeyPress = (event) => {
        
    if(listen)
    {
       if(event.key==="Backspace"){
        setTypedText((item)=> item.slice(0,-1))
        // setTypedText("");
       }
      else if(event.key==="Enter"){
        hostSelectedName({type:"hostSelectedName",data:typedText});
        setTypedText("");
      }
      else{
         setTypedText((prevText) => prevText + event.key)
       }
    }
      
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [listen,hostSelectedName,selectedName,typedText]);

  useEffect(() => {
    console.log(typedText);
  }, [typedText]);
}

export default WhatTheHeck