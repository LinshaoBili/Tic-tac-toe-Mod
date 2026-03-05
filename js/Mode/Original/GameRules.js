import {
  DefChessBoard,
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
import { GetGameRules, RModeRules, SetGameRules } from "../../Rule.js";
import {
  AddCSS,
  DelCSS,
  GetViewEle,
  SetStatus,
  StatusType,
} from "../../Start.js";
import { Focus } from "../../Camera.js";
import {
  AddLangJson,
  GetLang,
  NLT,
  RLangText,
  SettingsLangText,
} from "../../Language.js";
import Lang from "./Lang.js";
export default {
  ChessBoardGenerate: {
    //棋盘生成配置
    MaxX: 3,
    MaxY: 3,
    Fixed: [
      { X: 0, Y: 0, ChessPiece: null },
      { X: 0, Y: 1, ChessPiece: null },
      { X: 1, Y: 1, ChessPiece: null },
      { X: 1, Y: 0, ChessPiece: null },
      { X: 1, Y: -1, ChessPiece: null },
      { X: 0, Y: -1, ChessPiece: null },
      { X: -1, Y: -1, ChessPiece: null },
      { X: -1, Y: 0, ChessPiece: null },
      { X: -1, Y: 1, ChessPiece: null },
    ],
    Placement: [{ Type: "PseudoRandom" }],
  },
};

let ChessNumber = 0;
let Player = ["P1", "P2"];
let PlayerWin = {};
let middleEle;
let CSSUUID;
let End = false;
export const GameStart = () => {
  //开始时触发
  AddLangJson({ D: Lang[GetLang(true)] ?? {}, P: Lang[GetLang()] ?? {} });
  NewChessBoard(GetGameRules("ChessBoardGenerate"));
  EleSetXY(NewChessBoardEle());
  SetStatus(StatusType.Started);
  CSSUUID = AddCSS("js/Mode/Original/Original.css");
  middleEle = GetChessPlaidEle()["0"]["0"];
  for (const name of Player) {
    PlayerWin[name] = 0;
  }
};
export const GameEnd = () => {
  DelCSS(CSSUUID);
  //结束时触发
};
export const ClickChessPlaid = (ele) => {
  //点击棋子触发
  if (GetGameRules("PlayerChess") == false) return;
  const plaid = JSON.parse(ele.getAttribute("plaid"));
  let name = Player[ChessNumber % 2];
  // console.log(plaid);
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
            PlayerWin[name]++;
            End = true;
            WinUI(name);
            SetGameRules("PlayerChess", false);
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
  ChessNumber = 0;
  let winEleId = "WinUI";
  let view = GetViewEle();
  let WinUIEle = NewEle("div", winEleId, view);
  let titleEle = NewEle("div", "TitleWin", WinUIEle);
  let titleEleWinA = SettingsLangText(NewEle("p", "", titleEle), "t_win");
  let titleEleWinB = NewEle("p", "", titleEle);
  titleEleWinB.innerHTML = name;
  let rLangList = [titleEleWinA];
  for (const name of Player) {
    let playerWonNumEle = SettingsLangText(
      NewEle("p", "", WinUIEle),
      "player_win_num",
      [`name@@@${name}`, `num@@@${PlayerWin[name]}`],
    );
    playerWonNumEle.classList.add("PlayerWinNum");
    rLangList.push(playerWonNumEle);
  }
  let UIButtonList = [
    {
      langid: "next_first_move",
      class: ["NextFirstMove"],
      array: [`name@@@${Player[ChessNumber % 2]}`],
      click: function () {
        ChessNumber++;
        let ele = document.getElementsByClassName("NextFirstMove")[0].getElementsByTagName("p")[0];
        let langdata = JSON.parse(ele.getAttribute("langdata"));
        langdata.array[0] = `${langdata.array[0].split("@@@")[0]}@@@${Player[ChessNumber % 2]}`;
        ele.setAttribute("langdata", JSON.stringify(langdata));
        RLangText([ele]);
      },
    },
    {
      langid: "t_onemoretime",
      class: ["OneMoreTime"],
      click: function () {
        document.getElementById(winEleId).remove();
        DefChessBoard();
        NewChessBoard(GetGameRules("ChessBoardGenerate"));
        EleSetXY(NewChessBoardEle());
        SetStatus(StatusType.Started);
        middleEle = GetChessPlaidEle()["0"]["0"];
        End = false;
        SetGameRules("PlayerChess", true);
      },
    },
  ];
  for (const eleJson of UIButtonList) {
    let ele = NewEle("div", "", WinUIEle);
    let textEle = SettingsLangText(
      NewEle("p", "", ele),
      eleJson.langid,
      eleJson.array,
    );
    ele.onclick = eleJson.click;
    for (const className of eleJson.class) {
      ele.classList.add(className);
    }
    rLangList.push(textEle);
  }
  RLangText(rLangList);
}
