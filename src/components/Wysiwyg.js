import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { contextTypes, propTypes, defaultProps } from '../props/Wysiwyg';
import { CDNURL } from '../utils';

class Wysiwyg extends React.Component {
  static contextTypes = contextTypes;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    wysiwyg: '',
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
        console.error('DynamicDelta [WYSIWYG] ERROR:', error);
      });
  }

  render() {
    const {
      style,
      className,
    } = this.props;
    const styles = Object.assign({}, this.state.style, style);

    return (
      <div
        style={styles}
        className={className}
      >
        {this.state.loading ? this.props.loadingText : ReactHtmlParser(this.state.wysiwyg)}
      </div>
    );
  }
}

export default Wysiwyg;
