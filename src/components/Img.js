import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CONSTANT from '../constant';

class Img extends React.Component {
  static propTypes = {
    componentID: PropTypes.string.isRequired,
    styles: PropTypes.object,
    classes: PropTypes.string,
  }

  static defaultProps = {
    styles: {},
    classes: '',
  }

  static contextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  state = {
    img: '',
    alt: '',
  }

  componentDidMount() {
    fetch(`${CONSTANT.GLOBAL.API}/${this.context.projectID}/${this.props.componentID}`)
      .then(response => response.json())
      .then((resp) => {
        this.setState({
          ...resp,
        });
      })
      .catch((error) => {
        console.error('IMG ERROR:', error);
      });
  }

  render() {
    return (
      !isEmpty(this.state.img) ? (
        <img
          src={`${CONSTANT.STATIC_API}${this.state.img}`}
          alt={this.state.alt}
          style={this.props.styles}
          className={this.props.classes}
        />
      ) : null
    );
  }
}

export default Img;
