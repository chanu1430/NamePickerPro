import React,{useState,useContext} from 'react';
import {stateContext,dispatchContext} from "./myContext/MyContext"



function AddNames(props) {
    const[nameChange,setNameChange]=useState("");
    const names=useContext(stateContext);
    const dispatchNames=useContext(dispatchContext);
    const handleAddNameButton=(e)=>{
        e.preventDefault();
        dispatchNames({type:"AddName",data:nameChange})

        setNameChange("");
      
    }
    const handleDeleteName=(myIndex)=>{
          dispatchNames({type:"RemoveName",index:myIndex})
    }
  return (

    <form className='row' style={{padding:"0px 5px",height:"100%"}}>
        <div className='col-10 form-group'  style={{padding:"0px 0px 3px 3px"}}>
            <input className='form-control border-style' htmlFor="addNameButton" id="addNameInput" type='text' style={{
                 boxShadow:'none'}} value={nameChange} placeholder='Enter The Name' onChange={(e)=>{
                setNameChange(e.target.value);
            }}>
            </input>
        </div>
        <button className='col-2 btn buttonStyle' id="addNameButton" onClick={handleAddNameButton} >
            <lord-icon
                src="https://cdn.lordicon.com/whtfgdfm.json"
                trigger="click"
                state="hover-ternd-flat-5"
                colors="primary:#ffffff"
                style={{"width":"80%","height":"100%","marginRight":"5px"}}>
            </lord-icon>
        </button>
        <div className='col-12' id="eachNameOuterDiv">
            <div className='row' id="namesDiv">
                {
                    names.map((item,index)=>{
                        return(<div className='col-6 eachName d-flex justify-content-between'  key={index}>
                            <p className='border-style'> {item}</p>
                            <button className='border-style ownButtonStyle' item={item} value={index} onClick={(e)=>{e.preventDefault();handleDeleteName(index)}}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{"width":"25px",height:"25px"}}>
                                </lord-icon>
                            </button>
                           </div>);
                        
                    })
                }
                
            </div>
            
        </div>
        <hr/>
    </form>
    
  )
}

export default AddNames