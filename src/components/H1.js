import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';


export class H1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: '',
      color: '',
      text: '',
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
        });
        if (!isEmpty(this.props.styles.color) || !isNull(this.props.styles.color)){
          this.props.styles[color] = this.state.color;
          }
        if (!isEmpty(this.props.styles.fontSize) || !isNull(this.props.styles.fontSize)){
            this.props.styles[fontSize] = this.state.fontSize;
          }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.error('DDP ERROR:', error);
      });
      console.log(this.props.styles.color)
      console.log(this.props.styles)
      console.log(this.props.styles[color])
  }

  render() {
    let text = this.formatText(this.state.text)
    return (
      <div>
        <h1
        style={this.props.styles}
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
