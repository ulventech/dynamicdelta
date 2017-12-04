import React from 'react';
import PropTypes from 'prop-types';

export class DDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    fetch(`https://us-central1-react-cms-184905.cloudfunctions.net/fetch/${this.context.projectID}/${this.props.componentID}`)
      .then((response) => response.json())
      .then((resp) => {
        this.setState({
          text: resp.config.text || '',
        });
      })
      .catch((error) => {
        console.error('DDP ERROR:', error);
      });
  }

  render() {
    return (
      <p>{this.state.text}</p>
    );
  }
}

DDP.contextTypes = {
  projectID: PropTypes.string.isRequired,
};

DDP.propTypes = {
  componentID: PropTypes.string.isRequired,
};

export default DDP;
