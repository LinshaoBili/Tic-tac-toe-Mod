import LSRules from "./Mode/LS/GameRules.js";
import OriginalRules from "./Mode/Original/GameRules.js";
import DefRules from "./GameRules.js";
import { NLT } from "./Language.js";
import { GetModeName } from "./Start.js";
let gameModeRules = {};
export const RModeRules = () => {
  //更新游戏规则
  switch (GetModeName()) {
    case null:
      break;
    case "LS":
      gameModeRules = LSRules;
      break;
    case "Original":
      gameModeRules = OriginalRules;
      break;
    default:
      break;
  }
};
export const GetGameRules = (id) => {
  let rule = null;
  if (gameModeRules[id]) {
    rule = gameModeRules[id];
  } else if (DefRules[id]) {
    rule = DefRules[id];
  } else {
    //无规则处理
    let errorText = `${NLT("error")} ${NLT("error_missing")} ${NLT(
      "t_rule"
    )} "${id}"`;
    console.error(errorText);
    rule = undefined;
  }
  return rule;
};
export const SetRules = () => {};
