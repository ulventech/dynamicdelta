import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { contextTypes, propTypes, defaultProps } from '../props/P';
import { isNull, isEmpty } from 'lodash';
import { CDNURL } from '../utils';

class P extends React.Component {
  static contextTypes = contextTypes;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    text: '',
    style: {},
    loading: true,
    error: null,
  }

  formatText = (text) => {
    let newStr = text.replace(/(?:\r\n|\r|\n)/g, "<br />");
    //Format for bold text **Your Text Here**
    newStr = newStr.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    //Format for italic text ~~Your Text Here~~
    newStr = newStr.replace(/~~(.*?)~~/g, "<i>$1</i>");

    /*Format for Markdown(Extrnal Links) [YourTextHere](LinkHere)
    E.g. [Google](https://www.google.com) 
    */
    newStr = newStr.replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
    newStr = newStr.replace(/(?: |^)(https?\:\/\/[a-zA-Z0-9/.(]+)/g, '<a href="$1" target="_blank">$1</a>');

    /*Format for Markdown(Internal Links) [YourTextHere](RouteHere)
    E.g. [Apply Here](careers) will become http://localhost:3000/#/careers
    */
    newStr = newStr.replace(/\[(.+?)\]\((\/?.+?)\)/g, '<a href="/#$2">$1</a>');

    //Change email addresses to mailto:: links.
    const expression3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    newStr = newStr.replace(expression3, '<a href="mailto:$1">$1</a>');

    /*Change phone numbers to tel links. [Your own format number here][+6512345678]
    E.g. [(65) 1234 5678][+6512345678]
    */
    const expression4 = /\[(.+?)\]\((\/?.+?)\)/g
    newStr = newStr.replace(expression4, '<a href="tel:$2">$1</a>');
    return newStr;
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
      console.error('DynamicDelta [P] ERROR:', error);
      this.setState({
        error: error,
        loading: false,
      });
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
      <p
        style={styles}
        className={className}
        itemProp={itemProp}
      >
        {this.state.loading ? this.props.loadingText : ReactHtmlParser(text)}
      </p>
    );
  }
}

export default P;
