import { Move } from "./move";
import { Player } from "./player";
import {
  BOARD_ELEMENT_ID,
  PIECE_POSITION_ATTR,
  PIECE_SIDE_ATTR,
  SQUARE_INDEX_ATTR,
} from "./utils/const";
import { Side } from "./utils/types";

type MoveEvent = { move: Move };
function isMoveEvent(ev: Event): ev is CustomEvent<MoveEvent> {
  return "detail" in ev;
}

export class HumanPlayer implements Player {
  side: Side;
  private dragImage: HTMLImageElement = new Image();
  private listenersAttatched: boolean = false;

  constructor(side: Side) {
    this.side = side;
    this.dragImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  }

  async move(): Promise<Move> {
    if (!this.listenersAttatched) {
      this.attatchMoveListeners();
      this.listenersAttatched = true;
    }
    return new Promise((resolve, _) => {
      let listener = function (ev: Event) {
        if (isMoveEvent(ev)) {
          resolve(ev.detail.move);
          //@ts-ignore
          window.removeEventListener(`${this._side}_move`, listener);
        }
      };
      listener = listener.bind(this);
      window.addEventListener(`${this.side}_move`, listener);
    });
  }

  private attatchMoveListeners() {
    const boardElement = document.getElementById(BOARD_ELEMENT_ID);
    if (!boardElement) return;

    const pieces = boardElement.querySelectorAll(
      `[${PIECE_SIDE_ATTR}="${this.side}"]`
    );

    for (const piece of pieces) {
      if (
        piece instanceof HTMLElement &&
        piece.getAttribute(PIECE_SIDE_ATTR) === this.side
      ) {
        piece.addEventListener("dragstart", (ev) => {
          const { dataTransfer: dt } = ev;
          if (!dt) return;
          dt.setData(
            PIECE_POSITION_ATTR,
            piece.getAttribute(PIECE_POSITION_ATTR) || ""
          );
          dt.setData(
            PIECE_SIDE_ATTR,
            piece.getAttribute(PIECE_SIDE_ATTR) || ""
          );
          dt.setDragImage(this.dragImage, 0, 0);
        });
      }
    }

    const squares = boardElement.children;
    for (const square of squares) {
      if (square instanceof HTMLElement) {
        // Make square droppable
        square.addEventListener("dragover", (ev) => {
          ev.preventDefault();
        });

        square.addEventListener("drop", (ev) => {
          const { dataTransfer: dt } = ev;
          if (!dt) return;

          const droppedPieceSide = dt.getData(PIECE_SIDE_ATTR);
          if (droppedPieceSide !== this.side) return;

          const fromPosition = parseInt(dt.getData(PIECE_POSITION_ATTR));
          const toPosition = parseInt(
            square.getAttribute(SQUARE_INDEX_ATTR) || ""
          );

          if (!Number.isNaN(fromPosition) && !Number.isNaN(toPosition)) {
            const moveEvent = new CustomEvent<MoveEvent>(`${this.side}_move`, {
              detail: { move: new Move(fromPosition, toPosition) },
            });
            window.dispatchEvent(moveEvent);
          }
        });
      }
    }
  }
}
