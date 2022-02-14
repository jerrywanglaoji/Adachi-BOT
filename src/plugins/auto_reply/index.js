import { checkAuth } from "../../utils/auth.js";
import { hasEntrance } from "../../utils/config.js";

function do_auto_reply_chouhai(msg) {
  const message = `臭嗨`;
  msg.bot.say(msg.sid, message, msg.type, msg.uid);
}

function do_auto_reply_jishi(msg) {
  const message = `问就是九点和周末`;
  msg.bot.say(msg.sid, message, msg.type, msg.uid);
}

function do_auto_reply_xiaci(msg) {
  const message = `下次一定`;
  msg.bot.say(msg.sid, message, msg.type, msg.uid);
}

function do_auto_reply_bba(msg) {
  const message = `你先来一个话题`;
  msg.bot.say(msg.sid, message, msg.type, msg.uid);
}

async function Plugin(msg) {
  switch (true) {
    case hasEntrance(msg.text, "auto_reply", "auto_reply_chouhai"):
      if (false !== checkAuth(msg, "auto_reply")) {
        do_auto_reply_chouhai(msg);
      }
      break;
    case hasEntrance(msg.text, "auto_reply", "auto_reply_jishi"):
      if (false !== checkAuth(msg, "auto_reply")) {
        do_auto_reply_jishi(msg);
      }
      break;
    case hasEntrance(msg.text, "auto_reply", "auto_reply_xiaci"):
      if (false !== checkAuth(msg, "auto_reply")) {
        do_auto_reply_xiaci(msg);
      }
      break;
    case hasEntrance(msg.text, "auto_reply", "auto_reply_bba"):
      if (false !== checkAuth(msg, "auto_reply")) {
        do_auto_reply_bba(msg);
      }
      break;
  }
}

export { Plugin as run };
