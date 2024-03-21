import { combineReducers } from "@reduxjs/toolkit";
import { tokenReducer } from "./token";
import { usersReducer } from "./userDucks";

export const rootReducer = combineReducers({
    token:tokenReducer,
    user:usersReducer
})
export type RootState = ReturnType<typeof rootReducer>