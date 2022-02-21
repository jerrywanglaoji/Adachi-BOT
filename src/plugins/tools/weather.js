import axios from "axios";

async function weather(msg) {
  const { data } = await axios.get(
    "http://api.k780.com/?app=weather.today&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&cityId=101281101"
  );
  const { result } = data;
  const eatText = `今天${result.citynm}的天气是${result.temperature},相对湿度${result.humidity},${result.wind}${result.winp}`;
  msg.bot.say(msg.sid, eatText, msg.type, msg.uid, true);
}

export { weather };
