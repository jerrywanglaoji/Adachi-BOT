import { checkAuth } from "#utils/auth";
import { hasEntrance } from "#utils/config";
import { feedback } from "./feedback.js";
import { image } from "./image.js";
import { menu } from "./menu.js";
import { prophecy } from "./prophecy.js";
import { quote } from "./quote.js";
import { roll } from "./roll.js";
import { weather } from "./weather.js";

async function Plugin(msg) {
  switch (true) {
    case hasEntrance(msg.text, "tools", "menu"):
      if (false !== checkAuth(msg, "menu")) {
        menu(msg);
      }
      break;
    case hasEntrance(msg.text, "tools", "prophecy"):
      if (false !== checkAuth(msg, "prophecy")) {
        prophecy(msg);
      }
      break;
    case hasEntrance(msg.text, "tools", "roll"):
      if (false !== checkAuth(msg, "roll")) {
        roll(msg);
      }
      break;
    case hasEntrance(msg.text, "tools", "quote"):
      if (false !== checkAuth(msg, "quote")) {
        quote(msg);
      }
      break;
    case hasEntrance(msg.text, "tools", "feedback"):
      if (false !== checkAuth(msg, "feedback")) {
        feedback(msg);
      }
      break;
    case hasEntrance(msg.text, "tools", "help"):
      msg.bot.say(msg.sid, global.command.usage, msg.type, msg.uid, false, "\n");
      break;
    case hasEntrance(msg.text, "tools", "master"):
      msg.bot.say(msg.sid, global.master.usage, msg.type, msg.uid, false, "\n");
      break;
    case hasEntrance(msg.text, "tools", "weather"):
      if (false !== checkAuth(msg, "weather")) {
        weather(msg);
      }
      break;
    case hasEntrance(msg.text, "tools", "image"):
      if (false !== checkAuth(msg, "image")) {
        image(msg);
      }
      break;
  }
}

export { Plugin as run };
