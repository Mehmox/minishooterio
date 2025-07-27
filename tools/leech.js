//tools/leech.js
function leechAsync(iterations, chunkSize = 10000) {

    return new Promise((resolve) => {

        let leech = 0;

        let j = 0;

        function processChunk() {

            const end = Math.min(j + chunkSize, iterations);

            while (j < end) {

                leech++;

                j++;

            }

            if (j < iterations) {

                setImmediate(processChunk); // event loop break

            } else {

                resolve(leech);

            }
        }

        processChunk();

    });
}

function leech(leech = 100000000) {
    
    var counter = 0;

    for (let j = 0; j < leech; j++) {

        counter++;

    }

}

module.exports = { leech, leechAsync };
