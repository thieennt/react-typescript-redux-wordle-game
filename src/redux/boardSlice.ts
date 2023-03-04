import { createSlice } from "@reduxjs/toolkit";
import wordList from "../words.json";

let randomNum = Math.floor(Math.random() * wordList.words.length);

const initialState = {
  board: [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  position: 0,
  row: 0,
  correctWord: wordList.words[randomNum].toUpperCase(),
};

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    increasePosition: (state) => {
      state.position++;
    },
    decreasePosition: (state) => {
      state.position--;
    },
    increaseRow: (state) => {
      state.row++;
    },
  },
});

export const { setBoard, increasePosition, decreasePosition, increaseRow } =
  boardSlice.actions;
export default boardSlice.reducer;
