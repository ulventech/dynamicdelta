import React from 'react';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';

export class DDH1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    fetch(`${CONSTANT.GLOBAL.API}/${this.context.projectID}/${this.props.componentID}.json`, {
      mode: 'no-cors'
    })
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
