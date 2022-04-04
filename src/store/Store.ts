import { combineReducers } from 'redux'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from "react";
import AppRoot from "../utilities/AppRoot";

type App = {
  bool?: boolean
  root: AppRoot | null
}

const AppSlice = createSlice({
  name: 'app',
  initialState: {} as App,
  reducers: {
    toggleState(state?) {
      state.bool = !state.bool
    },
    setState(state, action: PayloadAction<App>) {
      //@ts-ignore
      state.root = action.payload
    },
  },
})

// Actions
const { toggleState, setState } = AppSlice.actions

// 外部からはこの関数を呼んでもらう
export const forceRender = () => async (dispatch: Dispatch<PayloadAction<App>>) => {
  //@ts-ignore
  dispatch(toggleState())
}
export const setAppRoot = (appRoot: AppRoot) => async (
    dispatch: Dispatch<PayloadAction<App>>
) => {
  //@ts-ignore
  dispatch(setState(appRoot))
}

export default combineReducers({
  app: AppSlice.reducer,
})