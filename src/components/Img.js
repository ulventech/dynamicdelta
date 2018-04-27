import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { contextTypes, propTypes, defaultProps } from '../props/Img';
import CONSTANT from '../constant';
import { CDNURL } from '../utils';

class Img extends React.Component {
  static contextTypes = contextTypes;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    image: '',
    alt: '',
    style: {},
    loading: true,
    error: null,
  }

  componentDidMount() {
    fetch(CDNURL(this.context.projectID, this.props.componentID))
      .then(response => response.json())
      .then((resp) => {
        this.setState({
          ...resp,
        });
      })
      .catch((error) => {
        console.error('DynamicDelta [Img] ERROR:', error);
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  render() {
    const {
      style,
      className,
      itemProp,
    } = this.props;
    const styles = Object.assign({}, this.state.style, style);

    return (
      !isEmpty(this.state.img) ? (
        <img
          src={`${CONSTANT.STATIC_API}/${this.state.image}`}
          alt={this.state.alt}
          style={styles}
          className={className}
          itemProp={itemProp}
        />
      ) : null
    );
  }
}

export default Img;
