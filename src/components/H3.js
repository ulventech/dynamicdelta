import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { contextTypes, propTypes, defaultProps } from '../props/H';
import { isNull, isEmpty } from 'lodash';
import { CDNURL } from '../utils';

class H3 extends React.Component {
  static contextTypes = contextTypes;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    text: '',
    style: {},
    loading: true,
    error: null,
  }

  formatText = text => {
    return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
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
        console.error('DynamicDelta [H3] ERROR:', error);
      });
  }

  render() {
    const {
      style,
      className,
      itemProp,
    } = this.props;
    const text = this.formatText(this.state.text);
    const styles = Object.assign({}, this.state.style, style);

    return (
      <h3
        style={styles}
        className={className}
        itemProp={itemProp}
      >
        {this.state.loading ? this.props.loadingText : ReactHtmlParser(text)}
      </h3>
    );
  }
}

export default H3;
