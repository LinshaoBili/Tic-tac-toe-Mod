import { GetDate, SetDate } from "./Date.js";
import { GetButtonDate, SettingsButton } from "./Button.js";
import { EleSetXY, NewEle } from "./Element.js";
import { SettingsLangText, RLangText, SetLang } from "./Language.js";
import { GetMainEle, GetModeCode, RModeCode, SetModeName } from "./Start.js";
import { ModeList } from "./Mode/Mode.js";
import LangList from "../lang/list.js";

export const MainMenuUI = () => {
  //生成开始菜单
  let id = "MainMenuUI";
  if (document.getElementById(id)) {
    UIR(document.getElementById(id));
    return;
  }
  let list = document.createElement("div");
  //createElement新建一个元素为div <div></div>
  list.id = id;
  //定义id
  let MMListArray = [
    { id: "choose_mode", array: [], click: StartModeUI },
    // { id: "rule", array: [], click: null },
    { id: "settings", array: [], click: SettingsUI },
    { id: "language", array: [], click: LanguageUI },
  ];
  for (const array of MMListArray) {
    let textEle = document.createElement("p");
    //新建元素为p
    textEle = SettingsLangText(textEle, array.id, array.array);
    //调用Language.js 的SettingsLangText函数
    if (array.click != null) textEle.onclick = array.click;
    //设置点击事件
    list.appendChild(textEle);
    //把新元素p放进元素div里
  }
  GetMainEle().appendChild(list);
  //把元素div放进元素main里
  RLangText(list.querySelectorAll(".Text"));
  //调用Language.js 的RLangText 更新元素
};
export const StartModeUI = () => {
  let id = "StartModeUI";
  console.log(id);
  if (document.getElementById(id)) {
    UIR(document.getElementById(id));
    return;
  }
  MainMenuUI();
  let Ele = document.createElement("div");
  Ele.id = id;
  Ele.style.animation = `UIOff 0.25s reverse`;
  let list = [
    { id: "mode", array: [], type: "Title", target: null },
    {
      type: "Ele",
      target: null,
      text: false,
      class: ["MapList"],
    },
    {
      id: "exit",
      array: [],
      type: "LText",
      target: null,
      class: ["exit"],
    },
    {
      id: "start",
      array: [],
      type: "LText",
      target: null,
      class: ["start"],
    },
  ];
  let EleList = NewButtonEle(list);
  for (const array of EleList) {
    Ele.appendChild(array);
  }
  Ele.addEventListener("animationend", function () {
    Ele.style.animation = "";
  });

  let modeList = ModeList();
  let listEle = Ele.getElementsByClassName("Ele MapList")[0];
  for (const array of modeList) {
    let modeEle = NewEle("main");
    modeEle.classList.add("MapUI");
    modeEle.classList.add(array.id);
    modeEle.onclick = function () {
      SetModeName(array.url);
      RModeCode();
    };
    modeEle = SettingsLangText(modeEle, array.id, []);

    listEle.appendChild(modeEle);
  }
  let exitEle = Ele.getElementsByClassName("exit")[0];
  exitEle.onclick = function () {
    MainMenuUI();
    StartModeUI();
    exitEle.onclick = null;
    startEle.onclick = null;
    //防止多次点击
    sessionStorage.clear();
    //清空临时数据
  };
  let startEle = Ele.getElementsByClassName("start")[0];
  startEle.onclick = function () {
    StartModeUI();
    exitEle.onclick = null;
    startEle.onclick = null;
    GetModeCode()["ChessBoard"]();
  };

  GetMainEle().appendChild(Ele);
  RLangText(Ele.querySelectorAll(".Text"));
};
export const SettingsUI = () => {
  //设置页面
  let id = "SettingsUI";
  console.log(id);
  if (document.getElementById(id)) {
    //关闭页面
    UIR(document.getElementById(id));
    return;
  }
  MainMenuUI();
  //关闭主菜单
  let Ele = document.createElement("div");
  Ele.id = id;
  Ele.style.animation = `UIOff 0.25s reverse`;
  let list = [
    { id: "settings", array: [], type: "Title", target: null },
    { id: "speed_game_logo", array: [], type: "Bool", target: "speedGameLogo" },
    {
      id: "test",
      array: [],
      type: "IntNumerical",
      target: "test",
      Slider: true,
      Value: true,
      Initial: 1,
      Min: -1,
      Max: 2,
    },
    {
      id: "test",
      array: [],
      type: "FloatNumerical",
      target: "test",
      Slider: true,
      Value: true,
      Initial: 0,
      Min: -1,
      Max: 5,
    },
  ];
  let EleList = NewButtonEle(list);
  for (const array of EleList) {
    Ele.appendChild(array);
  }
  Ele.addEventListener("animationend", function () {
    Ele.style.animation = "";
  });

  let saveEle = SettingsLangText(NewEle("p"), "save");
  saveEle.classList.add("Save");
  saveEle.onclick = function () {
    let date = { settings: {} };
    let buttonEleList = Ele.querySelectorAll(
      ".Bool,.IntNumerical,.FloatNumerical"
    );
    //querySelectorAll用css的方式获取元素 All全部
    for (const array of buttonEleList) {
      let id = JSON.parse(
        array.getElementsByClassName("Text")[0].getAttribute("langdata")
      ).id;
      date.settings[id] = GetButtonDate(array);
    }
    SetDate(date);
    exit();
  };

  let exitEle = SettingsLangText(NewEle("p"), "exit");
  exitEle.classList.add("Exit");
  exitEle.onclick = function () {
    exit();
  };

  function exit() {
    MainMenuUI();
    SettingsUI();
    exitEle.onclick = null;
    saveEle.onclick = null;
    //防止多次点击
    sessionStorage.clear();
    //清空临时数据
  }

  Ele.appendChild(saveEle);
  Ele.appendChild(exitEle);
  GetMainEle().appendChild(Ele);
  RLangText(Ele.querySelectorAll(".Text"));
};

