import React from 'react';
import PropTypes from 'prop-types';

export class DDH1 extends React.Component {
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
      <h1>{this.state.text}</h1>
    );
  }
}

DDH1.contextTypes = {
  projectID: PropTypes.string.isRequired,
};

DDH1.propTypes = {
  componentID: PropTypes.string.isRequired,
};

export default DDH1;
