import { Board } from "./board";
import { Piece } from "./pieces";

import RookWhite from "./images/Pieces/White/RookWhite.svg";
import RookBlack from "./images/Pieces/Black/RookBlack.svg";

import KnightWhite from "./images/Pieces/White/KnightWhite.svg";
import KnightBlack from "./images/Pieces/Black/KnightBlack.svg";

import BishopWhite from "./images/Pieces/White/BishopWhite.svg";
import BishopBlack from "./images/Pieces/Black/BishopBlack.svg";

import KingWhite from "./images/Pieces/White/KingWhite.svg";
import KingBlack from "./images/Pieces/Black/KingBlack.svg";

import QueenWhite from "./images/Pieces/White/QueenWhite.svg";
import QueenBlack from "./images/Pieces/Black/QueenBlack.svg";

import PawnWhite from "./images/Pieces/White/PawnWhite.svg";
import PawnBlack from "./images/Pieces/Black/PawnBlack.svg";

export function updateBoardFromFen(board: Board, fen: string) {
  const positions = fen.split(" ")[0];
  let row = 0;
  let col = 0;
  for (const char of positions) {
    const maybeNumber = parseInt(char);
    if (!Number.isNaN(maybeNumber)) {
      col += maybeNumber;
      continue;
    }
    if (char == "/") {
      row++;
      col = 0;
      continue;
    }

    switch (char.toLowerCase()) {
      case "r":
        board[row * 8 + col] = new Piece(
          "Rook",
          char == "R" ? RookWhite : RookBlack,
          char == "R" ? "white" : "black"
        );
        break;
      case "n":
        board[row * 8 + col] = new Piece(
          "Knight",
          char == "N" ? KnightWhite : KnightBlack,
          char == "N" ? "white" : "black"
        );
        break;
      case "b":
        board[row * 8 + col] = new Piece(
          "Bishop",
          char == "B" ? BishopWhite : BishopBlack,
          char == "B" ? "white" : "black"
        );
        break;
      case "q":
        board[row * 8 + col] = new Piece(
          "Queen",
          char == "Q" ? QueenWhite : QueenBlack,
          char == "Q" ? "white" : "black"
        );
        break;
      case "k":
        board[row * 8 + col] = new Piece(
          "King",
          char == "K" ? KingWhite : KingBlack,
          char == "K" ? "white" : "black"
        );
        break;
      case "p":
        board[row * 8 + col] = new Piece(
          "Pawn",
          char == "P" ? PawnWhite : PawnBlack,
          char == "P" ? "white" : "black"
        );
    }
    col++;
  }
}
