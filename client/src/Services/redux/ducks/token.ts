import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tokenInit } from "../../../constants/userConstant";
import { useAppDispatch } from "../hooks";
import { RootState } from "../store";

const initialState:string = tokenInit;

const setToken : CaseReducer<string, PayloadAction<string>> = (state, action) => {
    state = action.payload;
    return state;
}

const resetState: CaseReducer<string> = (state)=>{
    state = initialState;
    return state;
}

const tokenSlice = createSlice({
    name: 'tokenUser',
    initialState,
    reducers: {
        setToken,
        resetState
    }
})

const {actions, reducer} = tokenSlice;

export const tokenReducer = reducer;

export const TokenActions = () => {
    const dispatch = useAppDispatch();
    return {
        setTokentoRedux: (token:string)=>dispatch(actions.setToken(token)),
        resetTokenInRedux: ()=>dispatch(actions.resetState())
    };
};
export const selectToken = (state: RootState) => state.token;