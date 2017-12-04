import React from 'react';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';

export class DDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    fetch(`${CONSTANT.GLOBAL.API}/${this.context.projectID}/${this.props.componentID}.json`)
      .then((response) => response.json())
      .then((resp) => {
        this.setState({
          text: resp.text || ' ',
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
