import { GetFileJson } from "./GetFile.js";
//引入GetFile.js模块中的GetFileJson函数
const LangTitle = document.getElementById("LangTitle");
const LangJson = { D: {}, P: {} }; //D 默认语言 P 玩家使用的语言  玩家使用的语言缺少(Error)时将使用默认语言
let LangName = "zh_cn"; //使用目前的语言

export const RLangText = (LangText = []) => {
  //重载并应用语言
  SetLang(GetLang());
  if (LangText.length > 1 && LangText == []) {
    let AllText = document.getElementsByClassName("Text"); //获取全部class为"Text"的元素
    for (let i = 0; i < AllText.length; i++) {
      if (AllText[i].getAttribute("langdata")) {
        //检查元素有没有"langdata"属性 有就保存下来后面处理
        LangText[LangText.length] = AllText[i];
      }
    }
  }
  for (let i = 0; i < LangText.length; i++) {
    let LangData = JSON.parse(LangText[i].getAttribute("langdata")); //将属性"langdata"里的字符串JSON转换回JSON
    LangText[i].innerText = NewLangText(LangData["id"], LangData["array"]); //解析并应用文本
  }
};

export const SetLang = (langname) => {
  //更改目前的语言
  localStorage.setItem("LangName", langname);
  LangName = langname;
  LangJson["P"] = GetFileJson(LangName);
  LangTitle.innerText = `Lang>${LangName}`;
};
export const GetLang = () => {
  //返回目前的语言
  return localStorage.getItem("LangName") ?? LangName;
};
export const Language = (LangId) => {
  //判断玩家使用的语言是否可用 不可则使用默认语言
  let d = LangJson.D;
  let p = LangJson.P;
  return p[LangId] ?? d[LangId];
};
export const LangInitialize = () => {
  //初始化
  LangJson["D"] = GetFileJson("zh_cn");
};
export const NewLangText = (LangId, array = []) => {
  //解析属性"langdata"转换后的JSON
  //"LangId"用于定位
  //"array"需要替换的数据 如:["HP > @@@"+(HP变量),"DEF > @@@"+(DEF变量)]
  //HP变量 = 100   DEF变量 = 50
  //执行效果 HP > 100 , DEF > 50
  var LangText = Language(LangId);
  for (let i = 0; i < array.length; i++) {
    let LangTextSplit = array[i].split("@@@"); //split分割
    LangText = LangText.replaceAll(`@${LangTextSplit[0]}@`, LangTextSplit[1]); //replaceAll 用A替换B All=全部
  }
  return LangText;
};
export const NLT = (LangId, array = []) => {
  return NewLangText(LangId, array);
};
export const SettingsLangText = (Ele, LangId, array = []) => {
  //设置语言文本元素class添加"Text" 新增属性"langdata"并设置
  Ele.classList.add("Text");
  Ele.setAttribute(
    "langdata",
    JSON.stringify({
      id: LangId,
      array: array,
    })
  );
  return Ele;
};
