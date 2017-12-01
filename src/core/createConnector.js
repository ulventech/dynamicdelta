import React from 'react';

export class createConnector extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default createConnector;
