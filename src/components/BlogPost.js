import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { isEmpty } from 'lodash';
import { BLOGURL } from '../utils';

class BlogPost extends React.Component {
  static contextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  static propTypes = {
    postID: PropTypes.string.isRequired,
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
    post: '',
    loading: true,
    error: null,
  }

  componentDidMount() {
    fetch(BLOGURL(
      this.context.projectID,
      this.props.postID,
    ))
    .then(response => response.json())
    .then((resp) => {
      this.setState({
        post: isEmpty(resp) ? {} : resp,
        loading: false,
      });
    })
    .catch((error) => {
      this.setState({
        error: error,
        loading: false,
      });
      console.error('DynamicDelta [BLOGPOST] ERROR:', error);
    });
  }

  render() {
    console.log('post', post);
    return (
      this.state.loading ? this.props.loadingText : ReactHtmlParser('')
    );
  }
}

export default BlogPost;
