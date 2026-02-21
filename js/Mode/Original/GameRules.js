import { NewChessBoard } from "../../ChessBoard.js";
import { SelectChessPlaid } from "../../ChessBoard.js";
import { NewChessBoardEle, EleSetXY } from "../../Element.js";
import { GetGameRules } from "../../Rule.js";
import { SetStatus, StatusType } from "../../Start.js";
import { Focus } from "../../Camera.js";
export default {};
export const ChessBoard = () => {
  //开始时触发
  NewChessBoard(GetGameRules("ChessBoardGenerate"));
  EleSetXY(NewChessBoardEle());
  SetStatus(StatusType.Started);
};
export const ClickChessPlaid = (ele) => {
  //点击棋子触发
  console.log(`ClickChessPlaid`);
};
export const MouseEnterChessPlaid = (ele) => {
  //鼠标进入棋子触发
  console.log(`MouseEnterChessPlaid`);
  SelectChessPlaid(ele);
  Focus();
};
export const MouseLeaveChessPlaid = (ele) => {
  //鼠标离开棋子触发
  console.log(`MouseLeaveChessPlaid`);
  SelectChessPlaid();
  Focus();
};
export const KeyDown = () => {
  //摁下键盘
  console.log(`KeyDown`);
};
export const KeyUp = () => {
  //松开键盘
  console.log(`KeyUp`);
};
export const EverySecond = () => {
  //每一秒触发
  console.log(`EverySecond`);
};
