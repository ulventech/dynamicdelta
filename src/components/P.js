import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';

class P extends React.Component {
  state = {
    text: '',
    loading: true,
  }

  formatText = (text) => {
    let newStr = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
    newStr = newStr.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    newStr = newStr.replace(/~~(.*?)~~/g, "<i>$1</i>");

    //Format for Markdown(Extrnal Links)
    newStr = newStr.replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
    newStr = newStr.replace(/(?: |^)(https?\:\/\/[a-zA-Z0-9/.(]+)/g, '<a href="$1" target="_blank">$1</a>');

    //Format for Markdown(Internal Links)
    newStr = newStr.replace(/\[(.+?)\]\((\/?.+?)\)/g, '<a href="/#$2">$1</a>');

    // //Change email addresses to mailto:: links.
    const expression3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    newStr = newStr.replace(expression3, '<a href="mailto:$1">$1</a>');

    return newStr;
}


  componentDidMount() {
    fetch(`${CONSTANT.GLOBAL.API}/${this.context.projectID}/${this.props.componentID}`)
      .then(response => response.json())
      .then((resp) => {
        this.setState({
          loading: false,
          text: resp.text || ' ',
        });
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
      <p
        style={this.props.styles}
        className={this.props.classes}
      >

        {this.state.loading ? this.props.loadingText : ReactHtmlParser(text)}
      </p>
    );
  }
}

P.contextTypes = {
  projectID: PropTypes.string.isRequired,
};

P.propTypes = {
  componentID: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
  styles: PropTypes.object,
  classes: PropTypes.string,
};

P.defaultProps = {
  loadingText: '\u00A0',
  styles: {},
  classes: '',
};

export default P;
