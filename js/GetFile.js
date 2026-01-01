import zh_cn from "../lang/zh_cn.js";
import en_us from "../lang/en_us.js";
//引入语言文件

//export让这个函数可以被其他模块引入
export const GetFileJson = (FileName) => {
  //字符串引导
  let json;
  switch (FileName) {
    case "zh_cn":
      json = zh_cn;
      break;
    case "en_us":
      json = en_us;
      break;
  }
  return json;
};
