import './postStyle.css';
import {LikeIcon} from '../Logo/LikeIcon';
import { postInterface } from '../../../interface/postInterface';
function PostDisplay({slug,title,body}:postInterface):JSX.Element{
    return (
        <div className="postDisplayParent">
            <div className='headContainerPostDisplay'>
                <div className="titlePostDisplay">{title}</div>
                <div>{slug}</div>
            </div>
            <div className='bodyPost'>
               {body}
            </div>
            <div className='iconContainer'>
                <div className='likeStlye'>
                    <LikeIcon/> 
                </div>    
                <div className='numberStyle'> 
                    1
                </div>
            </div>
        </div>
    )
}
export default PostDisplay