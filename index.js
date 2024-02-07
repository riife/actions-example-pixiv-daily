import fs from "node:fs/promises";
import { ranking, setOptions } from "@__dirname/pixiv-web-api";

if (process.platform === "win32") {
    setOptions({
        baseURL: "https://cros.deno.dev/https://pixiv.net",
    });
}

const data = await ranking({ mode: "daily" });

const dateString = new Intl.DateTimeFormat("zh-Hans-CN", {
    timeZone: "Asia/Shanghai",
    dateStyle: "short",
})
    .format(new Date())
    .replaceAll("/", "-");

console.log(dateString);

await fs.mkdir("./data", { recursive: true });

await fs.writeFile(`./data/${dateString}.json`, JSON.stringify(data));
