import { NewUUID } from "./Date.js";
import { NewLangText, NLT } from "./Language.js";
import { ModeList } from "./Mode/Mode.js";
export const StatusType = Object.freeze({
  Started: { Started: "Started" },
  idle: { idle: "idle" },
});
let status = StatusType.idle;
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
export const GetStatus = () => {
  return status;
};
export const SetStatus = (type = StatusType.idle) => {
  status = type;
  switch (type) {
    case StatusType.Started:
      view.style.opacity = 1;
      view.style.transition = "0.25s";
      break;
    case StatusType.idle:
      view.style.opacity = 0;
      view.style.transition = "0.5s";
      break;

    default:
      break;
  }
};
export const AddCSS = (href = null, uuid = NewUUID()) => {
  if (href == null) return;
  const existingLinks = document.querySelectorAll(`link[href="${href}"]`);
  if (existingLinks.length > 0) {
    return existingLinks[0];
  }
  let linkEle = document.createElement("link");
  linkEle.rel = "stylesheet";
  linkEle.media = "print";
  linkEle.type = "text/css";
  linkEle.href = href;
  linkEle.onload = () => {
    linkEle.media = "all";
    linkEle.id = uuid;
  };
  document.head.appendChild(linkEle);
  return uuid;
};
export const DelCSS = (id) => {
  let cssEleList = document.head.querySelectorAll(`${id}`);
  for (const ele of cssEleList) {
    ele.remove();
  }
};
