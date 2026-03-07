import { NewEle } from "../../Element.js";
import { RLangText, SettingsLangText } from "../../Language.js";
import { GetViewEle } from "../../Start.js";

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
      Ele.classList.add("Hide");
      Ele.addEventListener("transitionend", function () {
        Ele.remove();
      });
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
  let uiId = "PlayerSettingsUI";
  let ele = NewEle("div", uiId, RightEle);
  ele.classList.add("Hide");
  setTimeout(() => {
    ele.classList.remove("Hide");
  }, 0);
}
