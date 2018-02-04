import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

class H1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: '',
      color: '',
      text: '',
      styles: {},
      loading: true,
    };
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
          loading: false,
          fontSize: resp.fontSize,
          color: resp.color,
          text: resp.text || ' ',
          styles: this.props.styles,
        });
        if (!isEmpty(this.state.color) || !isNull(this.state.color)){
          const styles = this.state.styles;
          styles[color] = this.state.color,
          this.setState({styles})
          }
        if (!isEmpty(this.state.fontSize) || !isNull(this.state.fontSize)){
          const styles = this.state.styles;
          styles[fontSize] = this.state.fontSize,
          this.setState({styles})
          }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.error('DDP ERROR:', error);
      });
  }

  render() {
    let text = this.formatText(this.state.text)
    return (
      <div>
        <h1
        style={this.state.styles}
        className={this.props.classes}
      >
        {this.state.loading ? this.props.loadingText : ReactHtmlParser(text)}
      </h1>
      </div>
    );
  }
}

H1.contextTypes = {
  projectID: PropTypes.string.isRequired,
};

H1.propTypes = {
  componentID: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
  styles: PropTypes.object,
  classes: PropTypes.string,
};

H1.defaultProps = {
  loadingText: '\u00A0',
  styles: {},
  classes: '',
};

export default H1;
