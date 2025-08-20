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
}

const initialState: ChatState = {
  selectedUser: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { selectUser } = chatSlice.actions;
export default chatSlice.reducer;
