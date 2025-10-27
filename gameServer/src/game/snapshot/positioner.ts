//positioner.js
interface Player {
    type: "Player";
    id: number;
    socket_id: string;
    seenEnemys: Set<number>;
}

interface Bullet {
    type: "Bullet";
    id: number;
    seenBy: Set<number>;
}

type targetMap = {
    [id: number]: {
        trackeds: number[],
        socket_id: string
    };
}

interface EntityManager {
    pool: { [key: number]: Player | Bullet };
    release: Function;
}

function markPlayer(targetMap: targetMap, entity: Player): void {

    if (!targetMap[entity.id]) {

        targetMap[entity.id] = { trackeds: [entity.id], socket_id: entity.socket_id };

    }

}

function each(entity: Player | Bullet, arr: Set<number>, EntityManager: EntityManager, targetMap: targetMap): void {

    arr.forEach(id => {

        const player = EntityManager.pool[id] as Player;

        markPlayer(targetMap, player);

        targetMap[id].trackeds.push(entity.id);

    });

}

export default function positioner(
    Dirty: Map<number, object>,
    EntityManager: EntityManager
): targetMap {

    const targetMap = {};

    // Array.from(Dirty.keys()).sort((a, b) => a - b)
    Dirty.forEach((_, instance_id) => {

        const entity = EntityManager.pool[instance_id] as Player | Bullet;

        try {

            if (entity.type === "Player") markPlayer(targetMap, entity);

            //The entities seen by current entity will be sent to the client that controls current entity.
            //The entities will be sent to the client that seen by.
            each(entity, entity.type === "Player" ? entity.seenEnemys : entity.seenBy, EntityManager, targetMap);

        } catch (error) {
            console.log("Positioner error:");
            console.log("id: " + instance_id);
            console.log("entity: ");
            console.log(entity);
            console.log(Dirty);
            console.log(error);
        }

    });

    return targetMap;

}