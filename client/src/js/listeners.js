//listeners.js

// const info = {
//     timeHistory: { open: new Date().toLocaleTimeString("tr-TR") },
//     browserInfo: {
//         userAgent: null,
//         plugins: null,
//         webdriver: null,
//         language: null,
//         languages: null,
//         position: {
//             X: window.screenX,
//             Y: window.screenY
//         },
//         size: {
//             width: window.outerWidth,
//             height: window.outerHeight,
//         },
//     },
//     deviceInfo: null,
//     inputsHistory: {
//         keys: [],
//     },
// }

export default function Listeners(client, socket) {

    const movement = client.events.movement;
    const combat = client.events.combat;

    window.addEventListener("keydown", (event) => {

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }

        let key = event.key;

        switch (key) {
            case "ArrowUp": key = "w"; break;
            case "ArrowDown": key = "s"; break;
            case "ArrowLeft": key = "a"; break;
            case "ArrowRight": key = "d"; break;
        }

        switch (key) {
            case "w":
            case "s":
            case "a":
            case "d":
                movement[key] = true;
                break;
        }

        if (event.code === "Space") combat.isShooting = true;

    }, { passive: false });

    window.addEventListener("keyup", (event) => {

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }

        let key = event.key;

        switch (key) {
            case "ArrowUp": key = "w"; break;
            case "ArrowDown": key = "s"; break;
            case "ArrowLeft": key = "a"; break;
            case "ArrowRight": key = "d"; break;
        }

        switch (key) {
            case "w":
            case "s":
            case "a":
            case "d":
                movement[key] = false;
                break;
        }

        if (event.code === "Space") combat.isShooting = false;

    });

    window.addEventListener("mousemove", (event) => {

        if (event.target.id === "game") {

            combat.Muzzle_Direction = { x: event.offsetX, y: event.offsetY };

        }

    });

    window.addEventListener("mousedown", (event) => {

        if (event.button === 0) combat.isShooting = true;

    });

    window.addEventListener("mouseup", (event) => {

        if (event.button === 0) combat.isShooting = false;

    });

    // info.deviceInfo = {
    //     screen: {
    //         width: screen.width,
    //         height: screen.height,
    //     },
    // };

    // window.addEventListener("resize", () => {

    //     info.deviceInfo = {
    //         screen: {
    //             width: screen.width,
    //             height: screen.height,
    //         },
    //     };

    // });

    // info.browserInfo.userAgent = navigator.userAgent;
    // info.browserInfo.plugins = navigator.plugins ? navigator.plugins.length : -1;
    // info.browserInfo.webdriver = navigator.webdriver;
    // info.browserInfo.language = navigator.language;
    // info.browserInfo.languages = navigator.languages;

    // setInterval(() => socket.emit("data", info), 500);

}