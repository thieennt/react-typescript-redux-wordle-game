import React from "react";
import { rootState } from "../../interface";
import { useSelector, useDispatch } from "react-redux";
import { increasePosition, setBoard } from "../../redux/boardSlice";
import "./key.css";

interface Props {
  letter: string;
}

const Key: React.FC<Props> = (props) => {
  const { letter } = props;
  const dispatch = useDispatch();
  const board = useSelector((state: rootState) => state.board.board);
  const position = useSelector((state: rootState) => state.board.position);
  const row = useSelector((state: rootState) => state.board.row);
  const currentRow = Math.floor(position / 5);

  const handleClickLetter = () => {
    if (position >= board.length) return;
    if (currentRow > row) return;
    const newBoard = [...board];
    newBoard[position] = letter;
    dispatch(setBoard(newBoard));
    dispatch(increasePosition());
  };

  return (
    <div className="letter" onClick={handleClickLetter}>
      {letter}
    </div>
  );
};

export default Key;
