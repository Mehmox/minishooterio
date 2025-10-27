import markDirty from "../utils/markDirty.js";

export default function Move(bullets, GameTick, EntityManager) {

    bullets.forEach(bullet => {

        if (GameTick >= bullet.tick_of_death) {

            bullets.delete(bullet.id);
            EntityManager.release(bullet);

        } else {

            bullet.x += bullet.plusX;
            bullet.y += bullet.plusY;

            markDirty(bullet, "x");
            markDirty(bullet, "y");

        }

    });

} 