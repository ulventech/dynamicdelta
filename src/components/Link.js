import React, { Fragment } from 'react';
import { contextTypes, propTypes, defaultProps } from '../props/Link';
import { CDNURL } from '../utils';

class Link extends React.Component {
  static contextTypes = contextTypes;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    text: '',
    link: '',
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
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          loading: false,
        });
        console.error('DynamicDelta [Link] ERROR:', error);
      });
  }

  getTarget = () => {
    const target = {};
    if (this.props.targetBlank) {
      target.target = "_blank";
      target.rel = "noopener noreferrer";
    }
    return target;
  }

  render() {
    const {
      style,
      className,
    } = this.props;
    const styles = Object.assign({}, this.state.style, style);

    return (
      this.state.loading === false ? (
        <a
          {...this.getTarget()}
          style={styles}
          className={className}
          href={this.state.link}
        >
          {this.state.text}
        </a>
      ) : (
        <span />
      )
    );
  }
}

export default Link;
