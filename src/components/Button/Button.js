import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import CONSTANT from '../../constant';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

class Button extends React.Component {
  static contextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  static propTypes = {
    componentID: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    loadingText: PropTypes.string,
    styles: PropTypes.object,
    classes: PropTypes.string,
  }

  static defaultProps = {
    loadingText: '\u00A0',
    styles: {},
    classes: '',
  }

  state = {
    fontSize: '',
    color: '',
    text: '',
    styles: {},
    loading: true,
  }

  formatText = (text) => {
    let newStr = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
    return newStr;
  }

  componentDidMount() {
    fetch(`${CONSTANT.GLOBAL.API}/${this.context.projectID}/${this.props.componentID}`)
      .then(response => response.json())
      .then((resp) => {
        this.setState({
          ...resp,
          loading: false,
        });
        /*
        if (isEmpty(this.state.styles.color) && !isEmpty(this.props.styles.color)) {
          this.setState({
            styles: {
              ...this.state.styles,
              color: this.props.styles.color,
            }
          })
        }
        */
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.error('DynamicDelta [Button] ERROR:', error);
      });
  }

  render() {
    let text = this.formatText(this.state.text)
    return (
      <div>
        <button
          style={this.props.styles}
          className={this.props.classes}
          onClick={this.props.onClick}
        >
          {this.state.loading ? this.props.loadingText : ReactHtmlParser(text)}
        </button>
      </div>
    );
  }
}

export default Button;
