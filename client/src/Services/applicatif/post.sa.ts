import PostBdl from '../bdl/post.bdl';
import { selectToken } from '../redux/ducks/token';
import { useAppSelector } from '../redux/hooks';

export const PostServices = ()=>{
    const {
        createBDL,
        updateBDL,
        getPostsBDL,
        deletePostBDL
    } = PostBdl();
    const token = useAppSelector(selectToken);
    
    return {
        createPost: async (data:Object) => {
            console.log('data',data);
            const resLogin: any = await createBDL(data);
            if(resLogin.success){
                return resLogin
            } 
        },
        updatePost: async(id:string, data:Object) => {
            const result: any = await updateBDL(id, data);
            return result;
        },
        getPosts: async()=>{
            const results: any = await getPostsBDL();
            return results;
        },
        deletePosts: async (idPost:string)=> await deletePostBDL(idPost)
    }
}