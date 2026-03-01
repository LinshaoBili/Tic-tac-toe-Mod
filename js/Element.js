import { GetChessBoard, SelectChessPlaid } from "./ChessBoard.js";
import { GetModeCode, GetViewEle } from "./Start.js";
import { Focus } from "./Camera.js";

export const NewEle = (type = "p", id = "", appendChild = null) => {
  //快捷新建一个元素
  var ele = document.createElement(type);
  ele.id = id;
  if (appendChild != null) {
    appendChild.appendChild(ele);
  }
  // if (id != "" && appendChild != null) {
  //   return document.getElementById(id);
  // }
  return ele;
};
export const NewChessBoardEle = (chessboard = GetChessBoard()) => {
  //新建一个棋盘
  let cbList = [];
  for (let iX = chessboard["Start"]; iX < chessboard.length; iX++) {
    let eleX = document.createElement("main");
    eleX.classList.add("ChessBoardX");
    for (let iY = chessboard[iX]["Start"]; iY < chessboard[iX].length; iY++) {
      let eleP = NewChessPlaid(eleX);
      //调用NewChessPlaid快捷新建棋盘格子
      eleP.setAttribute("Plaid", JSON.stringify({ X: iX, Y: iY }));
      //把格子的 相关数据 转换为 字符串 写进 元素属性 "Plaid"里
      //<p "Plaid"=字符串数据></p>
      cbList.push(eleP);
    }
    GetViewEle().appendChild(eleX);
  }
  return cbList;
};

export const EleSetXY = (list = []) => {
  for (const array of list) {
    array.setAttribute(
      "center",
      JSON.stringify({
        X: array.getBoundingClientRect().left,
        Y: array.getBoundingClientRect().top,
      }),
    );
  }
};
export const NewChessPlaid = (appendChild = null) => {
  //新建棋盘小格子
  var ele = document.createElement("main");
  ele.classList.add("Plaid");
  ele.onmouseenter = function () {
    SelectChessPlaid(ele);
    GetModeCode()["MouseEnterChessPlaid"](ele);
  };
  ele.onmouseleave = function () {
    SelectChessPlaid();
    GetModeCode()["MouseLeaveChessPlaid"](ele);
  };
  ele.onclick = function () {
    GetModeCode()["ClickChessPlaid"](ele);
  };
  if (appendChild != null) {
    appendChild.appendChild(ele);
  }
  return ele;
};
export const GetChessPlaidEle = () => {
  let view = GetViewEle();
  let plaidEleList = {};
  for (const eleX of view.children) {
    if (!eleX.classList.contains("ChessBoardX")) break;
    for (const ele of eleX.children) {
      let plaid = JSON.parse(ele.getAttribute("plaid"));
      if (plaidEleList[`${plaid.X}`] == null) plaidEleList[`${plaid.X}`] = {};
      plaidEleList[`${plaid.X}`][`${plaid.Y}`] = ele;
    }
  }
  return plaidEleList;
};
