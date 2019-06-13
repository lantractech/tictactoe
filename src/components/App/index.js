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
      message: 'Ready Player One',
      winner: false
    }
    this.stateOrig = _.cloneDeep(this.state)
    this.resetAppState = this.resetAppState.bind(this)
    this.changeMessage = this.changeMessage.bind(this)
    this.changePlayer = this.changePlayer.bind(this)
    this.setWinner = this.setWinner.bind(this)
  }

  resetAppState = () => {
    this.setState(this.stateOrig)
  }

  setWinner = () => {
    this.setState({winner: true})
  }

  changePlayer = () => {
    const { activePlayer } = this.state
    const newPlayer = activePlayer === 1 ? 2 : 1
    this.setState({ activePlayer: newPlayer })
  }

  changeMessage = (message) => {
    const { activePlayer } = this.state
    let newMessage = activePlayer === 1 ? 'Your turn, Player Two!' : 'Your turn, Player One!'
    if (message) {
      this.setState({ message: message })
    }
    else {
      this.setState({ message: newMessage })
    }

  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <PlayerBar 
            activePlayer={this.state.activePlayer} 
            message={this.state.message} />
          <GameBoard
            winner={this.state.winner}
            activePlayer={this.state.activePlayer}
            setWinner={this.setWinner}
            resetAppState={this.resetAppState} 
            changePlayer={this.changePlayer}
            changeMessage={this.changeMessage}/>
        </Container>
      </React.Fragment>
    )
  }

}
