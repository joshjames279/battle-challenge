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
}

module.exports = Player
