import React from 'react';
import { Container } from 'semantic-ui-react'
import Header from '../Header'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Initial commit'
    }
  }

  render() {
    return (
      <Container style={{ marginTop: 10 }}>
        <Header />
      </Container>
    )
  }

}
