import React,{useReducer,createContext} from 'react'


export const stateContext=createContext();
export const dispatchContext=createContext();


function MyContext({children}) {

    const reducer=(state,action)=>{
        switch(action.type){
            case "AddName": 
                return [action.data,...state];
            case "RemoveName":
                const newArr=state.filter((item,index)=>{
                    return index!==action.index
                })
                return newArr;
            default :
                return state;
        }
    }
    
    const [state,dispatch]=useReducer(reducer,[]);
    

  return (
    <stateContext.Provider value={state}>
        <dispatchContext.Provider value={dispatch} >
            {children}
        </dispatchContext.Provider>
    </stateContext.Provider>
  )
}

export default MyContext;