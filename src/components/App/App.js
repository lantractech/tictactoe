import React from 'react';

export default class App extends React.Component {
  constructor() {
		super();
		this.state = {
			message: 'Initial commit'
		}
		this._updating = false
	}

  render() {
		return <p>{this.state.message}</p>
	}

}
