
import { useState,useEffect ,useContext} from 'react';
import './App.css';
import AddNames from './AddNames';
import {stateContext} from "./myContext/MyContext"


function App() {
  // const names = ["John", "Jane", "Alice", "Bob", "Emma", "Michael"];

 const names=useContext(stateContext);
  const totalRounds = 3;
  let currentIndex = 0;
  let currentRound = 0;
  let [usedLastNames,setUsedLastNames] = useState([]);
 const [changeName,setNameChange]=useState("Press The Start Button");
 const [addName,setAddName]=useState("Add Names")
 const [addNameForm,setAddNameForm]=useState(false);
 const [btnDisable,setBtnDisable]=useState(true);

useEffect(()=>{
  if(names.length>=3){
    setBtnDisable(false);
  }
},[names]);


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
      const randomName = remainingNames[randomNum];
      setNameChange(randomName);
      setUsedLastNames((item)=>[randomName,...usedLastNames]);
      if (usedLastNames.length === names.length-1) {
        setUsedLastNames([]);
      }
  }
}

  return (
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
                    :<></>
                  }
                  
                </div>
          </div>
         
        </div>
      </div>
   
</div>

  );
}

export default App;
