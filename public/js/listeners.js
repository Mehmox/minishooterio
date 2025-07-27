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


    function track(event) {
        console.log(event.offsetX, event.offsetY);
    }

    window.addEventListener("mousedown", () => {
        player.fire = true
        window.addEventListener("mousemove", track);
    });

    window.addEventListener("mouseup", () => {
        player.fire = false
        window.removeEventListener("mousemove", track)
    });
}