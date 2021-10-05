import fetch from "node-fetch";
import { Mutex } from "../../utils/mutex.js";

const mutex = new Mutex();

async function Plugin(Message, bot) {
  let msg = Message.raw_message;
  let userID = Message.user_id;
  let groupID = Message.group_id;
  let type = Message.type;
  let name = Message.sender.nickname;
  let sendID = "group" === type ? groupID : userID;
  let headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
  };
  const response = await fetch("https://mao.coolrc.workers.dev/", {
    method: "POST",
    headers: headers,
  });

  if (200 === response.status) {
    let { quote, from } = await response.json();
    return await bot.sendMessage(sendID, `${quote}\n${from}`, type, userID);
  }

  await bot.sendMessage(sendID, "伟大的升华！", type, userID);
}

async function Wrapper(Message, bot) {
  try {
    //await mutex.acquire();
    await Plugin(Message, bot);
  } catch (e) {
    bot.logger.error(e);
  } finally {
    //mutex.release();
  }
}

export { Wrapper as run };
