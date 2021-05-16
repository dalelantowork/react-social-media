import React,{useState, useEffect} from 'react'
import "./profile.css"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios';
import { useParams } from "react-router"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser] = useState({})
    // const params = useParams()
    const username = useParams().username
    //console.log(params.username)

    useEffect(()=>{
        console.log("feed rendered")
        const fetchUser = async () => {
            // const res = await axios.get("http://localhost:8800/api/posts/timeline/609425cf821a890ca44c8747")
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
            // console.log(res)    
        }
        
        fetchUser();
    },[username])

    return (
        <>
          <Topbar />
          <div className="homeContainer">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img 
                            src={user.coverPicture ? PF + user.coverPicture : PF+"person/noCover.png"} 
                            alt="" 
                            className="profileCoverImg" />
                        <img 
                            src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} 
                            alt="" 
                            className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>
          </div>
        </>
    )
}
