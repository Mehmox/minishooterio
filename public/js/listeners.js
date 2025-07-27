//listeners.js
export default function Listeners(player) {

    window.addEventListener("keydown", (event) => {
        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d")
            player[event.key] = true
    });

    window.addEventListener("keyup", (event) => {
        if (event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d")
            player[event.key] = false
    });

    let counter = 0
    function track(event) {
        counter++
        if (counter % 1000 === 0) console.log(event.offsetX, event.offsetY);
        if (event.target.id === "game") player.target = { x: event.offsetX, y: event.offsetY }
    }

    window.addEventListener("mousedown", () => {
        player.isShooting = true
        window.addEventListener("mousemove", track);
    });

    window.addEventListener("mouseup", () => {
        player.isShooting = false
        window.removeEventListener("mousemove", track)
    });
}