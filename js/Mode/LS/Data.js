function DefaultSaveData() {
  return JSON.parse(
    JSON.stringify({
      Player: [],
      PlayerNum: { Max: 4, Min: 2 },
    }),
  );
}
let SaveData = DefaultSaveData();
export const GetSaveData = () => {
  return SaveData;
};
export const AddPlayer = (data = { name: null }) => {
  if (data.name == null) data.name = `Player_${SaveData.Player.length + 1}`;
  SaveData.Player.push(data);
};
