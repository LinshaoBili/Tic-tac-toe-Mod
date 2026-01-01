import { NewUUID, SessionGetDate, SessionSetDate } from "../Date.js";

export const NumericalButton = (
  TargetEle = document.createElement("p"),
  Data = {
    Numerical: {
      Type: "int",
      Slider: true,
      Value: true,
      Initial: 0,
      Min: 0,
      Max: 5,
    },
  }
) => {
  let isDrag = false;
  let uuid = NewUUID();
  SessionSetDate(uuid, Data);
  let Numerical = Data.Numerical;
  if (Numerical.Value) {
    let Ele = document.createElement("input");
    Ele.classList.add("NumericalButton");
    Ele.classList.add("Value");
    Ele.classList.add(Numerical.Type);
    Ele.setAttribute("uuid", uuid);
    Ele.setAttribute("type", "number");
    Ele.setAttribute("value", "");
    Ele.value = Numerical.Initial;
    Ele.onselectionchange = function () {
      //input发生变化时触发
      if (isDrag) {
        Ele.onblur();
        return;
      }
      if (Ele.value > Numerical.Max) Ele.value = Numerical.Max;
      else if (Ele.value < Numerical.Min) Ele.value = Numerical.Min;
      Update(Ele.value, Ele.parentElement);
    };
    Ele.onblur = function () {
      //拖放结束时触发
      if (Ele.value == "") {
        Ele.value = Numerical.Initial;
      } else {
        if (Numerical.Type == "int") Ele.value = Number(Ele.value).toFixed();
        else Ele.value = Number(Ele.value).toFixed(2);
      }
    };
    TargetEle.appendChild(Ele);
  }
  if (Numerical.Slider) {
    let Ele = document.createElement("main");
    Ele.classList.add("NumericalButton");
    Ele.classList.add("SliderBox");
    Ele.classList.add(Numerical.Type);
    Ele.setAttribute("uuid", uuid);

    let SliderEle = document.createElement("main");
    SliderEle.draggable = true;
    SliderEle.classList.add("Slider");
    SliderEle.setAttribute("uuid", uuid);
    SliderEle.ondrag = function (event) {
      let Numerical = SessionGetDate(uuid).Numerical;
      let w = SliderEle.offsetWidth;
      let mx = SliderEle.parentElement.offsetWidth - w;
      let ex = event.offsetX / mx;
      let x = parseFloat(SliderEle.style.marginLeft) + ex;
      if (x > mx) x = mx;
      else if (x < 0) x = 0;
      let max = Numerical.Max;
      let min = Numerical.Min;
      isDrag = true;
      Update(min + (x / mx) * (max - min), Ele.parentElement, [1]);
      SliderEle.style.marginLeft = x + "px";
    };
    SliderEle.ondragend = function () {
      Ele.parentElement
        .getElementsByClassName("NumericalButton Value")[0]
        .onblur();
      isDrag = false;
    };
    Ele.appendChild(SliderEle);
    TargetEle.appendChild(Ele);
  }
  function Update(params, parentEle = document.createElement("p"), skip = []) {
    let list = [
      parentEle.getElementsByClassName("NumericalButton SliderBox")[0],
      parentEle
        .getElementsByClassName("NumericalButton SliderBox")[0]
        .getElementsByClassName("Slider")[0],
      parentEle.getElementsByClassName("NumericalButton Value")[0],
    ];
    for (let i = 0; i < skip.length; i++) list[skip[i]] = null;
    for (const array of list) {
      if (array == null) continue;
      if (array.value && array.value != params) array.value = params;
      array.setAttribute("numerical", params);
      if (array.classList.contains("Slider")) {
        let uuid = array.getAttribute("uuid");
        let maxW = array.parentElement.offsetWidth;
        let Numerical = SessionGetDate(uuid).Numerical;
        let max = Numerical.Max;
        let min = Numerical.Min;
        let numerical = array.getAttribute("numerical");
        let ml = (numerical - min) / (max - min);
        array.style.marginLeft = ml * (maxW - array.offsetWidth / 2) + "px";
      }
    }
  }
};
