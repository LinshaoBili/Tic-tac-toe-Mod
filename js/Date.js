let date = {
  //默认的游戏数据
  settings: {
    //设置
    speed_game_logo: false,
    //快速播放网页打开时的游戏名
  },
};
export const SetDate = (date, target = date) => {
  //更新游戏数据
  Object.assign(target, date);
  //更新数据 新的掩盖旧的 数据
  localStorage.setItem("date", JSON.stringify(date));
  //数据写进本地数据保存防止下次启动网页丢失设置等
};

export const GetDate = () => {
  //获取并更新数据
  let Date = JSON.parse(localStorage.getItem("date"));
  if (Date == null) {
    SetDate(date);
    Date = date;
  }
  return Date;
};
export const SessionSetDate = (id, target) => {
  //临时数据
  sessionStorage.setItem(id, JSON.stringify(target));
  //sessionStorage临时的本地数据 在浏览器关闭后清空
};
export const SessionGetDate = (id) => {
  return JSON.parse(sessionStorage.getItem(id));
};
export const NewUUID = () => {
  //UUID
  return crypto.randomUUID();
};
