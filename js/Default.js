import { LangInitialize, RLangText } from "./Language.js";
import { GameLogoAnimation } from "./LoadingManager.js";
import { RModeRules } from "./Rule.js";
import { SKey } from "./ShortcutKey.js";

document.addEventListener("keydown", SKey);
function Initialize() {
  //进入网页时初始化
  LangInitialize();
  //初始化语言
  RModeRules();
  //更新游戏规则
  RLangText();
  //更新文本
  setTimeout(() => GameLogoAnimation(), 100);
  //网页进入时显示游戏名等
}

Initialize();
window.onresize = function () {
  //onresize 窗口或框架被重新调整大小时触发
};
