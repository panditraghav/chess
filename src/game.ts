import { Board } from "./board";
import { Player } from "./player";
import { INITIAL_POSITION } from "./utils/const";

export class Game {
  private board: Board;
  private player1: Player;
  private player2: Player;
  private playerTurn: 0 | 1;

  constructor(boardElement: HTMLElement, player1: Player, player2: Player) {
    this.board = new Board(boardElement);
    this.board.updateBoardFromFen(INITIAL_POSITION);
    this.board.renderBoard();
    this.board.renderPieces();
    this.player1 = player1;
    this.player2 = player2;
    this.playerTurn = player1.side == "white" ? 0 : 1;

    this.gameLoop();
  }

  async gameLoop() {
    while (true) {
      const move =
        this.playerTurn == 0
          ? await this.player1.move()
          : await this.player2.move();
      this.board.move(move);
      this.changePlayerTurn();
    }
  }

  private changePlayerTurn() {
    this.playerTurn = this.playerTurn == 0 ? 1 : 0;
  }
}
