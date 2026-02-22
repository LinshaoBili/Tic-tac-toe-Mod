let chessBoardRule;
let chessBoard = [];
let selectChessPlaid = null;
export const GetChessBoard = () => {
  //获取棋盘
  return chessBoard;
};
export const PlayChess = (ChessXY, Name = null, Replace = false) => {
  //下棋
  if (ChessXY == null) return;

  function T() {
    //设置玩家的棋子
    chessBoard[ChessXY.X][ChessXY.Y]["ChessPiece"] = Name;
    Replace = true;
  }

  if (Replace == true) T();
  else {
    let ChessPiece = chessBoard[ChessXY.X][ChessXY.Y]["ChessPiece"];
    if (ChessPiece == null) T();
    else Replace = false;
  }
  console.log(chessBoard);
  return Replace;
};
export const NewChessBoard = (rule = chessBoardRule) => {
  chessBoard = [];
  chessBoard["All"] = [];
  ExpandChessBoard({ X: rule.MaxX, Y: rule.MaxY });

  //棋盘生成规则
  //固定
  let Fixed = rule["Fixed"];
  if (Fixed) SetChessPlaid(Fixed);

  console.log(chessBoard);
};
export const ExpandChessBoard = (max = { X, Y }, CB = chessBoard) => {
  //扩展棋盘
  chessBoard["lengthAll"] = 0;
  chessBoard["Start"] = Math.round(-max["X"] / 2);
  //Math.round 四舍五入
  for (
    let iX = Math.round(-max["X"] / 2);
    iX < Math.round(max["X"] / 2);
    iX++
  ) {
    chessBoard[iX] = [];
    chessBoard[iX]["Start"] = Math.round(-max["Y"] / 2);
    chessBoard[iX]["lengthAll"] = 0;
    chessBoard["lengthAll"]++;
    for (
      let iY = Math.round(-max["Y"] / 2);
      iY < Math.round(max["Y"] / 2);
      iY++
    ) {
      chessBoard[iX]["lengthAll"]++;
      if (!chessBoard[iX][iY]) {
        let cb = { X: iX, Y: iY };
        chessBoard["All"].push(cb);
        chessBoard[iX][iY] = chessBoard["All"][chessBoard["All"].length - 1];
      }
    }
  }
};

export const SetChessPlaid = (array = [], CB = chessBoard) => {
  //设置棋格子
  for (const plaid of array) {
    CB[plaid.X][plaid.Y] = plaid;
  }
};

export const SelectChessPlaid = (ele = null) => {
  selectChessPlaid = ele;
};
export const GetSelectChessPlaid = () => {
  return selectChessPlaid;
};
