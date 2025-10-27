import Log from "../../shared/Log.js";

export default async function join(Development, sockets, io, DOMAIN, botLimit) {

    const promises = [];

    let game_settings;

    const uri = `https://${DOMAIN}/connect`;

    if (!Development) console.log(uri);

    Log(`Connection bots...;`, "BotManager");

    for (let i = 0; i < botLimit; i++) {

        if (!Development) {

            const res = await fetch(uri);

            const types = res.headers.get("content-type").split(" ");

            if (!types.includes("application/json;")) {
                console.log(res.status);
                continue;
            }

            const { token, SUB, PORT } = await res.json();

            sockets[i] = io(`https://${SUB}.${DOMAIN}:${PORT}`, {
                auth: { token },
                query: { nick: `BoBot_${i + 1}` }
            });

        } else {

            sockets[i] = io("http://localhost:3001", {
                query: { nick: `BoBot_${i + 1}` }
            });

        }

        promises[i] = new Promise(resolve => {

            if (i === 0) {

                sockets[i].on("login", (data) => {
                    game_settings = data.settings;
                    console.log(data.settings)
                    resolve();
                });

            } else sockets[i].on("connect", resolve);

        });

    }

    await Promise.all(promises);

    return game_settings;

}