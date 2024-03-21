import { useEffect, useState } from 'react';
import { selectToken } from '../../../Services/redux/ducks/token';
import { useAppSelector } from '../../../Services/redux/hooks';
import NavBar from '../../component/NavigationTab/NavBar';
import PostCreate from '../../component/Post/PostCreate';
import PostDisplay from '../../component/Post/PostDisplay';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { PostServices } from '../../../Services/applicatif/post.sa';
import { postInterface } from '../../../interface/postInterface';
import FormDialog from '../../component/Post/PostCreate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Services/redux/store';
import { selectUserInRedux } from '../../../Services/redux/ducks/userDucks';
import { socket } from '../../../Services/socketManager/socket';
import { string } from '../../../constants/postConstant';

function Home():JSX.Element{
    const [posts, setPosts]=useState<postInterface[]>([]);
    const [createPost, setCreatePost]=useState<boolean>(false);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const token = useAppSelector(selectToken);
    const navigate = useNavigate();
    const {getPosts} = PostServices();
    
    const getManyPost = async () => {
        if (token === '') {
            navigate('/');
        }
        try {
            const data = await getPosts();
            if (data.success) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getManyPost();
        function onConnect() {
            console.log('dans connexion socket');
            setIsConnected(true);
        }
        function onDisconnect() {
            console.log("disconnected");
            setIsConnected(false);
        }
        function onFooEvent(value:any){
            console.log(`dans post event avec ${value}`);
            console.log(value);
            if(value.action ===  string.postAction){
                console.log('mandalo condition');
                let tempTabPosts = [value.post,...posts];
                console.log('tempTabPosts :',tempTabPosts);
                setPosts(tempTabPosts);
            }
        }
        socket.connect();
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('post', onFooEvent);
        return ()=>{
            console.log('Home component unmount');
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('post', onFooEvent);
        }
    }, [socket]);
    
    const createPostOnclick = (open: boolean)=>{
        setCreatePost(open);
    }
    console.log('rerender');
    return(
        <div className="HomeParent">
            <NavBar showPostCreate={createPostOnclick} reloadPage={getManyPost}/>
            <div className='PostContainer'>
                <>
                 {
                    posts.map((post,index) => {
                        return (
                            <div className='contentUniquePost' key={index}>
                                <PostDisplay slug={post.slug} title={post.title} body={post.body} />
                            </div>
                        );
                    })
                 }              
                </>
            </div>
            {
                createPost && <FormDialog flag={createPost}/>
            }
        </div>
    )
}
export default Home;