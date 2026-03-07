function DefaultSaveData() {
  return JSON.parse(
    JSON.stringify({
      Player: [],
      
    }),
  );
}
let SaveData = DefaultSaveData();
export const GetSaveData = () => {
  return SaveData;
};
