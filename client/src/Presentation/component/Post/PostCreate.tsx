import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import './PostCreate.css';
import { PostServices } from '../../../Services/applicatif/post.sa';
import { postInterface } from '../../../interface/postInterface';
import { postConstant } from '../../../constants/postConstant';
import { useAppSelector } from '../../../Services/redux/hooks';
import { selectUserInRedux } from '../../../Services/redux/ducks/userDucks';
import { checkIfVide } from '../../../utils/helper';

export default function FormDialog({flag=false}:{flag:boolean}) {

  const [open, setOpen]=useState<boolean>(false);

  const user = useAppSelector(selectUserInRedux);

  const [post, setPost]=useState<postInterface>(postConstant);

  const {createPost} = PostServices();

  const [isVide, setIsVide]=useState<boolean>(true);

  useEffect(()=>{
    flag ? setOpen(flag) : setOpen(!flag)
  },[flag]);

  const handleClose = () => {
    setOpen(false);
  };
  
  const storeChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    let temp : postInterface = post;
    temp = {...temp,[e.target.name]:e.target.value}
    const result = checkIfVide(temp.slug,temp.title,temp.body);
    setIsVide(result);
    setPost({...post, slug:temp.slug,title:temp.title,body:temp.body,author:user.id});
  }

  const createNewPost = async()=>{
      const result = await createPost(post);
      console.log('result :',result);
      if(result.success){
        handleClose();
      }
  }
  // console.log('post creat render');
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create Your Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="slug"
            label="Slug"
            type="text"
            variant="standard"
            defaultValue={post.slug}
            onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>storeChange(e)}
          />
          <div className='spaceBetween'></div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            variant="standard"
            defaultValue={post.title}
            onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>storeChange(e)}
          />
          <div className='spaceBetween .spaceMultiline'></div>
          <TextField
            id="outlined-textarea"
            label="Your Post"
            name="body"
            placeholder="Placeholder"
            multiline
            defaultValue={post.body}
            onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>storeChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={isVide} onClick={createNewPost}>Post It</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}