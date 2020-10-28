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
  static _validMoves = {
    'rock' : 'scissors',
    'paper' : 'rock',
    'scissors' : 'paper'
  };

  constructor(name) {
    if (Move._isValid(name)) {
      this.name = name;
    } else {
      throw Error(`'${name}' is not a valid move`);
    }
    this.canDefeat = Move._validMoves[name];
  }

  static _isValid(name) {
    return Object.keys(Move._validMoves).includes(name);
  }

  static getRandomMove() {
    let moveID = randomInteger(0, 2);
    return new Move(Object.keys(Move._validMoves)[moveID]);
  }
}

try {
  new Game(argv.move).play();
} catch(err) {
  console.log(err.message);
  return;
}
