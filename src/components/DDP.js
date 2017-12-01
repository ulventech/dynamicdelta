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
    fetch(`https://us-central1-react-cms-184905.cloudfunctions.net/fetch/97c5bf17-f44f-451c-b39f-fcaad7786d52/${this.props.componentID}`)
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        this.setState({
          config: resp.config,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    /*
    axios.get(`https://us-central1-react-cms-184905.cloudfunctions.net/fetch/97c5bf17-f44f-451c-b39f-fcaad7786d52/${this.props.componentID}`).then((resp) => {
      this.setState({
        config: resp.data.config,
      });
    });
    */
  }

  render() {
    return (
      <p>{this.state.text}</p>
    );
  }
}

DDP.propTypes = {
  componentID: PropTypes.string.isRequired,
};

export default DDP;
