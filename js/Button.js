import { NumericalButton } from "./Button/Numerical.js";
import { BoolButton } from "./Button/Bool.js";

export const SettingsButton = (
  Ele,
  Data = {
    Type: null,
    Bool: false,
    Numerical: {
      Type: "int",
      Slider: false,
      Value: false,
      Initial: 0,
      Min: 0,
      Max: 5,
    },
  }
) => {
  //调用对应的代码
  switch (Data.Type) {
    case "Bool":
      BoolButton(Ele, Data);
      break;
    case "IntNumerical":
      Data.Numerical.Type = "int";
      NumericalButton(Ele, Data);
      break;
    case "FloatNumerical":
      Data.Numerical.Type = "float";
      NumericalButton(Ele, Data);
      break;

    default:
      break;
  }
};

export const isButton = (ele) => {
  let buttonList = ["Bool", "IntNumerical", "FloatNumerical"];
  for (const array of buttonList) {
    if (ele.classList.contains(array)) {
      return array;
    }
  }
  return null;
};

export const GetButtonDate = (target) => {
  switch (isButton(target)) {
    case "Bool":
      return target
        .getElementsByClassName("BoolButton")[0]
        .getAttribute("Bool");
    case "IntNumerical":
      return target
        .getElementsByClassName("NumericalButton Value")[0]
        .getAttribute("numerical");
    case "FloatNumerical":
      return target
        .getElementsByClassName("NumericalButton Value")[0]
        .getAttribute("numerical");

    default:
      break;
  }
  return;
};
