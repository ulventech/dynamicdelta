import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import CONSTANT from '../../constant';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

class UL extends React.Component {
  static contextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  static propTypes = {
    componentID: PropTypes.string.isRequired,
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
        console.error('DynamicDelta [UL] ERROR:', error);
      });
  }

  render() {
      const listItems = this.state.text
    return (
      <div>
        <ul
          style={this.props.styles}
          className={this.props.classes}
        >
          {this.state.loading ? this.props.loadingText : this.state.text.map((items, index) => (
            <li key={index}>{items}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UL;
