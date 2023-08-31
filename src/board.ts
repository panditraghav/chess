import { Piece } from "./piece";
import { SQUARE_ATTR, SQUARE_INDEX_ATTR } from "./utils/const";

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
import { Move } from "./move";

export type Square = Piece | null;

export class Board {
  private board: Array<Square>;
  private boardElement: HTMLElement;

  constructor(boardElement: HTMLElement) {
    this.board = new Array(64);
    this.board.fill(null);
    this.boardElement = boardElement;
    this.addWindowResizeListener();
  }

  updateBoardFromFen(fen: string) {
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
          this.board[row * 8 + col] = new Piece(
            "Rook",
            char == "R" ? RookWhite : RookBlack,
            char == "R" ? "white" : "black",
            row * 8 + col
          );
          break;
        case "n":
          this.board[row * 8 + col] = new Piece(
            "Knight",
            char == "N" ? KnightWhite : KnightBlack,
            char == "N" ? "white" : "black",
            row * 8 + col
          );
          break;
        case "b":
          this.board[row * 8 + col] = new Piece(
            "Bishop",
            char == "B" ? BishopWhite : BishopBlack,
            char == "B" ? "white" : "black",
            row * 8 + col
          );
          break;
        case "q":
          this.board[row * 8 + col] = new Piece(
            "Queen",
            char == "Q" ? QueenWhite : QueenBlack,
            char == "Q" ? "white" : "black",
            row * 8 + col
          );
          break;
        case "k":
          this.board[row * 8 + col] = new Piece(
            "King",
            char == "K" ? KingWhite : KingBlack,
            char == "K" ? "white" : "black",
            row * 8 + col
          );
          break;
        case "p":
          this.board[row * 8 + col] = new Piece(
            "Pawn",
            char == "P" ? PawnWhite : PawnBlack,
            char == "P" ? "white" : "black",
            row * 8 + col
          );
      }
      col++;
    }
  }

  renderBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const squareElement = document.createElement("div");
        squareElement.setAttribute(SQUARE_ATTR, "");
        squareElement.setAttribute(SQUARE_INDEX_ATTR, `${i * 8 + j}`);
        if ((i * 7 + j) % 2 == 0) {
          squareElement.classList.add("light");
        } else {
          squareElement.classList.add("dark");
        }
        this.boardElement.appendChild(squareElement);
      }
    }
  }

  renderPieces() {
    for (let i = 0; i < this.board.length; i++) {
      const pieceElement = this.board[i]?.getPieceElement();
      if (pieceElement) {
        this.boardElement.appendChild(pieceElement);
      }
    }
  }

  move(move: Move) {
    console.log("Board move", move);
    this.board[move.to] = this.board[move.from];
    this.board[move.from] = null;
    this.board[move.to]?.updatePieceElementPosition(move.to);
  }

  private addWindowResizeListener() {
    window.addEventListener("resize", () => {
      for (let i = 0; i < this.board.length; i++) {
        const pieceElement = this.board[i];
        pieceElement?.updatePieceElementPosition();
      }
    });
  }
}
