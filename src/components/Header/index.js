import React from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import Requirements from './Requirements'
import Considerations from './Considerations'

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    accessGitHub = () => {
        return (
            <Menu.Item onClick={() => window.open('https://github.com/lantractech/tictactoe', "_blank") }>
                GitHub
            </Menu.Item>
        )
    }

    render() {
        return (
            <Menu stackable size="huge">
                <Menu.Item>
                    <Icon name='hashtag' size='large' color={'teal'} />
                    <span style={{ color: '#00b5ad', fontWeight: 'bold', fontSize: 18 }}>TicTacToe Project</span>
                </Menu.Item>

                <Requirements />
                <Considerations />
                {this.accessGitHub()}
            </Menu>
        )
    }

}
