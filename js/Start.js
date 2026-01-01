import { NewLangText, NLT } from "./Language.js";
import { ModeList } from "./Mode/Mode.js";
let mode = ModeList()[0].url;
let main = document.getElementById("main");
let view = document.getElementById("view");
let modeCode = null;
export const GetModeName = () => {
  //获取模式名
  return mode;
};
export const SetModeName = (name) => {
  for (const array of ModeList()) {
    if (array.url == name) {
      mode = name;
      return;
    }
  }
  console.log(NewLangText("error_mode_not_found", [`name@@@${name}`]));
  console.log(NewLangText("error_mode_restore", [`name@@@${mode}`]));
};
export const GetViewEle = () => {
  return view;
};
export const GetMainEle = () => {
  return main;
};
export const GetModeCode = () => {
  return modeCode;
};
export const RModeCode = () => {
  import(`./Mode/${mode}/GameRules.js`)
    .then((modeule) => {
      modeCode = modeule;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log(modeCode);
};
