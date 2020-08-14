new Vue({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: []
  },
  computed: {
    hasResult() {
      return this.playerLife === 0 || this.monsterLife === 0
    }
  },
  methods: {
    startGame() {
      this.running = true
      this.playerLife = 100
      this.monsterLife = 100
      this.logs = []
    },
    // method será usado no botão attack e no especial attack, sendo este último sendo setada como booleano, true or false para determinar se o ataque é especial ou não
    attack(especial) {
      this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monster', 'player')
      if (this.monsterLife > 0 ) {
        this.hurt('playerLife', 7, 12, false, 'Monster', 'Jogador', 'monster')
      }
    },
    hurt(prop, min, max, especial, source, target, cls) {
      const plus = especial ? 5 : 0
      const hurt = this.getRandom(min + plus, max + plus)
      // Garantindo que o life dos jogadores jamais seja negativo, tendo o minimo possível em 0
      this[prop] = Math.max(this[prop] - hurt, 0)
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
    },
    heal(min, max) {
      const heal = this.getRandom(min, max)
      // Garantindo  que o life do player jamais seja maior que 100
      this.playerLife = Math.min(this.playerLife + heal, 100)
      this.registerLog(`Jogador ganhou life de ${heal}.`, 'player')
    },
    healAndHurt() {
      this.heal(10, 15)
      this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
    },
    // Gerando um número randomico entre um valor mínimo e um valor máximo
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls })
    }
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false
    }
  }
})