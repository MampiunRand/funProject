import api from "../technic/api"
import Urls from "../../constants/urls";
import { useAppSelector } from "../redux/hooks";
import { selectToken } from "../redux/ducks/token";
export default () => {
    const token = useAppSelector(selectToken);
    return {
        createBDL: async (data:Object)=>await api.post(Urls.CREATEPOST, data, token),
        updateBDL: async (id: string, newData:Object) => await api.put(`${Urls.UPDATEPOST}/${id}`,(newData = newData), token),
        getPostsBDL: async ()=> await api.get(Urls.MANYPOST),
        deletePostBDL: async (id:string) => await api.remove(`${Urls.DELETEPOST}/${id}`, token)
    }
}