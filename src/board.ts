import { Piece } from "./pieces";

export type Square = Piece | null;
export type Board = Array<Square>;

export function createBoard(): Board {
  const board = new Array<Square>(64);
  board.fill(null);
  return board;
}
