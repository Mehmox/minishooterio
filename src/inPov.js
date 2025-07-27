module.exports = function is_In_Pov(self, enemie) {
    if (enemie.position.x <= self.position.x + self.pov.width / 2 &&
        self.position.x - self.pov.width / 2 <= enemie.position.x) {
        if (enemie.position.y <= self.position.y + self.pov.height / 2 &&
            self.position.y - self.pov.height / 2 <= enemie.position.y) {
            return true
        }
    }
    return false
}