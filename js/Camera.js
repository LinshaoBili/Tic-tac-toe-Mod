import { GetSelectChessPlaid } from "./ChessBoard.js";
import { NewUUID } from "./Date.js";
import { GetViewEle, StatusType, GetStatus } from "./Start.js";

let Zoom = true;
let ZoomSize = 1;

const FocusType = Object.freeze({
  Minimum: { Minimum: "Minimum", Platform: "all" }, //最小
  Moderate: { Moderate: "Moderate", Platform: "all" }, //适中
  ManualKeyboard: { ManualKeyboard: "ManualKeyboard", Platform: "pc" }, //手动键盘
  ManualMouse: { ManualMouse: "ManualMouse", Platform: "all" }, //手动鼠标
  FollowMouse: { FollowMouse: "FollowMouse", Platform: "pc" }, //跟随鼠标
  FollowSelect: { FollowSelect: "FollowSelect", Platform: "all" }, //跟随选择
});
let clientX = 0;
let clientY = 0;
document.addEventListener("mousemove", (event) => {
  clientX = event.clientX;
  clientY = event.clientY;
});
let focus = FocusType.Moderate;
let CameraConfig = { Enable: true, ProcessUUID: null, DelayTime: 500 };
export const CameraUpdate = (Config = { Enable: true, ProcessUUID: null }) => {
  if (CameraConfig.ProcessUUID == null) {
    CameraConfig.ProcessUUID = NewUUID();
    Config.ProcessUUID = CameraConfig.ProcessUUID;
  }
  if (GetStatus() == StatusType.Started) Focus();
  if (
    CameraConfig.Enable == true &&
    CameraConfig.ProcessUUID == Config.ProcessUUID
  ) {
    let time = CameraConfig.DelayTime;
    setTimeout(function () {
      CameraUpdate(Config);
    }, time);
  }
};
export const Focus = () => {
  let selectChessPlaidEle = GetSelectChessPlaid(); //玩家选中的棋盘格子
  let chessBoardEle = GetViewEle(); //棋盘元素
  let PH = window.innerHeight; //玩家的界面高度
  let PW = window.innerWidth; //玩家的界面宽度
  let CBH = chessBoardEle.offsetHeight; //棋盘高度
  let CBW = chessBoardEle.offsetWidth; //棋盘宽度
  let CBY = PH * 0.5; //棋盘的Y轴
  let CBX = PW * 0.5; //棋盘的X轴
  let CBSY = chessBoardEle.style.top.split("%"); //棋盘样式的Y轴
  let CBSX = chessBoardEle.style.left.split("%"); //棋盘样式的X轴
  if (selectChessPlaidEle == null) return;
  let CBPCenterJson = JSON.parse(selectChessPlaidEle.getAttribute("center"));
  let CBPH = selectChessPlaidEle.offsetHeight; //棋盘格子的高度
  let CBPW = selectChessPlaidEle.offsetWidth; //棋盘格子的宽度
  let CBPY = Number(CBPCenterJson.Y); //棋盘格子的Y轴
  let CBPX = Number(CBPCenterJson.X); //棋盘格子的X轴
  let CBPOffY = selectChessPlaidEle.offsetTop; //棋盘格子的Y轴
  let CBPOffX = selectChessPlaidEle.offsetLeft; //棋盘格子的X轴

  let X = 0;
  let Y = 0;

  function ratio(max, min, value) {
    return (value - min) / (max - min);
  }

  switch (focus) {
    case FocusType.Minimum:
      break;
    case FocusType.Moderate:
      break;
    case FocusType.ManualKeyboard:
      break;
    case FocusType.ManualMouse:
      break;
    case FocusType.FollowMouse:
      X -= ratio(CBW / 2, CBW / -2, CBPOffX - CBW + CBPW / 2) * 2;
      Y -= ratio(CBH / 2, CBH / -2, CBPOffY - CBH + CBPH / 2) * 2;
      break;
    case FocusType.FollowSelect:
      break;
    default:
      break;
  }
  chessBoardEle.style.top = Y + 50 + "%";
  chessBoardEle.style.left = X + 50 + "%";
};
export const SetCameraConfig = (json) => {
  Object.assign(CameraConfig, json);
};

function ScrollZoom(event) {
  if (Zoom == false) return;
  let view = GetViewEle();
  view.style.transform = `translate(-50%,-50%) scale(${ZoomSize})`;
  event.preventDefault();
  const deltaY = event.deltaY;
  if (deltaY > 0) {
    ZoomSize -= 0.1;
  } else {
    ZoomSize += 0.1;
  }
}
window.addEventListener("wheel", ScrollZoom, { passive: false });
