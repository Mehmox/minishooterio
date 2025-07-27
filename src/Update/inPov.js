//inPov.js

module.exports = function is_In_Pov(self, object) {

    if (object.position.x - object.stats.size <= self.position.x + self.pov.width / 2 &&
        self.position.x - self.pov.width / 2 <= object.position.x + object.stats.size) {

        if (object.position.y- object.stats.size <= self.position.y + self.pov.height / 2 &&
            self.position.y - self.pov.height / 2 <= object.position.y+ object.stats.size) {
            return true
        }

    }

    return false

}