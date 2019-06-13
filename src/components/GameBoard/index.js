import React from 'react';
import _ from 'lodash'
import { Grid, Segment, Icon } from 'semantic-ui-react'
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
        this.iconMap = {
            1: 'times',
            2: 'circle outline'
        }
        this.itemDropped = this.itemDropped.bind(this)
        this.getIcon = this.getIcon.bind(this)
    }

    itemDropped = (num) => {
        const newBoardStatus = _.mapValues(this.state.boardStatus, (o) => {
            return { ownedBy: o.ownedBy, pendingBy: null }
        })

        newBoardStatus[num].pendingBy = this.props.activePlayer
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
        return (
            <Grid textAlign='center' columns='equal' stackable>
                <Grid.Row verticalAlign='middle'>
                    {this.getPlayerOneIcon()}
                    {this.getGameBoard()}
                    {this.getPlayerTwoIcon()}
                </Grid.Row>
            </Grid>
        )
    }

}
