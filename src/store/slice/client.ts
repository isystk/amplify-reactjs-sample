import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from "react";
import RtcClient from "../../utilities/RtcClient";

interface Item {
  bool?: boolean
  rtcClient: RtcClient | null
}

export const ClientSlice = createSlice({
  name: 'client',
  initialState: {} as Item,
  reducers: {
    toggleState(state?) {
      state.bool = !state.bool
    },
    fetchRtcClient(state, action: PayloadAction<Item>) {
      //@ts-ignore
      state.rtcClient = action.payload
    },
  },
})

// Actions
export const { toggleState, fetchRtcClient } = ClientSlice.actions

// 外部からはこの関数を呼んでもらう
export const forceRender = () => async (dispatch: Dispatch<PayloadAction<Item>>) => {
  //@ts-ignore
  dispatch(toggleState())
}
export const setRtcClient = (rtcClient: RtcClient) => async (
  dispatch: Dispatch<PayloadAction<Item>>
) => {
  //@ts-ignore
  dispatch(fetchRtcClient(rtcClient))
}

export default ClientSlice.reducer