import { createBoard } from "./board";
import { updateBoardFromFen } from "./fen";
import { PIECE_COLOR_DATA, PIECE_NAME_DATA, renderBoard } from "./render";
import "./style.css";
import RookWhite from "./images/Pieces/White/RookWhite.svg";

const INITIAL_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function main() {
  const boardElement = document.getElementById("board");
  const board = createBoard();
  let sideTurn: "black" | "white" = "white";

  if (!boardElement) {
    alert("Cannot render board!");
    return;
  }
  updateBoardFromFen(board, INITIAL_POSITION);
  renderBoard(board, boardElement);
  sideTurn = "white";

  //Make squares droppable
  const squares = boardElement.querySelectorAll(".square");
  squares.forEach((square) => {
    if (square instanceof HTMLDivElement) {
      square.addEventListener("drop", (ev) => {
        const dt = ev.dataTransfer;
        if (!dt) return;
        const pieceName = dt.getData(PIECE_NAME_DATA);
        const pieceColor = dt.getData(PIECE_COLOR_DATA);
        console.log("Drop", { pieceName, pieceColor });
      });
      square.addEventListener("dragover", (ev) => {
        ev.preventDefault();
      });
    }
  });

  const pieces = boardElement.querySelectorAll(".piece");
  pieces.forEach((piece) => {
    if (piece instanceof HTMLElement) {
      piece.draggable = true;
      piece.addEventListener("dragstart", (ev) => {
        const dt = ev.dataTransfer;
        const pieceName = piece.getAttribute(PIECE_NAME_DATA);
        const pieceColor = piece.getAttribute(PIECE_COLOR_DATA);
        if (!dt || !pieceName || !pieceColor) return;

        dt.setData(PIECE_NAME_DATA, pieceName);
        dt.setData(PIECE_COLOR_DATA, pieceColor);

        // Remove Drag image
        const dragImage = new Image(70, 70);
        dragImage.src =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
        dt.setDragImage(dragImage, 0, 0);
      });
    }
  });
}
main();
