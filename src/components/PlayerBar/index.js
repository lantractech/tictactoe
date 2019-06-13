import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'

export default class PlayerBar extends React.Component {

    getPlayerOneSegment = () => {
        const backgroundColor = this.props.activePlayer === 1 ? 'teal' : 'grey'
        return (
            <Grid.Column>
                <Segment inverted color={backgroundColor} style={{fontWeight: 'bold', padding:'0.5em 1em'}}>Player One - (X)</Segment>
            </Grid.Column>
        )
    }

    getMessageSegment = () => {
        return (
            <Grid.Column width={8}>
                <Segment style={{fontWeight: 'bold', padding:'0.5em 1em'}}>{this.props.message}</Segment>
            </Grid.Column>
        )
    }

    getPlayerTwoSegment = () => {
        const backgroundColor = this.props.activePlayer === 2 ? 'teal' : 'grey'
        return (
            <Grid.Column>
                <Segment inverted color={backgroundColor} style={{fontWeight: 'bold', padding:'0.5em 1em'}}>Player Two - (O)</Segment>
            </Grid.Column>
        )
    }

    render() {
        return (
            <Grid textAlign='center' columns='equal'>
            <Grid.Row>
                {this.getPlayerOneSegment()}
                {this.getMessageSegment()}
                {this.getPlayerTwoSegment()}
                </Grid.Row>
            </Grid>
        )
    }

}
