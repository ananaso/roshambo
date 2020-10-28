#!/usr/bin/env node

const { argv } = require('yargs');

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
  constructor(playerMove) {
    this.pMove = new Move(playerMove);
    this.cMove = Move.getRandomMove();
  }

  play() {
    console.log('Playing a game of Rock, Paper, Scissors against the computer.');
    console.log(`Player plays ${this.pMove.name}`);
    console.log(`Computer plays ${this.cMove.name}`);
    console.log(Game._computeOutcome(this.pMove, this.cMove));
  }

  static _computeOutcome(playerMove, computerMove) {
    if (playerMove.name === computerMove.name) {
      return "It's a tie...";
    } else if (playerMove.canDefeat === computerMove.name) {
      return "~Player wins!~";
    } else {
      return "~Computer wins.~";
    }
  }
}


class Move {
  constructor(name) {
    if (Move._isValid(name)) {
      this.name = name;
    } else {
      throw Error(`'${name}' is not a valid move`);
    }
    this.canDefeat = Move._canDefeat(name);
  }

  static _isValid(name) {
    const validMoves = ['rock', 'paper', 'scissors'];
    return validMoves.includes(name);
  }

  static _canDefeat(name) {
    if (name === 'rock') {
      return 'scissors';
    } else if (name === 'paper') {
      return 'rock';
    } else {
      return 'paper';
    }
  }

  static getRandomMove() {
    const validMoves = ['rock', 'paper', 'scissors'];
    let moveID = randomInteger(0, 2);
    return new Move(validMoves[moveID]);
  }

  
}

try {
  new Game(argv.move).play();
} catch(err) {
  console.log(err.message);
  return;
}
