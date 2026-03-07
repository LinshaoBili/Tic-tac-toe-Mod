import { NewEle } from "../../Element.js";
import { RLangText, SettingsLangText } from "../../Language.js";
import { GetViewEle } from "../../Start.js";
import { AddPlayer, GetSaveData } from "./Data.js";

export const MenuUI = () => {
  //游戏前设置界面
  let LangTextEleList = [];
  let menuUiEle = NewEle("div", "MenuUI", GetViewEle());
  let menuUiLeftEle = NewEle("div", "MenuUI-left", menuUiEle);
  let menuUiRightEle = NewEle("div", "MenuUI-right", menuUiEle);
  menuUiRightEle.classList.add("Hide");
  let menuUiLeftTitleEle = NewEle("h1", "MenuUI-left-title", menuUiLeftEle);
  let menuUiLeftTitleText = SettingsLangText(
    NewEle("p", "", menuUiLeftTitleEle),
    "game_settings",
  );
  function SelectedSettings(Ele) {
    menuUiRightEle.classList.remove("Hide");
    if (Ele.classList.contains("Selected")) {
      return false;
    }
    for (const Ele of menuUiRightEle.children) {
      if (Ele.classList.contains("absolute") || Ele.classList.contains("Hide"))
        continue;
      let width = Ele.offsetWidth;
      let height = Ele.offsetHeight;
      Ele.classList.add("absolute");
      setTimeout(() => {
        Ele.classList.add("Hide");
        Ele.style.width = width + "px";
        Ele.style.height = height + "px";
        Ele.addEventListener("transitionend", function () {
          Ele.remove();
        });
      }, 0);
    }
    Ele.classList.add("Selected");
    for (const Sibling of Ele.parentElement.children) {
      if (Sibling !== Ele) {
        Sibling.classList.remove("Selected");
      }
    }
    return true;
  }
  let UiLeftSettingsList = [
    {
      LangId: "player_settings",
      Class: ["PlayerSettings", "SettingsUI"],
      Array: [],
      Click: function () {
        if (SelectedSettings(this)) PlayerUI(menuUiRightEle);
      },
    },
    {
      LangId: "map_settings",
      Class: ["MapSettings", "SettingsUI"],
      Array: [],
      Click: function () {
        if (SelectedSettings(this)) {
        }
      },
    },
  ];
  for (const LeftSettingsEle of UiLeftSettingsList) {
    let settingsEle = NewEle("div", "", menuUiLeftEle);
    settingsEle.classList.add(...LeftSettingsEle.Class);
    let textEle = SettingsLangText(
      NewEle("p", "", settingsEle),
      LeftSettingsEle.LangId,
    );
    settingsEle.onclick = LeftSettingsEle.Click;
    LangTextEleList.push(textEle);
  }
  LangTextEleList.push(menuUiLeftTitleText);
  RLangText(LangTextEleList);
};
function PlayerUI(RightEle) {
  AddPlayer();

  let LangTextEleList = [];
  let uiId = "PlayerSettingsUI";
  let ele = NewEle("div", uiId, RightEle);
  ele.classList.add("Hide");
  setTimeout(() => {
    ele.classList.remove("Hide");
  }, 0);
  let playerNumUiEle = NewEle("div", "PlayerNum", ele);
  let playerNumText = SettingsLangText(
    NewEle("p", "", playerNumUiEle),
    "player_settings_number",
    [`Num@@@${GetSaveData().Player.length}`],
  );
  let playerListEle = NewEle("div", "PlayerList", ele);
  PlayerList(playerListEle);
  LangTextEleList.push(playerNumText);
  RLangText(LangTextEleList);
}
function PlayerList(Ele) {
  let LangTextEleList = [];
  let playerList = GetSaveData().Player;
  for (const PlayerData of playerList) {
    let playerEle = NewEle("div", "", Ele);
    playerEle.classList.add(...["PlayerList-item"]);
    let playerName = SettingsLangText(
      NewEle("p", "", playerEle),
      "player_settings_name",
      [`name@@@${PlayerData.name}`],
    );
    LangTextEleList.push(playerName);
  }
  RLangText(LangTextEleList);
}
