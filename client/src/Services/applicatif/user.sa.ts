import UserBdl from '../bdl/user.bdl';
import { TokenActions } from '../redux/ducks/token';
import { UserActions } from '../redux/ducks/userDucks';
export const UserService = ()=>{
    const {
        loginBDL,
        updateBDL,
        getUsersBDL,
        logout
    } = UserBdl();
    const {setUserToRedux}=UserActions();
    const {setTokentoRedux}=TokenActions();
    return {
        Login: async (email: string, password: string) => {
            const resLogin: any = await loginBDL(email, password)
            if(resLogin.success){
                console.log('mandalo success');
                console.log('user :',resLogin.user);
                setUserToRedux(resLogin.user);
                // console.log('resLogin.token',resLogin.token);
                setTokentoRedux(resLogin.token);
            } 
            return resLogin;
        },
        UpdateUser: async(id:string, data:Object) => {
            const result: any = await updateBDL(id, data);
            return result;
        },
        GetUsers: async()=>{
            const results: any = await getUsersBDL();
            return results;
        },
        Logout: async ()=>{
            const result : any = await logout();
            return result;
        }
    }
}