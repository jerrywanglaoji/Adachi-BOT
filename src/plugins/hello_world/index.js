import { checkAuth } from "../../utils/auth.js";
import { hasEntrance } from "../../utils/config.js";

function doHelloWorld(msg) {
  const message = `this is hello world, ${msg.name} (${msg.uid}) !`;
  msg.bot.say(msg.sid, message, msg.type, msg.uid);
}

async function Plugin(msg) {
  switch (true) {
    case hasEntrance(msg.text, "hello_world", "hello_world"):
      if (false !== checkAuth(msg, "hello_world")) {
        doHelloWorld(msg);
      }
      break;
  }
}

export { Plugin as run };
