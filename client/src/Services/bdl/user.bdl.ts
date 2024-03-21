import api from "../technic/api"
import Urls from "../../constants/urls";
export default () => {

    return {
        loginBDL: async (email:string, password: string)=>
          await api.post(Urls.LOGIN, { email: email, password: password }),
        updateBDL: async (id: string, newData:Object) => await api.put(Urls.UPDATEUSER,(newData = newData)),
        getUsersBDL: async ()=> await api.get(Urls.MANYUSERS),
        logout: async () => await api.get(Urls.LOGOUT)
    }
}