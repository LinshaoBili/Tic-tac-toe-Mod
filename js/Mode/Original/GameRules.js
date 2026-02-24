import { NewChessBoard, PlayChess } from "../../ChessBoard.js";
import { NewChessBoardEle, EleSetXY } from "../../Element.js";
import { GetGameRules } from "../../Rule.js";
import { AddCSS, DelCSS, SetStatus, StatusType } from "../../Start.js";
import { Focus } from "../../Camera.js";
export default {};

let ChessNumber = 0;
let Player = ["P1", "P2"];
let CSSUUID;
export const GameStart = () => {
  //开始时触发
  NewChessBoard(GetGameRules("ChessBoardGenerate"));
  EleSetXY(NewChessBoardEle());
  SetStatus(StatusType.Started);
  CSSUUID = AddCSS("js/Mode/Original/Original.css");
};
export const GameEnd = () => {
  DelCSS(CSSUUID);
  //结束时触发
};
export const ClickChessPlaid = (ele) => {
  //点击棋子触发
  const plaid = JSON.parse(ele.getAttribute("plaid"));
  let name = Player[ChessNumber % 2];
  if (PlayChess(plaid, name) == true) {
    ele.classList.add(name);
    ChessNumber++;
  }
};
export const MouseEnterChessPlaid = (ele) => {
  //鼠标进入棋子触发
  Focus();
};
export const MouseLeaveChessPlaid = (ele) => {
  //鼠标离开棋子触发
  Focus();
};
export const KeyDown = () => {
  //摁下键盘
};
export const KeyUp = () => {
  //松开键盘
};
export const EverySecond = () => {
  //每一秒触发
};
