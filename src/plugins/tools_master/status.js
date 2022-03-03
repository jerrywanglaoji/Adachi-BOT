import { execSync } from "child_process";
import lodash from "lodash";
import moment from "moment";
import path from "path";
import pb from "pretty-bytes";
import puppeteer from "puppeteer";
import si from "systeminformation";
import { du } from "#utils/file";

let cpu;
let os;
let versions;

si.cpu().then((c) => (cpu = c));
si.osInfo().then((c) => (os = c));
si.versions("node, npm").then((c) => (versions = c));

const browserVer = execSync([puppeteer.executablePath(), "--version"].join(" ")).toString().trim();

async function status(msg = {}) {
  const unknown = "未知";
  // FIXME 多 QQ 抢占时 load.currentLoad 有概率为 undefined
  const load = await si.currentLoad();
  const mem = await si.mem();
  const time = await si.time();

  const cpuBrand = lodash.hasIn(cpu, "brand") ? cpu.brand : unknown;
  const cpuManufacturer = lodash.hasIn(cpu, "manufacturer") ? cpu.manufacturer : unknown;
  const cpuSpeed = lodash.hasIn(cpu, "speed") ? cpu.speed : unknown;
  const osArch = lodash.hasIn(os, "arch") ? os.arch : unknown;
  const osDistro = lodash.hasIn(os, "distro") ? os.distro : unknown;
  const osKernel = lodash.hasIn(os, "kernel") ? os.kernel : unknown;
  const osPlatform = lodash.hasIn(os, "platform") ? os.platform : unknown;
  const versionsNodeJS = lodash.hasIn(versions, "node") ? versions.node : unknown;
  const versionsNpm = lodash.hasIn(versions, "npm") ? versions.npm : unknown;

  const data = {
    操作系统: `${osPlatform}（${osDistro}）`,
    内核版本: osKernel,
    内核架构: osArch,
    处理器: `${load.currentLoad && load.currentLoad.toFixed(2)}%（${cpuManufacturer} ${cpuBrand} @ ${cpuSpeed}Ghz）`,
    启动时间: `${moment.duration(time.uptime * 1000).humanize()}`,
    内存使用: `${((mem.active / mem.total) * 100).toFixed(2)}%（${pb(mem.active)} / ${pb(mem.total)}）`,
    数据占用: `${pb(du(path.resolve("data", "db")))}`,
    "Node.js": versionsNodeJS,
    npm: versionsNpm,
    浏览器: browserVer,
  };
  const text = Object.entries(data)
    .map(
      ([k, v]) =>
        `${k}：${" ".repeat(
          8 -
            k
              .split("")
              .map((c) => (c.charCodeAt(0) > 127 ? 2 : 1))
              .reduce((p, v) => p + v, 0)
        )}${v}`
    )
    .join("\n");

  if (lodash.hasIn(msg, "bot.say")) {
    msg.bot.say(msg.sid, text, msg.type, msg.uid, false, "\n");
  }

  return { data, text };
}

export { status };
