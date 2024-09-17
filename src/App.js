import { useState,useEffect ,useContext} from 'react';
import './App.css';
import AddNames from './AddNames';
import {dispatchContext, stateContext} from "./myContext/MyContext"
import { hostStateContext,hostDispatchContext,hostNameStateContext,hostNameDispatchContext } from './myContext/HostContext';
import WhatTheHeck from './WhatTheHeck';

function App() {
  // const names = ["John", "Jane", "Alice", "Bob", "Emma", "Michael"];

 const names=useContext(stateContext);
 const dispatch=useContext(dispatchContext);
 const hostStateValue=useContext(hostStateContext);
 const hostDispatch=useContext(hostDispatchContext);
 const hostSelectedNameDispatch=useContext(hostNameDispatchContext);
  const totalRounds = 3;
  let currentIndex = 0;
  let currentRound = 0;
  let [usedLastNames,setUsedLastNames] = useState([]);
 const [changeName,setNameChange]=useState("Press The Start Button");
 const [addName,setAddName]=useState("Add Names")
 const [addNameForm,setAddNameForm]=useState(false);
 const [btnDisable,setBtnDisable]=useState(true);
 const [host,setHost]=useState(false);
const [mode,setMode]=useState("");
const hostSelectedName=useContext(hostNameStateContext);


WhatTheHeck();
useEffect(()=>{
  if(names.length>=3){
    setBtnDisable(false);
  }
},[names]);

const handleHostSwitch=(e)=>{
  if(!host){
    
    const secretKey=prompt("Are You Host?");
    if(secretKey==="YesIamHost"){
      setHost((preVal)=>!preVal);
      setMode("On");
      hostDispatch({type:"IamHost",hostType:true});
      console.log("Host Mode is On");
     
    }
  }
  else{
    console.log("false");
    alert("Host Mode OFF")
    setHost(false);
    setMode("Off")
    hostDispatch({type:"IamHost",hostType:false});
    
  }
  
  
}

const handleAddNameToggle=()=>{
   if(!addNameForm){
    setAddName("Hide Names");
  }
  else{
    setAddName("Add Names");
  }
  setAddNameForm(!addNameForm);
}

const startProcess=()=>{
  currentIndex = 0;
  currentRound = 0;
  console.log(names);
  if(names.length>=3){
    displayNames();
  }
}

var displayNames=()=>{
  if (currentRound < totalRounds) {
    setNameChange(names[currentIndex]);
    currentIndex++;
    if (currentIndex >= names.length){
        currentIndex = 0;
        currentRound++;
    }
    setTimeout(displayNames, 100);
}
else{
      const remainingNames = names.filter(name => !usedLastNames.includes(name));
      console.log(remainingNames);
      const randomNum=Math.floor(Math.random() * remainingNames.length);
      const hostNamePresent=names.filter((item)=>item.toLowerCase()===hostSelectedName.toLowerCase())
      if(hostNamePresent.length){
        setNameChange(hostSelectedName)}
      else {
        const randomName=remainingNames[randomNum];
        setNameChange(randomName);
        setUsedLastNames((item)=>[randomName,...item]);
      }
      hostSelectedNameDispatch({type:"hostSelectedName",data:""});
     // setNameChange(randomName);
      if (usedLastNames.length === names.length-1) {
        setUsedLastNames([]);
      }
  }
}


  return (
    <>
      <div className="row firstRow" >
  
  <div className='col-lg-7 col-md-8 col-sm-10 col-12' id="outerContainer">
    <div className='row' id="secondRow">
      {
        (!addNameForm)?
        <center style={{"height":"60%"}}><div className="col-12" id="nameDisplay">{changeName}</div></center>
        :<div className='col-12' style={{"height":"80%"}}>
          <AddNames />
        </div>
      }
    
      <div className='col-12'>
            <div className='row d-flex justify-content-around'>
              <button className='col-5 col-sm-3 col-md-3 buttonStyle' onClick={handleAddNameToggle}>{addName}</button>
              {
              (!addNameForm)?
                  
                  <button disabled={btnDisable} className='col-5 col-sm-3 col-md-3 buttonStyle' onClick={startProcess}>Start</button>
                  
                : 
                  
                <button className='col-5 col-sm-3 col-md-3 buttonStyle' onClick={handleHostSwitch}>Host Mode {mode}</button>
                  
              }
              
            </div>
      </div>
    
    </div>
  </div>

      </div>
  
    </>
    


  );
}

export default App;
