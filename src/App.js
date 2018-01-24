import React, { Component } from 'react';
import './App.css';

import Tiles from './Tiles.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      xWins:0,
      oWins:0,
      playerMove:"X",
      grid:[
        "","","",
        "","","",
        "","",""],
      move:1,
      winner:""
    }
  }
  resetGame = (champ) =>{
    let w =  champ.toLocaleLowerCase()+"Wins";
    this.setState({
      playerMove:"X",
      grid:[
        "","","",
        "","","",
        "","",""],
      move:1,
      winner:"",
      [w]: this.state[w] + 1
    });
    let tiles = document.getElementsByClassName("tile");
    for(let i =0;i<tiles.length;i++){
      tiles[i].innerHTML = "";
    }
  }
  endGame = (champ) =>{
    alert(champ + " wins");
    this.resetGame(champ);
  }
  checkWin = () =>{
    console.log(this.state.move);
    let grid = this.state.grid;
    switch(true){
      //checking top / left row
      case grid[0]&&grid[0] === grid[1] && grid[1] === grid[2]://top row
      case grid[0]&&grid[0] === grid[3] && grid[3] === grid[6]://left col
       this.setState({winner:grid[0]});
       this.endGame(grid[0]);
      break;
      //checking bottom / right row
      case grid[8]&&grid[8] === grid[7] && grid[7] === grid[6]://bottom row
      case grid[8]&&grid[8] === grid[5] && grid[5] === grid[2]://right col
        this.setState({winner:grid[6]});
        this.endGame(grid[6]);
      break;
      //checking diagonals / center col / center row
      case grid[4]&&grid[4]===grid[0] && grid[4] === grid[8]://diagonal from left to right
      case grid[4]&&grid[4]===grid[2] && grid[2] === grid[6]://diagonal from right to left
      case grid[4]&&grid[4]===grid[1] && grid[1] === grid[7]://center col
      case grid[4]&&grid[4]===grid[3] && grid[3] === grid[5]://center row
        this.setState({winner:grid[4]});
        this.endGame(grid[4]);
      break;
      default:
        if(this.state.move === 10){
          alert("cats game");
          this.resetGame();
        }
      break;
    }
  }
  handleTileClick = (e) => {
    if(this.state.grid[e.target.id].length===0){
      e.target.innerHTML = this.state.playerMove;
      this.state.grid[e.target.id] = this.state.playerMove;
      if(this.state.move % 2 ===0){
        this.state.playerMove = "X";
      }else{
        this.state.playerMove = "O";
      }
      this.state.move++;
    }else{
      console.log("tile taken");
    }
    if(!(this.state.move < 5 &&this.state.winner.length<1)){
      this.checkWin();
    }
  }
  render() {
    return (
      <div className="App">
        <div className="game">
          <Tiles playerMove={this.state.playerMove} grid={this.state.grid} move={this.state.move} click={this.handleTileClick} />
        </div>
        <div className="win-stats">
          <h1 className="x-win">X wins : {this.state.xWins}</h1>
          <h1 className="o-win">O wins : {this.state.oWins}</h1>
        </div>
      </div>
    );
  }
}

export default App;
