module.exports = function leechAsync(iterations, chunkSize = 10000) {
    
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

                setImmediate(processChunk); // event loop'a nefes aldır

            } else {

                resolve(leech);

            }
        }

        processChunk();

    });
}
