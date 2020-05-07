new Vue ({
  el: '#app',
  data: {
    playerHealth: 100,
    playerMana: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth= 100;
      this.playerMana = 100;
      this.turns = [];
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage + ' ' + 'HP'
      });
      if(this.checkWin()) {
        return;
      }
     
      this.monsterAttacks();
    },
    specialAttack: function() {
      let damage = this.calculateDamage(10, 20)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage
      });

      if(this.checkWin()) {
        return;
      }
      this.monsterAttacks();    
    },
    heal: function() {
      if(this.playerMana > 0){
        if( this.playerHealth <= 90){
          this.playerHealth += 10
        } else {
          this.playerHealth = 100;
        }
        this.playerMana -= 20;
      }
      
      if( this.playerMana === 0) {
        this.turns.unshift({
          isPlayer: true,
          text: 'You are out of mana'
        })
      } else {
        this.turns.unshift({
          isPlayer: true,
          text: 'Player heals for 8 HP'
        })
      }
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function(){
      let damage = this.calculateDamage(5, 18)
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage + ' '+'HP',        
      });
    },
    calculateDamage: function(minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random()* maxDamage) + 1, minDamage)
    },
    checkWin: function() {
      if(this.monsterHealth <= 0) {
        if(confirm('You Won! New Game?')){
          this.startGame();
        }else{
          this.gameIsRunning = false
        }
        return true;
      }else if (this.playerHealth <= 0){
        if(confirm('YOU DIED! New Game?')){
          this.startGame();
        }else{
          this.gameIsRunning = false
        }
        return true;
      }
      return false;
    }
  },
});