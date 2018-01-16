import React from 'react';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';
import formatText from '../utils/index';
export class P extends React.Component {
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
    let text = formatText(this.state.text)   
    return (
      <p
        style={this.props.styles}
        className={this.props.classes}
      >
      
        {this.state.loading ? this.props.loadingText : text}
      </p>
    );
  }
}

P.contextTypes = {
  projectID: PropTypes.string.isRequired,
};

P.propTypes = {
  componentID: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
  styles: PropTypes.object,
  classes: PropTypes.string,
};

P.defaultProps = {
  loadingText: '\u00A0',
  styles: {},
  classes: '',
};

export default P;
