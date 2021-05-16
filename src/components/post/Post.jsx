import React,{ useState, useEffect, useContext } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./post.css"
import axios from 'axios';
// import { Users } from "../../dummyData"
import {format} from "timeago.js"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {
    const [user,setUser] = useState({})
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext)
    //const user = Users.filter(u=>u.id===1)
    // console.log(user[0].username);
    // console.log(post);
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes]);

    useEffect(()=>{
        // console.log("feed rendered")
        const fetchUser = async () => {
            // const res = await axios.get("http://localhost:8800/api/posts/timeline/609425cf821a890ca44c8747")
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
            //console.log(res)    
        }
        
        fetchUser();
    },[post.userId])

    const likeHandler = () => {
        try {
          axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                        <img 
                            className="postProfileImg" 
                            src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} 
                            alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight"> 
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{ post?.desc }</span>
                    <img className="postImg" src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler} />
                        <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people liked this</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
