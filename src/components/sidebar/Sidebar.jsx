import React from 'react'
import "./sidebar.css"
import RssFeedIcon from '@material-ui/icons/RssFeed';
import EventIcon from '@material-ui/icons/Event';
import SchoolIcon from '@material-ui/icons/School';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ChatIcon from '@material-ui/icons/Chat';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Users } from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoLibraryIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <PeopleOutlineIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkBorderIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutlineIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutlineIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <EventIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <SchoolIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map(u=>(
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
