import { GetGameRules } from "./Rule.js";

let chessboardRule;
let chessboard = [];
export const GetChessBoard = () => {
  //获取棋盘
  return chessboard;
};
export const PlayChess = (ChessXY, Player) => {};
export const NewChessBoard = (rule = chessboardRule) => {
  chessboard = [];
  chessboard["All"] = [];
  ExpandChessBoard({ X: rule["MaxX"], Y: rule["MaxY"] });

  //棋盘生成规则
  //固定
  let Fixed = rule["Fixed"];
  if (Fixed) SetChessPlaid(Fixed);

  console.log(chessboard);
};

export const ExpandChessBoard = (max = { X, Y }, CB = chessboard) => {
  //扩展棋盘
  chessboard["lengthAll"] = 0;
  chessboard["Start"] = Math.round(-max["X"] / 2);
  //Math.round 四舍五入
  for (
    let iX = Math.round(-max["X"] / 2);
    iX < Math.round(max["X"] / 2);
    iX++
  ) {
    chessboard[iX] = [];
    chessboard[iX]["Start"] = Math.round(-max["Y"] / 2);
    chessboard[iX]["lengthAll"] = 0;
    chessboard["lengthAll"]++;
    for (
      let iY = Math.round(-max["Y"] / 2);
      iY < Math.round(max["Y"] / 2);
      iY++
    ) {
      chessboard[iX]["lengthAll"]++;
      if (!chessboard[iX][iY]) {
        let cb = { X: iX, Y: iY };
        chessboard["All"].push(cb);
        chessboard[iX][iY] = chessboard["All"][chessboard["All"].length - 1];
      }
    }
  }
};

export const SetChessPlaid = (array = [], CB = chessboard) => {
  //设置棋格子
  for (const plaid of array) {
    CB[plaid["X"]][plaid["Y"]] = plaid;
  }
};
