/* global fetch */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { isArray, isEmpty, toNumber } from 'lodash';
import { BLOGURL } from '../utils';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

class Blog extends React.Component {
  static childContextTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    lastPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }

  static contextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  static propTypes = {
    page: PropTypes.number,
    perPage: PropTypes.number,
    loadingText: PropTypes.any,
    style: PropTypes.shape({}),
    className: PropTypes.string,
    // Incase you want to link to a diffrent project.
    // You usaly only have one project that you publish posts in,
    // but you might have several DynamicDelta projects.
    overrideProjectID: PropTypes.string,
  }

  static defaultProps = {
    page: 1,
    perPage: 10,
    loadingText: '\u00A0',
    style: {},
    className: '',
    overrideProjectID: '',
  }

  state = {
    posts: [],
    lastPage: 0,
    totalCount: 0,
    loading: true,
    error: null,
  }

  getChildContext() {
    return {
      posts: this.state.posts,
      lastPage: this.state.lastPage,
      totalCount: this.state.totalCount,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.fetchPage(nextProps.page, nextProps.perPage);
    }
  }

  componentDidMount() {
    this.fetchPage(this.props.page, this.props.perPage);
  }

  fetchPage(page, perPage) {
    fetch(
      `${BLOGURL(this.getProjectID())}?${qs.stringify({
        page: page,
        perPage: perPage,
      })}`
    )
    .then((response) => {
      this.setState({
        lastPage: toNumber(response.headers.get('x-last-page')),
        totalCount: toNumber(response.headers.get('x-total-count')),
      });
      return response.json();
    })
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

  getProjectID() {
    if (!isEmpty(this.props.overrideProjectID)) {
      return this.props.overrideProjectID;
    }
    return this.context.projectID;
  }

  render() {
    return (
      <div className="dd-blog-posts">
        {this.state.loading ? this.props.loadingText : this.props.children}
      </div>
    );
  }
}

export default Blog;
