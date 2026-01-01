export default {
  //基础玩法配置
  PlayerMin: 2, //最小玩家数
  PlayerMax: 2, //最大玩家数
  MoveNumber: 1, //下棋次数
  WaitingTime: 60, //最大等待下棋时间s
  Cover: false, //覆盖

  //棋盘配置
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
