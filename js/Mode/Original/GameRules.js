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
import { GetGameRules, SetGameRules } from "../../Rule.js";
import {
  AddCSS,
  DelCSS,
  GetViewEle,
  SetStatus,
  StatusType,
} from "../../Start.js";
import { Focus, SetDrag, SetZoom } from "../../Camera.js";
import {
  AddLangJson,
  GetLang,
  GetLangData,
  AddLangData,
  RLangText,
  SettingsLangText,
} from "../../Language.js";
import Lang from "./Lang.js";
export default {
  ChessBoardGenerate: {
    //棋盘生成配置
    MaxX: 3,
    MaxY: 3,
    DX: 3,
    DY: 3,
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
  NewChessBoard(GetGameRules("ChessBoardGenerate")); //生成棋盘
  EleSetXY(NewChessBoardEle());
  SetStatus(StatusType.Started);
  CSSUUID = AddCSS("js/Mode/Original/Original.css");
  middleEle = GetChessPlaidEle()["0"]["0"]; //设置中间格子
  for (const name of Player) {
    PlayerWin[name] = 0;
  }
  SetZoom(true); //开启缩放
  SetDrag(true); //开启拖动
};
export const GameEnd = () => {
  DefChessBoard();
  DelCSS(CSSUUID);
  location.reload(true);
  //结束时触发
};
export const ClickChessPlaid = (ele) => {
  //点击棋子触发
  if (GetGameRules("PlayerChess") == false) return;
  const plaid = JSON.parse(ele.getAttribute("plaid")); //获取棋子坐标
  let name = Player[ChessNumber % 2]; //获取玩家名
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
    let plaidEleList = GetNearbyPieces(plaid, Angle, { Min: -2, Max: 2 }); //获取附近棋子
    let cacke = 0;
    // console.log(plaidEleList);
    for (const plaidEle of plaidEleList) {
      if (plaidEle.classList.contains(name)) {
        //如果是玩家的棋子
        cacke++;
        if (cacke >= 3) {
          //如果连续三个棋子
          for (const plaidEle of plaidEleList) {
            //将连续的棋子变色
            plaidEle.style.backgroundColor = "#fff";
          }
          if (!End) {
            //玩家胜利
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
  //胜利界面
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
        let ele = document
          .getElementsByClassName("NextFirstMove")[0]
          .getElementsByTagName("p")[0];
        let langdata = GetLangData(ele, "array");
        AddLangData(ele, "array", [
          `${langdata[0].split("@@@")[0]}@@@${Player[ChessNumber % 2]}`,
        ]);
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
    {
      langid: "home_page",
      class: ["HomePage"],
      click: function () {
        GameEnd();
      },
    },
  ];
  for (const eleJson of UIButtonList) {
    //生成按钮
    let ele = NewEle("div", "", WinUIEle);
    let textEle = SettingsLangText(
      NewEle("p", "", ele),
      eleJson.langid,
      eleJson.array,
    );
    ele.onclick = eleJson.click;
    ele.classList.add(...eleJson.class);
    rLangList.push(textEle);
  }
  RLangText(rLangList);
}
