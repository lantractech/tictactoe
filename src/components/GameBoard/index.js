import React from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react'

export default class GameBoard extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    getPlayerOneIcon = () => {
        const backgroundColor = this.props.activePlayer === 1 ? 'teal' : 'grey'
        return (
            <Grid.Column>
                <Segment><Icon name='times' color={backgroundColor} size='huge' /></Segment>
            </Grid.Column>
        )
    }

    getGameBoard = () => {
        return (
            <Grid.Column width={10}>
                <Segment.Group>
                    <Segment.Group horizontal>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                        <Segment style={{ borderBottom: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                    <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                        <Segment style={{ borderRight: '5px solid black', borderBottom: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                        <Segment style={{ borderBottom: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                    <Segment style={{ borderRight: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                        <Segment style={{ borderRight: '5px solid black' }}>
                            <Icon name='' size='massive' />
                        </Segment>
                        <Segment>
                            <Icon name='' size='massive' />
                        </Segment>
                    </Segment.Group>
                </Segment.Group>
            </Grid.Column>
        )
    }

    getPlayerTwoIcon = () => {
        const backgroundColor = this.props.activePlayer === 2 ? 'teal' : 'grey'
        return (
            <Grid.Column>
                <Segment><Icon name='circle outline' color={backgroundColor} size='huge' /></Segment>
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
