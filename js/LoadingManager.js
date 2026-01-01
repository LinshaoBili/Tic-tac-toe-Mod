import { GetDate } from "./Date.js";
import { NewEle } from "./Element.js";
import { RLangText, SettingsLangText } from "./Language.js";
import { MainMenuUI } from "./Menu.js";
import { GetMainEle } from "./Start.js";

export const GameLogoAnimation = () => {
  //打开网页时的游戏名等
  let time = "";
  let id = "GameLogoA";
  let ele = SettingsLangText(NewEle("div", id, document.body), "game_name");
  ele.addEventListener("animationend", function () {
    //addEventListener 给元素添加事件 animationend是CSS 动画结束播放时触发
    ele.classList.remove("ON");
    GetMainEle().style.opacity = "1";
    //opacity是透明度 1 无透明 0 看不见
    MainMenuUI();
  });
  let a = GetDate().settings.speed_game_logo.toLowerCase();
  if (a === "false") {
    time = 3;
  } else {
    time = 1;
  }
  setTimeout(() => (ele.style.animation = `GameLogoAK ${time}s`), 100);
  RLangText([ele]);
  ele.classList.add("ON");
};
