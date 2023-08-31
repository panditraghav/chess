import {
  PIECE_ANIMATE_ATTR,
  PIECE_ATTR,
  PIECE_POSITION_ATTR,
  PIECE_SIDE_ATTR,
  PIECE_TYPE_ATTR,
  SQUARE_INDEX_ATTR,
} from "./utils/const";
import { Side } from "./utils/types";

export class Piece {
  private type: string;
  private side: Side;
  private imgUrl: string;
  private pieceElement: HTMLElement;
  private position: number;
  private animate: boolean;

  constructor(
    type: string,
    imgUrl: string,
    side: Side,
    position: number,
    animate: boolean = false
  ) {
    this.type = type;
    this.imgUrl = imgUrl;
    this.side = side;
    this.position = position;
    this.animate = animate;
    this.pieceElement = this.createPieceElement();
  }

  private createPieceElement() {
    const pieceImg = new Image();
    pieceImg.src = this.imgUrl;

    const pieceElement = document.createElement("div");
    pieceElement.appendChild(pieceImg);
    pieceElement.setAttribute(PIECE_ATTR, "");
    pieceElement.setAttribute(PIECE_SIDE_ATTR, this.side);
    pieceElement.setAttribute(PIECE_TYPE_ATTR, this.type);
    pieceElement.setAttribute(PIECE_ANIMATE_ATTR, String(this.animate));
    pieceElement.setAttribute(PIECE_POSITION_ATTR, `${this.position}`);
    pieceElement.style.top = "0px";
    pieceElement.style.left = "0px";

    return pieceElement;
  }

  updatePieceElementPosition(position?: number) {
    this.position = position || this.position;
    this.pieceElement.setAttribute(PIECE_POSITION_ATTR, `${this.position}`);

    const square = document.querySelector(
      `[${SQUARE_INDEX_ATTR}="${this.position}"]`
    );

    if (square) {
      const { top, left } = square.getBoundingClientRect();
      this.pieceElement.style.transform = `translateX(${left}px) translateY(${top}px)`;
    }
  }

  getPieceElement() {
    this.updatePieceElementPosition();
    return this.pieceElement;
  }

  setAnimate(animate: boolean) {
    this.animate = animate;
    this.pieceElement.setAttribute(PIECE_ANIMATE_ATTR, String(this.animate));
  }
}
