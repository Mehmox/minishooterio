//ready.js
let checked = 0;

export default function is_Game_Ready(func) {

    checked++

    if (checked === 2) func();

}