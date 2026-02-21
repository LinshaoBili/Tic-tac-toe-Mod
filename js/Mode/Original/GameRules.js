import { NewChessBoard } from "../../ChessBoard.js";
import { NewChessBoardEle, EleSetXY } from "../../Element.js";
import { GetGameRules } from "../../Rule.js";
import { SetStatus, StatusType } from "../../Start.js";
export default {};
export const ChessBoard = () => {
  NewChessBoard(GetGameRules("ChessBoardGenerate"));
  EleSetXY(NewChessBoardEle());
  SetStatus(StatusType.Started);
};
