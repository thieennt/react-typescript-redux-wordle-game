import React from "react";
import Key from "../Key/Key";
import { useDispatch, useSelector } from "react-redux";
import "./keyboard.css";
import { rootState } from "../../interface";
import {
  decreasePosition,
  increaseRow,
  setBoard,
} from "../../redux/boardSlice";
import wordList from "../../words.json";

interface Props {}

const Keyboard: React.FC<Props> = (props) => {
  const rows: string[] = [
    "w q e r t y u i o p",
    "a s d f g h j k l",
    "z x c v b n m",
  ];
  const dispatch = useDispatch();
  const board = useSelector((state: rootState) => state.board.board);
  const position = useSelector((state: rootState) => state.board.position);
  const row = useSelector((state: rootState) => state.board.row);
  const correctWord = useSelector(
    (state: rootState) => state.board.correctWord
  );

  let currentWord: string = `${board[position - 5]}${board[position - 4]}${
    board[position - 3]
  }${board[position - 2]}${board[position - 1]}`.toLowerCase();

  const handleClickBack = () => {
    if (Math.floor((position - 1) / 5) < row) return;
    const newBoard = [...board];
    newBoard[position - 1] = "";
    dispatch(decreasePosition());
    dispatch(setBoard(newBoard));
  };

  const handleClickEnter = () => {
    console.log("correct word: ", correctWord);
    console.log("current: ", currentWord);

    if (wordList.words.includes(currentWord)) {
      if (position % 5 === 0 && position !== 0) {
        dispatch(increaseRow());
      }
    } else if (position % 5 !== 0) {
      alert("Not enough letter!");
    } else if (!wordList.words.includes(currentWord)) {
      alert("Word not invalid!");
    }

    if (position === 30 && wordList.words.includes(currentWord)) {
      alert(`Correct word is ${correctWord} `);
    }
  };

  return (
    <div className="keyboard-container">
      {rows.map((row, index) => (
        <div className="row" key={index}>
          {index === 2 && (
            <span className="letter-row" onClick={handleClickEnter}>
              Enter
            </span>
          )}
          {row.split(" ").map((letter, index) => (
            <div className="letter-row" key={index}>
              <Key letter={letter.toUpperCase()} />
              {letter === "m" && <span onClick={handleClickBack}>Back</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
