import {
  GetNearbyPieces,
  GetPiecesAngle,
  NewChessBoard,
  PlayChess,
} from "../../ChessBoard.js";
import {
  NewChessBoardEle,
  EleSetXY,
  GetChessPlaidEle,
  NewEle,
} from "../../Element.js";
import { GetGameRules } from "../../Rule.js";
import {
  AddCSS,
  DelCSS,
  GetViewEle,
  SetStatus,
  StatusType,
} from "../../Start.js";
import { Focus } from "../../Camera.js";
import { NLT, RLangText, SettingsLangText } from "../../Language.js";
export default {};

let ChessNumber = 0;
let Player = ["P1", "P2"];
let middleEle;
let CSSUUID;
let End = false;
export const GameStart = () => {
  //开始时触发
  NewChessBoard(GetGameRules("ChessBoardGenerate"));
  EleSetXY(NewChessBoardEle());
  SetStatus(StatusType.Started);
  CSSUUID = AddCSS("js/Mode/Original/Original.css");
  middleEle = GetChessPlaidEle()["0"]["0"];
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
  const AngleList = [
    GetPiecesAngle.r0,
    GetPiecesAngle.r45,
    GetPiecesAngle.r90,
    GetPiecesAngle.r135,
  ];
  // console.log(`\n ${name}`);
  for (const Angle of AngleList) {
    let plaidEleList = GetNearbyPieces(plaid, Angle, { Min: -2, Max: 2 });
    let cacke = 0;
    // console.log(plaidEleList);
    for (const plaidEle of plaidEleList) {
      if (plaidEle.classList.contains(name)) {
        cacke++;
        if (cacke >= 3) {
          for (const plaidEle of plaidEleList) {
            plaidEle.style.backgroundColor = "#fff";
          }
          if (!End) {
            End = true;
            WinUI(name);
          }
          break;
        }
      }
    }
  }
};
export const MouseEnterChessPlaid = (ele) => {
  //鼠标进入棋子触发
  Focus();
};
export const MouseLeaveChessPlaid = (ele) => {
  //鼠标离开棋子触发
  Focus(middleEle);
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
function WinUI(name) {
  let winEleId = "WinUI";
  let view = GetViewEle();
  let WinUIEle = NewEle("div", winEleId, view);
  let titleEle = SettingsLangText(NewEle("p", "", WinUIEle), "t_win");
  RLangText([titleEle]);
}
