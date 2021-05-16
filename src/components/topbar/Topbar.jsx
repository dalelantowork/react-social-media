import "./topbar.css"
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from "@material-ui/icons/Person"
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react";

export default function Topbar() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">Fastbook</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input placeholder="Search for friend, posts or videos" className="searchInput"></input>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">3</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} >
                    <img src={ 
                        user.profilePicture 
                            ? PF+user.profilePicture 
                            : PF+"person/noAvatar.png" 
                            } 
                        alt="" 
                        className="topbarImg" 
                    />
                </Link>
                
            </div>
        </div>
    )
}
