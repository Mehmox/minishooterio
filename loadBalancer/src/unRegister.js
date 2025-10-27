import Log from "../../shared/Log.js";

export default function unRegister(TimeoutInSec, prioritys, servers) {
    setInterval(() => {
        servers.forEach((data, ServerId) => {
            const delta = performance.now() - data.LTUpdate;

            if (delta >= TimeoutInSec * 1000) {

                servers.delete(ServerId);

                const priorityData = prioritys.get(data.priority);

                prioritys.set(data.priority, priorityData.filter(id => id !== ServerId));

                Log(`Server ${ServerId} unregistered to priority: ${data.priority}.`, "LoadBalancer");
                
            }
        });
    }, TimeoutInSec * 1000);
}