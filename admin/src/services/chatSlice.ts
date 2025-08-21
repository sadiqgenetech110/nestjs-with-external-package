// src/redux/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name?: string;
  username?: string;
  displayName?: string;
  email: string;
  token?: string;
}

interface ChatState {
  selectedUser: User | null;
  roomId: string | null;
}

const initialState: ChatState = {
  selectedUser: null,
  roomId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string | null>) => {
      state.roomId = action.payload;
    },
  },
});

export const { selectUser, setRoomId } = chatSlice.actions;
export default chatSlice.reducer;
