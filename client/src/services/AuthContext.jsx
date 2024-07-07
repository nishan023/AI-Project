import React,{createContext,useState,useEffect} from "react";


const AuthContext =  createContext();


export const AuthProvider =({children})=>{
    const [token, setToken] = useState(null);

    useEffect(()=>{
        const storedToken = localStorage.getItem("access_token");
        if(storedToken)
        {
            setToken(storedToken);
        }
    },[])


    return(
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;