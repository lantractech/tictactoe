import React from 'react';
import _ from 'lodash'
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
    this.stateOrig = _.cloneDeep(this.state)
    this.resetAppState = this.resetAppState.bind(this)
  }

  resetAppState = () => {
    this.setState(this.stateOrig)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <PlayerBar activePlayer={this.state.activePlayer} message={this.state.message} />
          <GameBoard activePlayer={this.state.activePlayer} resetAppState={this.resetAppState}/>
        </Container>
      </React.Fragment>
    )
  }

}
