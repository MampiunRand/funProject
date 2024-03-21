import React, { Fragment, useState } from 'react';
import { HomeIcon,MessageIcon, PostIcon, NotificationIcon,LogoutIcon } from '../Logo/LikeIcon';
import './NavBar.css';
import { UserActions } from '../../../Services/redux/ducks/userDucks';
import { UserService } from '../../../Services/applicatif/user.sa';
import { TokenActions } from '../../../Services/redux/ducks/token';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../Services/socketManager/socket';

interface NavBar {
    showPostCreate:(open:boolean)=>void,
    reloadPage: () => void
}

function NavBar({showPostCreate, reloadPage}:NavBar):JSX.Element{
    const [open, SetOpen]=useState<boolean>(false);
    const {Logout} = UserService();
    const {resetTokenInRedux} = TokenActions();
    const navigate = useNavigate();
    const{removeUserInRedux} = UserActions();
    const LogoutUser = async ()=>{
        const result = await Logout();
        if(result.success){
            removeUserInRedux();
            resetTokenInRedux();
            socket.disconnect();
            navigate('/');
        } 
    }
    const createPost = ()=>{
        let temp = !open
        showPostCreate(temp);
        SetOpen(!open);
    }
    return (
        <div className="navBarContainer">
            <Fragment>
                <div className='ContainerIcon HomeIcon' onClick={reloadPage}>
                    <HomeIcon />
                </div>
                <div className='ContainerIcon MessageIcon'>
                    <MessageIcon/>
                </div>
                <div className='ContainerIcon PostIcon' onClick={createPost}>
                    <PostIcon/>
                </div>
                <div className='ContainerIcon NotificationIcon'>
                    <NotificationIcon/>
                </div>
                <div className='logoutIcon' onClick={LogoutUser}>
                    <LogoutIcon/>
                </div>
            </Fragment>
        </div>
    )
}
export default NavBar