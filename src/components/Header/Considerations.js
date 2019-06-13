import React from 'react';
import { Menu, Header, Modal, List } from 'semantic-ui-react'

export default class Considerations extends React.Component {

    getContent = () => {
        return (
            <List as='ol' style={{fontSize: 16}}>
                <List.Item as='li'>Display current player</List.Item>
                <List.Item as='li'>Run logic to check winner after each turn</List.Item>
                <List.Item as='li'>After winner is determined, disable 'Submit' button</List.Item>
                <List.Item as='li'>Add 'Restart' button to reset game to original state</List.Item>
            </List>
        )
    }

    render() {
        return (
            <Modal closeIcon centered={false} trigger={
                <Menu.Item name='considerations'>
                    Considerations
                </Menu.Item>
            }>
                <Header icon='clipboard list' content=' Considerations' />
                <Modal.Content>
                    {/* <p style={{fontSize: 17}}>
                        Write a web page that allows two users to play a game of tic-tac-toe.
                        The page does not have to play the game itself, it only needs to:
                    </p> */}
                    {this.getContent()}
                    <br />
                    <p>
                        <i>
                            Alternative design may have included clickable squares, instead of drag and drop.
                        </i>
                    </p>
                </Modal.Content>
            </Modal>
        )
    }

}
