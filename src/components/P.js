import React from 'react';
import PropTypes from 'prop-types';
import CONSTANT from '../constant';
export class P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loading: true,
    };
  }

  formatText = (text) => {
    let newStr = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    newStr = newStr.replace(expression, "<a href='$1'>$1</a>")
    newStr = newStr.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") 
    newStr = newStr.replace(/~~(.*?)~~/g, "<i>$1</i>") 
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
      
        {this.state.loading ? this.props.loadingText : text}
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
