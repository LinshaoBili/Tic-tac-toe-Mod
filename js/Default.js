import { NewChessBoard } from "./ChessBoard.js";
import { SetDate, GetDate } from "./Date.js";
import { NewChessBoardEle, NewChessPlaid } from "./Element.js";
import {
  LangInitialize,
  RLangText,
  SetLang,
  SettingsLangText,
} from "./Language.js";
import { GameLogoAnimation } from "./LoadingManager.js";
import { GetGameRules, RModeRules } from "./Rule.js";
import { SKey } from "./ShortcutKey.js";
import { SetModeName } from "./Start.js";

document.addEventListener("keydown", SKey);
function Initialize() {
  //进入网页时初始化
  LangInitialize();
  //初始化语言
  SetLang("zh_cn");
  //设置语言
  RLangText();
  //更新文本
  setTimeout(() => GameLogoAnimation(), 100);
  //网页进入时显示游戏名等
  RModeRules();
  //更新游戏规则

}

Initialize();
window.onresize = function () {
  //onresize 窗口或框架被重新调整大小时触发
};
function Code(name) {
  
}