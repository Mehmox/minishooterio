module.exports = function damage(damage, owner) {

    this.stats.health -= damage;

    if (this.stats.health <= 0) {

        owner.KDA.kill++;
        this.KDA.dead++;

        this.setPosition();

        this.stats.health = this.baseStats.health;

    };

}