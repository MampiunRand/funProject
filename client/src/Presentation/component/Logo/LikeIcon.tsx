import React from 'react';
import like from '../../../assets/icons/like-svgrepo-com.svg';
import home from '../../../assets/icons/home-svgrepo-com.svg';
import message from '../../../assets/icons/message-square-svgrepo-com.svg';
import post from '../../../assets/icons/publish-svgrepo-com.svg';
import notification from '../../../assets/icons/bell-svgrepo-com.svg';
import logout from '../../../assets/icons/logout-svgrepo-com.svg';
import profile from '../../../assets/icons/profile-1335-svgrepo-com.svg';
import './logoStyle.css';

export const LikeIcon = () => (
  <div>
    <img src={like} alt="Logo" />
  </div>
);

export const HomeIcon = () =>(
  <div>
    <img src={home} alt="Logo" />
  </div>
);

export const MessageIcon = () =>(
  <div>
    <img src={message} alt="Logo" />
  </div>
);
  
export const PostIcon = () =>(
  <div>
    <img src={post} alt="Logo" />
  </div>
);
export const NotificationIcon = () =>(
  <div>
    <img src={notification} alt="Logo" />
  </div>
);
export const LogoutIcon = ()=>(
  <div>
    <img src={logout} alt="Logo"/>
  </div>
);
export const ProfileIcon = ()=>(
  <div>
    <img src={profile} alt="Logo"/>
  </div>
);
