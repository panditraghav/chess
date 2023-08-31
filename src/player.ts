import { Move } from "./move";
import { Side } from "./utils/types";

export interface Player {
  side: Side;
  move(): Promise<Move>;
}
