import { RLangText } from "./Language.js";

let Key = {
  //键盘快捷键
  Rlang: "p",
};

export const SKey = (event) => {
  //按下快捷键处理
  switch (event.key) {
    case Key["Rlang"]:
      RLangText();
      //刷新文本
      break;

    default:
      break;
  }
};