export const LanguageUI = () => {
  //设置页面
  let id = "LanguageUI";
  console.log(id);
  if (document.getElementById(id)) {
    //关闭页面
    UIR(document.getElementById(id));
    return;
  }
  MainMenuUI();
  //关闭主菜单
  let Ele = document.createElement("div");
  Ele.id = id;
  Ele.style.animation = `UIOff 0.25s reverse`;

  let list = [
    { id: "language", array: [], type: "Title", target: null },
    { type: "Ele", target: null, text: false, class: ["LangList"] },
    {
      id: "exit",
      array: [],
      type: "LText",
      target: null,
      class: ["exit"],
    },
    {
      id: "save",
      array: [],
      type: "LText",
      target: null,
      class: ["save"],
    },
  ];
  let EleList = NewButtonEle(list);
  for (const array of EleList) {
    Ele.appendChild(array);
  }

  Ele.addEventListener("animationend", function () {
    Ele.style.animation = "";
  });

  let listEle = Ele.getElementsByClassName("LangList")[0];
  for (const array of LangList) {
    let langEle = NewEle("p");
    langEle.innerHTML = array.name;
    langEle.onclick = function () {
      SetLang(array.id);
      RLangText(Ele.querySelectorAll(".Text"));
    };
    listEle.appendChild(langEle);
  }
  let exitEle = Ele.getElementsByClassName("exit")[0];
  let saveEle = Ele.getElementsByClassName("save")[0];
  saveEle.onclick = function () {
    MainMenuUI();
    LanguageUI();
    RLangText();
    exitEle.onclick = null;
    saveEle.onclick = null;
  };
  exitEle.onclick = function () {
    MainMenuUI();
    LanguageUI();
    exitEle.onclick = null;
    saveEle.onclick = null;
    //防止多次点击
  };

  GetMainEle().appendChild(Ele);
  RLangText(Ele.querySelectorAll(".Text"));
};

export const NewButtonEle = (list = []) => {
  let EleList = [];
  for (const array of list) {
    let textEle = document.createElement("div");
    //新建元素为p
    textEle.classList.add(array.type);
    if (array.text != false) {
      let textP = NewEle("p");
      textP = SettingsLangText(textP, array.id, array.array);
      textEle.appendChild(textP);
    }
    if (array.class)
      for (const MapClass of array.class) {
        textEle.classList.add(MapClass);
      }
    if (array.type == "Text") {
      //可能发生Error
    } else if (array.type == "Title" || array.type == "LText") {
    } else if (array.type == "Ele") {
    } else {
      let settingsName = "settings";
      SettingsButton(textEle, {
        Type: array.type,
        Bool: array.Bool ?? GetDate()[settingsName][array.id] ?? false,
        Numerical: {
          Slider: array.Slider,
          Value: array.Value,
          Initial: array.Initial ?? GetDate()[settingsName][array.id] ?? 0,
          Min: array.Min,
          Max: array.Max,
        },
      });
    }

    EleList.push(textEle);
    //把新元素p放进元素div里
  }
  return EleList;
};

function UIR(UIEle, time = 0.5) {
  UIEle.addEventListener("animationend", function () {
    UIEle.remove();
  });
  UIEle.style.animation = `UIOff ${time}s normal`;
}
