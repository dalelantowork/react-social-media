import React, {useState, useEffect, useContext} from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
// import { Posts } from "../../dummyData"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'

export default function Feed({username}) {
    const [posts,setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(()=>{
        // console.log("feed rendered")
        const fetchPosts = async () => {
            // const res = await axios.get("http://localhost:8800/api/posts/timeline/609425cf821a890ca44c8747")
            const res = username 
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("posts/timeline/" + user._id)
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
            //console.log(res.data)    
        }
        
        fetchPosts();
    },[username,user._id])
    // if there is a [] as dependency on the userEffect, it will only render once

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map((p)=>(
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}
