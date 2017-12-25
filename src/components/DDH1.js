import React from 'react';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';

export class DDH1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loading: true,
    };
  }

  componentDidMount() {
    fetch(`${CONSTANT.GLOBAL.API}/${this.context.projectID}/${this.props.componentID}`)
      .then(response => response.json())
      .then((resp) => {
        this.setState({
          loading: false,
          text: resp.text || ' ',
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.error('DDP ERROR:', error);
      });
  }

  render() {
    return (
      <h1
        style={this.props.styles}
        className={this.props.classes}
      >
        {this.state.loading ? this.props.loadingText : this.state.text}
      </h1>
    );
  }
}

DDH1.contextTypes = {
  projectID: PropTypes.string.isRequired,
};

DDH1.propTypes = {
  componentID: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
  styles: PropTypes.object,
  classes: PropTypes.string,
};

DDH1.defaultProps = {
  loadingText: '&nbsp;',
  styles: {},
  classes: '',
};

export default DDH1;
