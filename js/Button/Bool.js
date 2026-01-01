export const BoolButton = (
  TargetEle = document.createElement("p"),
  Data = { Bool: false }
) => {
  let Bool = Data.Bool;
  let Ele = document.createElement("main");
  Ele.classList.add("BoolButton");
  Ele.classList.add(Bool);
  Ele.setAttribute("Bool", Bool);
  Ele.onclick = function () {
    if (JSON.parse(Ele.getAttribute("Bool"))) {
      Ele.classList.replace(true, false);
      Ele.setAttribute("Bool", false);
    } else {
      Ele.classList.replace(false, true);
      Ele.setAttribute("Bool", true);
    }
  };
  TargetEle.appendChild(Ele);
};
