//lobifinder/src/balancer.js
export default function getValidServerID(prioritys, servers) {
    const valid = { SUB: "", ServerID: -1 };
    let max = -1;

    const sortedPripritys = Array.from(prioritys.keys()).sort((a, b) => a - b);

    for (let i = 0; i < prioritys.size; i++) {
        const priority = sortedPripritys[i];

        prioritys.get(priority).forEach(ServerId => {
            const data = servers.get(ServerId);

            if (data.count > max && data.count < data.limit) {
                max = data.count;
                valid.ServerID = ServerId;
                valid.SUB = data.SUB;
            }
        });

        if (valid.ServerID !== -1) break;
    }

    return valid;
}