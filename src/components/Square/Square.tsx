import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./square.css";
import { motion } from "framer-motion";
import { rootState } from "../../interface";

interface Props {
  value: string;
  squareIndex: number;
}

const Square: React.FC<Props> = (props) => {
  const { value, squareIndex } = props;
  //   Redux state
  const correctWord = useSelector(
    (state: rootState) => state.board.correctWord
  );
  const position = useSelector((state: rootState) => state.board.position);
  const row = useSelector((state: rootState) => state.board.row);

  //   React state
  const [correct, setCorrect] = useState<boolean>(false);
  const [almost, setAlmost] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);

  let wordLastIndex = 4;
  let currentPosition =
    position === 5
      ? wordLastIndex
      : position > 5 && position % 5 === 0
      ? wordLastIndex
      : (position % 5) - 1;

  useEffect(() => {
    if (correctWord[currentPosition] == value) {
      setCorrect(true);
    } else if (!correct && value !== "" && correctWord.includes(value)) {
      setAlmost(true);
    } else if (!correct && value !== "" && !correctWord.includes(value)) {
      setWrong(true);
    }
    return () => {
      setCorrect(false);
      setAlmost(false);
      setWrong(false);
    };
  }, [value]);

  const status: any =
    Math.floor(squareIndex / 5) < row &&
    (correct ? "correct" : almost ? "almost" : wrong ? "wrong" : "");

  const variants = {
    filled: () => ({
      scale: [1.2, 1],
      transition: {
        duration: 0.2,
      },
    }),
    unfilled: () => ({
      scale: [1.2, 1],
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <motion.div animate={value ? "filled" : "unfilled"} variants={variants}>
      <div className="square" id={status.toString()}>
        {value}
      </div>
    </motion.div>
  );
};

export default Square;
