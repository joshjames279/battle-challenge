class Player{
    constructor(name, hp = 100){
        this.name = name;
        this.hp = hp;
    }

    takeDamage(damage){
        if(damage > this.hp){
            return this.hp = 0;
        }
		return this.hp -= damage;
    }

    healHealth(medicine) {
        if(this.hp < 100) {
        return this.hp += medicine
        }
    }
}

module.exports = Player
