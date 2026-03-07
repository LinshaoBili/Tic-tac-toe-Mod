let data = {
  //默认的游戏数据
  settings: {
    //设置
    speed_game_logo: false,
    //快速播放网页打开时的游戏名
  },
};
export const SetData = (data, target = data) => {
  //更新游戏数据
  Object.assign(target, data);
  //更新数据 新的掩盖旧的 数据
  localStorage.setItem("data", JSON.stringify(data));
  //数据写进本地数据保存防止下次启动网页丢失设置等
};

export const GetData = () => {
  //获取并更新数据
  let Data = JSON.parse(localStorage.getItem("data"));
  if (Data == null) {
    SetData(data);
    Data = data;
  }
  return Data;
};
export const SessionSetData = (id, target) => {
  //临时数据
  sessionStorage.setItem(id, JSON.stringify(target));
  //sessionStorage临时的本地数据 在浏览器关闭后清空
};
export const SessionGetData = (id) => {
  return JSON.parse(sessionStorage.getItem(id));
};
export const NewUUID = () => {
  //UUID
  return crypto.randomUUID();
};
