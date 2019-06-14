import React from 'react';
import _ from 'lodash'
import { Grid, Segment, Icon, Button } from 'semantic-ui-react'
import { Draggable, Droppable } from 'react-simple-drag-n-drop'

export default class GameBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            boardStatus: {
                1: { ownedBy: null, pendingBy: null },
                2: { ownedBy: null, pendingBy: null },
                3: { ownedBy: null, pendingBy: null },
                4: { ownedBy: null, pendingBy: null },
                5: { ownedBy: null, pendingBy: null },
                6: { ownedBy: null, pendingBy: null },
                7: { ownedBy: null, pendingBy: null },
                8: { ownedBy: null, pendingBy: null },
                9: { ownedBy: null, pendingBy: null }
            }
        }
        this.stateOrig = _.cloneDeep(this.state)
        
        this.iconMap = {
            1: 'times',
            2: 'circle outline'
        }
        this.winnerMap = [
            ['1','2','3'],
            ['4','5','6'],
            ['7','8','9'],
            ['1','4','7'],
            ['2','5','8'],
            ['3','6','9'],
            ['1','5','9'],
            ['3','5','7']
        ]

        this.itemDropped = this.itemDropped.bind(this)
        this.getIcon = this.getIcon.bind(this)
        this.clearCurrent = this.clearCurrent.bind(this)
        this.isPendingActive = this.isPendingActive.bind(this)
        this.restartGame = this.restartGame.bind(this)
        this.submitClicked = this.submitClicked.bind(this)
    }

    submitClicked = () => {
        //update boardStatus state
        const newBoardStatus = this.setOwnedBy()
        this.setState({boardStatus: newBoardStatus}, () => {
            //check winner mapping
            const winner = this.foundWinner()
            if (winner) {
                let message = winner === 1 ? 'Player One Wins!!!' : 'Player Two Wins!!!'
                this.props.changeMessage(message)
                this.props.setWinner()
            }
            //if no winner, determine if all spots are filled
            //if all spots are filled, and no winner, then send message 'draw'
            else if (this.isOwnedByFilled()) {
                let message = 'Looks like a Draw. Play again!'
                this.props.changeMessage(message)
            }
            //if all spots are NOT filled, then switch players
            else {
                this.props.changePlayer()
                this.props.changeMessage()
            }
        })

    }

    foundWinner = () => {
        const playerOneList = this.getPlacementListForPlayer(1)
        const playerTwoList = this.getPlacementListForPlayer(2)
        console.log(JSON.stringify(playerOneList))
        console.log(JSON.stringify(playerTwoList))
        let winner = null;

        if (playerOneList.length > 2){
            _.forEach(this.winnerMap,(array) => {
                if (_.isEmpty(_.difference(array,playerOneList))) {
                    winner = 1
                }
            })
        }

        if (playerTwoList.length > 2){
            _.forEach(this.winnerMap,(array) => {
                if (_.isEmpty(_.difference(array, playerTwoList))) {
                    winner = 2
                }
            })
        }

        return winner
    }

    getPlacementListForPlayer = (player) => {
        let list = []
        _.forEach(this.state.boardStatus,(obj,key) => {
            if (obj.ownedBy === player) {
                list.push(key)
            }
        })
        return list
    }

    restartGame = () => {
        this.props.resetAppState()
        this.setState(this.stateOrig)
    }

    setOwnedBy = () => {
        return _.mapValues(this.state.boardStatus, (o) => {
            if (o.pendingBy) {
                return { ownedBy: o.pendingBy, pendingBy: null }
            }
            else {
                return { ownedBy: o.ownedBy, pendingBy: null }
            }
        })
    }

    isOwnedByFilled = () => {
        let isOwnedByFilled = true;
        _.forEach(this.state.boardStatus, (o) => {
            if (!o.ownedBy){
                isOwnedByFilled = false;
            }
        })
        return isOwnedByFilled
    }

    isPendingActive = () => {
        let pendingActive = false;
        _.forEach(this.state.boardStatus, (o) => {
            if (o.pendingBy){
                pendingActive = true;
            }
        })
        return pendingActive
    }

    resetPendingBy = () => {
        return _.mapValues(this.state.boardStatus, (o) => {
            return { ownedBy: o.ownedBy, pendingBy: null }
        })
    }

    clearCurrent = () => {
        const newBoardStatus = this.resetPendingBy()
        this.setState({ boardStatus: newBoardStatus })
    }

    itemDropped = (num) => {
        const newBoardStatus = this.resetPendingBy()
        if (!newBoardStatus[num].ownedBy){
            newBoardStatus[num].pendingBy = this.props.activePlayer
        }
        this.setState({ boardStatus: newBoardStatus })
    }

    getIcon = (num) => {
        const { boardStatus } = this.state
        const ownedBy = _.get(boardStatus, `[${num}].ownedBy`)
        const pendingBy = _.get(boardStatus, `[${num}].pendingBy`)
        if (ownedBy) {
            return <Icon name={this.iconMap[ownedBy]} color={'grey'} size='massive' />
        }
        else if (pendingBy) {
            return <Icon name={this.iconMap[pendingBy]} color={'teal'} size='massive' />
        }
        else {
            return <Icon name='' size='massive' />
        }

    }

    getPlayerOneIcon = () => {
        const active = this.props.activePlayer === 1
        return active ? (
            <Grid.Column>
                <Segment>
                    <Draggable id='playerOne' isDragAndDropElement={true}>
                        <Icon name='times' color={'teal'} size='huge' />
                    </Draggable>
                </Segment>
            </Grid.Column>
        ) : (
                <Grid.Column>
                    <Segment><Icon name='times' color={'grey'} size='huge' /></Segment>
                </Grid.Column>
            )
    }

    getGameBoard = () => {
        return (
            <Grid.Column width={10}>
                <Segment.Group>
                    <Segment.Group horizontal>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(1)}>
                                {this.getIcon(1)}
                            </Droppable>
                        </Segment>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(2)}>
                                {this.getIcon(2)}
                            </Droppable>
                        </Segment>
                        <Segment style={{ borderBottom: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(3)}>
                                {this.getIcon(3)}
                            </Droppable>
                        </Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(4)}>
                                {this.getIcon(4)}
                            </Droppable>
                        </Segment>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(5)}>
                                {this.getIcon(5)}
                            </Droppable>
                        </Segment>
                        <Segment style={{ borderBottom: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(6)}>
                                {this.getIcon(6)}
                            </Droppable>
                        </Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment style={{ borderRight: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(7)}>
                                {this.getIcon(7)}
                            </Droppable>
                        </Segment>
                        <Segment style={{ borderRight: '5px solid black' }}>
                            <Droppable onDropCallback={() => this.itemDropped(8)}>
                                {this.getIcon(8)}
                            </Droppable>
                        </Segment>
                        <Segment>
                            <Droppable onDropCallback={() => this.itemDropped(9)}>
                                {this.getIcon(9)}
                            </Droppable>
                        </Segment>
                    </Segment.Group>
                </Segment.Group>
            </Grid.Column>
        )
    }

    getPlayerTwoIcon = () => {
        const active = this.props.activePlayer === 2
        return active ? (
            <Grid.Column>
                <Segment>
                    <Draggable id='playerTwo' isDragAndDropElement={true}>
                        <Icon name='circle outline' color={'teal'} size='huge' />
                    </Draggable>
                </Segment>
            </Grid.Column>
        ) : (
                <Grid.Column>
                    <Segment><Icon name='circle outline' color={'grey'} size='huge' /></Segment>
                </Grid.Column>
            )
    }

    render() {
        const isPendingActive = this.isPendingActive()
        const defaultStyle = {width: 160, margin: '0 20px'}
        const submitColor = isPendingActive ? 'teal': ''
        return (
            <Grid textAlign='center' columns='equal' stackable>
                <Grid.Row verticalAlign='middle'>
                    {this.getPlayerOneIcon()}
                    {this.getGameBoard()}
                    {this.getPlayerTwoIcon()}
                </Grid.Row>
                <Grid.Row style={{marginBottom: 50}}>
                    <Button content="Restart Game" onClick={this.restartGame} style={defaultStyle}/>
                    <Button content="Clear" onClick={this.clearCurrent} disabled={this.props.winner} style={defaultStyle}/>
                    <Button content="Submit" onClick={this.submitClicked} disabled={!isPendingActive || this.props.winner} color={submitColor} style={defaultStyle}/>
                </Grid.Row>
            </Grid>
        )
    }

}
