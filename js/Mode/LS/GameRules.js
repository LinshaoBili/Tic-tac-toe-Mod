import { NewChessBoard } from "../../ChessBoard.js";
import { NewChessBoardEle, EleSetXY } from "../../Element.js";
import { GetGameRules } from "../../Rule.js";
import { AddCSS, SetStatus, StatusType } from "../../Start.js";
import { MenuUI } from "./UI.js";
import { AddLangJson, GetLang } from "../../Language.js";
import Lang from "./Lang.js";
export default {
  PlayerChess: true,
  //基础玩法配置
  PlayerMin: 2, //最小玩家数
  PlayerMax: 2, //最大玩家数
  MoveNumber: 1, //下棋次数
  WaitingTime: 60, //最大等待下棋时间s
  Cover: false, //覆盖

  //棋盘配置
  ChessBoardGenerate: {
    //棋盘生成配置
    MaxX: 128,
    MaxY: 128,
    DX: 5,
    DY: 5,
    Placement: [{ Type: "PseudoRandom" }],
  },
};
let CSSUUID = [];
export const GameStart = () => {
  //开始时触发
  SetStatus(StatusType.Started);
  AddLangJson({ D: Lang[GetLang(true)] ?? {}, P: Lang[GetLang()] ?? {} });
  let cssurl = "js/Mode/LS/Style/";
  CSSUUID.push(AddCSS(`${cssurl}ChessBoard.css`));
  CSSUUID.push(AddCSS(`${cssurl}UI.css`));
  MenuUI();
  // NewChessBoard(GetGameRules("ChessBoardGenerate"));
  // EleSetXY(NewChessBoardEle());
};
export const GameEnd = () => {
  //结束时触发
};
export const ClickChessPlaid = (ele) => {
  //点击棋子触发
};
export const MouseEnterChessPlaid = (ele) => {
  //鼠标进入棋子触发
};
export const MouseLeaveChessPlaid = (ele) => {
  //鼠标离开棋子触发
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
