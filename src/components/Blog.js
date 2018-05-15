/* global fetch */
import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import { BLOGURL } from '../utils';

class Blog extends React.Component {
  static childContextTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  static contextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  static propTypes = {
    loadingText: PropTypes.any,
    style: PropTypes.shape({}),
    className: PropTypes.string,
  }

  static defaultProps = {
    loadingText: '\u00A0',
    style: {},
    className: '',
  }

  state = {
    posts: [],
    loading: true,
    error: null,
  }

  getChildContext() {
    return { posts: this.state.posts };
  }

  componentDidMount() {
    fetch(BLOGURL(this.context.projectID))
    .then(response => response.json())
    .then((resp) => {
      this.setState({
        posts: isArray(resp) ? resp : [],
        loading: false,
      });
    })
    .catch((error) => {
      this.setState({
        error: error,
        loading: false,
      });
      console.error('DynamicDelta [BLOG] ERROR:', error);
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? this.props.loadingText : this.props.children}
      </div>
    );
  }
}

export default Blog;
