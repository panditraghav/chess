import { Board } from "./board";

export const PIECE_COLOR_DATA = "piece-color";
export const PIECE_NAME_DATA = "piece-name";

export function renderBoard(board: Board, boardElement: HTMLElement) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = board[i * 8 + j];
      const squareElement = document.createElement("div");
      squareElement.classList.add("square");
      squareElement.setAttribute("data-index", String(i * 8 + j));

      if (square) {
        const piece = square;
        const pieceImage = document.createElement("img");
        const pieceElement = document.createElement("div");
        pieceImage.src = piece.imgUrl;
        pieceImage.classList.add("piece-image");
        pieceElement.setAttribute(PIECE_COLOR_DATA, piece.color);
        pieceElement.setAttribute(PIECE_NAME_DATA, piece.name);
        pieceElement.appendChild(pieceImage);
        pieceElement.classList.add("piece");
        squareElement.appendChild(pieceElement);
      }

      //Square color
      if ((i * 7 + j) % 2 == 0) {
        squareElement.classList.add("light");
      } else {
        squareElement.classList.add("dark");
      }

      boardElement.appendChild(squareElement);
    }
  }
}
