import { NewChessBoard } from "../../ChessBoard.js";
import { NewChessBoardEle } from "../../Element.js";
import { GetGameRules } from "../../Rule.js";
export default {};
export const ChessBoard = () => {
  NewChessBoard(GetGameRules("ChessBoardGenerate"));
  NewChessBoardEle();
};
