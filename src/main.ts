import "./style.css";
import { Game } from "./game";
import { HumanPlayer } from "./humanPlayer";
import { BOARD_ELEMENT_ID } from "./utils/const";

function main() {
  const board = document.getElementById(BOARD_ELEMENT_ID);
  if (!board) {
    alert("board element not found");
    return;
  }
  new Game(board, new HumanPlayer("white"), new HumanPlayer("black"));
}
main();
