import React,{useReducer,createContext} from 'react'


export const hostStateContext=createContext();
export const hostDispatchContext=createContext();
export const hostNameStateContext=createContext();
export const hostNameDispatchContext=createContext();

function HostContext({children}) {
  
    const reducer=(state,action)=>{
        switch(action.type){
            case "IamHost":
                return action.hostType;
            default :
                return state;
        }
    }
const nameReducer=(state,action)=>{
       
    switch (action.type) {
            case "hostSelectedName":
                return action.data;
        
            default:
               return state;
        }
    }

    const [state,dispatch]=useReducer(reducer,false);
    const [nameState,nameDispatch]=useReducer(nameReducer,"")
  return (
        <hostStateContext.Provider value={state}>
            <hostDispatchContext.Provider value={dispatch}>
                <hostNameStateContext.Provider value={nameState}>
                    <hostNameDispatchContext.Provider value={nameDispatch}>
                        {children}
                    </hostNameDispatchContext.Provider>
                </hostNameStateContext.Provider>
             </hostDispatchContext.Provider>
        </hostStateContext.Provider>
  )
}

export default HostContext;