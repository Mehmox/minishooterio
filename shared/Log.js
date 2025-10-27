const colorMapmap = {
    bright: "1",
    black: "30",
    red: "31",
    green: "32",
    yellow: "33",
    blue: "34",
    magenta: "35",
    cyan: "36",
    white: "37",
    gray: "90",
};
const colorMap = {
    "Code": "bright",
    "BotManager": "red",
    "LoadBalancer": "bright",
    "Server": "bright",
};
export default function Log(log, service = "Code") {
    const color = colorMapmap[colorMap[service]];
    console.log(`\n\x1b[${colorMapmap["bright"]}m%s\x1b[0m \x1b[${color}m%s\x1b[0m`, `[${service}]`, log);
}
