import { Button, Input, TextField } from '@mui/material';
import './loginstyle.css';
import { useEffect, useState } from 'react';
import { UserService } from '../../../Services/applicatif/user.sa';
import FormField from '../../component/FormField';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loginUser, setLogin] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const {Login}=UserService();
    const changeValue= (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLogin({
            ...loginUser,[e.target.name]:e.target.value
        })
    }
    const validate=async ()=>{
        console.log("on validate");
        if(loginUser.email !== '' && loginUser.password !==''){
            const result = await Login(loginUser.email,loginUser.password);
            result.success && navigate('/Home');
            return '';
        }   
        alert('Please provide email and password');   
    }
    return (
        <div className="parentPage">
            <div className="container">
                <TextField margin="dense" label="Email" name="email" defaultValue={loginUser.email} onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>changeValue(e)}/>
                <TextField margin="dense" label="Password" name="password" defaultValue={loginUser.password} onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>changeValue(e)}/>
                <Button variant="contained" onClick={validate}>Valider</Button>
            </div>
        </div>
    )
}

export default LoginPage