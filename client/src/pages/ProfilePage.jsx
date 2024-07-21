import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../services/AuthContext";
import { useSelector } from "react-redux";
import { commonRequest } from "../services/ApiCall";
import { fetchUserData } from "../services/Apis";


const ProfilePage =()=>{

    const [userData,setUserData] = useState(null)
    const {token} = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector((state)=> state.auth.userId)


    console.log(token," This is from the profile page")

    const temp = localStorage.getItem("access_token")
    console.log("temp: ", temp)
      
      useEffect(() => {
        const getUserData = async () => {
          try {
            const data = await fetchUserData(temp);
            setUserData(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        getUserData();
      }, [userId, token]); // Dependencies array: fetch data again if userId or authToken changes
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      const username = userData.username
      const email= userData.email
    return (
        <div className="text-white font-hk text-2xl">
            Profile this is the profile paage Tests
            A quick brown fox jumps over a lazy dog
            <Avatar src="" className="" ></Avatar>
            <p>{username}</p>
            <p>{email}</p>
            <div>
                <p>{JSON.stringify(userData)}</p>
    </div>
        </div>
    )
}

export default ProfilePage;