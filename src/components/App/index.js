import React from 'react';
import { Container } from 'semantic-ui-react'
import Header from '../Header'
import PlayerBar from '../PlayerBar'
import GameBoard from '../GameBoard'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePlayer: 1,
      message: 'Ready Player One'
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <PlayerBar activePlayer={this.state.activePlayer} message={this.state.message} />
          <GameBoard activePlayer={this.state.activePlayer}/>
        </Container>
      </React.Fragment>
    )
  }

}
