export type PieceColor = "black" | "white";
export class Piece {
  name: string;
  color: PieceColor;
  imgUrl: string;

  constructor(name: string, imgUrl: string, color: PieceColor) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.color = color;
  }
}
