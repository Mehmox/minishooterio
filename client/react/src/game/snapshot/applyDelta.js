const each = ["prev", "next"];

export default function applyDelta(Gamestate, Delta) {

    each.forEach(snapshot => {

        for (const instance_id in Delta[snapshot]) {

            if (!Gamestate[snapshot].has(+instance_id)) {

                Gamestate[snapshot].set(+instance_id, Delta[snapshot][+instance_id]);

            } else {

                const instance = Gamestate[snapshot].get(+instance_id);
                const update = Delta[snapshot][+instance_id];

                if (update["outSight"] !== undefined) {
                    Gamestate[snapshot].delete(update.outSight);
                    continue;
                }

                for (const state in update) instance[state] = update[state];

            }

        }

    });

}