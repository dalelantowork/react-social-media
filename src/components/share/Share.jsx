import React,{ useContext, useRef, useState } from 'react'
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LabelIcon from '@material-ui/icons/Label';
import RoomIcon from '@material-ui/icons/Room';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import "./share.css"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';

export default function Share() {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file,setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            console.log("this is file")
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.img = fileName;
            // console.log(fileName);
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error); 
            }
        }

        try {
            await axios.post("/posts", newPost);      
            window.location.reload()      
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" 
                        src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} 
                        alt="" />
                    <input 
                        placeholder={"What's in your mind " + user.username + "?" }
                        className="shareInput" 
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon className="shareIcon" htmlColor="tomato" />
                            <span className="shareOptionText">Gallery</span>
                            <input 
                                style={{display:"none"}} 
                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg" 
                                onChange={(e)=>setFile(e.target.files[0])} 
                            />
                        </label>
                        <div className="shareOption">
                            <LabelIcon className="shareIcon" htmlColor="blue"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon className="shareIcon" htmlColor="green"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon className="shareIcon" htmlColor="goldenrod"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        
                    </div>
                    <button className="shareButton"type="submit" >Share</button>
                </form>
            </div>
        </div>
    )
}
