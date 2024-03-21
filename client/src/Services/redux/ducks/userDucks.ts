import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userConstant } from "../../../constants/userConstant";
import { user } from "../../../interface/userInterface";
import { useAppDispatch } from "../hooks";
import { RootState } from "../store";

const initialState:user=userConstant;

const setUser: CaseReducer<user,PayloadAction<user>>=(state,action)=>{
    console.log('state in setUser',state);
    state=action.payload
    return state
}
const removeUser: CaseReducer<user>=(state)=>{
    console.log('state in remove',state);
    state=initialState;
    return state
}
const userSlice = createSlice({
    name: 'userRedux',
    initialState,
    reducers:{
        setUser,
        removeUser
    }
})
const { actions, reducer } = userSlice;

export const usersReducer = reducer;

export const UserActions = ()=>{
    const dispatch = useAppDispatch();
    return {
        setUserToRedux:(user:user)=>dispatch(actions.setUser(user)),
        removeUserInRedux:()=>dispatch(actions.removeUser())
    }
}
export const selectUserInRedux = (state: RootState)=>state.user