import React from "react";
import Keyboard from "../Keyboard/Keyboard";
import Square from "../Square/Square";
import "./board.css";

interface Props {
  board: string[];
}

const Board: React.FC<Props> = (props) => {
  const { board } = props;
  return (
    <>
      <div className="board">
        {board.map((square, index) => (
          <Square key={index} value={square} squareIndex={index} />
        ))}
      </div>
      <div className="keyboard">
        <Keyboard />
      </div>
    </>
  );
};

export default Board;
