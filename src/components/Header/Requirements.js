import React from 'react';
import { Menu, Header, Modal, List } from 'semantic-ui-react'

export default class Requirements extends React.Component {

    getContent = () => {
        return (
            <List as='ol' style={{fontSize: 16}}>
                <List.Item as='li'>Display an empty game board</List.Item>
                <List.Item as='li'>Allow each user to take turns placing a piece on an unoccupied square, and prevent a user from putting a piece on an occupied square</List.Item>
                <List.Item as='li'>Determine when the game ends, and display the results of the game</List.Item>
            </List>
        )
    }

    render() {
        return (
            <Modal closeIcon centered={false} trigger={
                <Menu.Item name='requirements'>
                    Requirements
                </Menu.Item>
            }>
                <Header icon='clipboard check' content=' Requirements' />
                <Modal.Content>
                    <p style={{fontSize: 17}}>
                        Write a web page that allows two users to play a game of tic-tac-toe.
                        The page does not have to play the game itself, it only needs to:
                    </p>
                    {this.getContent()}
                    <br />
                    <p>
                        <i>
                        You are free to use whatever tools, libraries, and frameworks you choose (so long as you do not use tictactoe.js).  
                        We will be looking for good programming practices, visual appeal, and correctness.  
                        That said, we have never given this programming assignment before and we do not want it to take too long.  
                        If you find yourself spending more than a couple of hours on this, 
                        come with what you have and we will talk about what you would have done if you had more time.
                        </i>
                    </p>
                </Modal.Content>
            </Modal>
        )
    }

}
