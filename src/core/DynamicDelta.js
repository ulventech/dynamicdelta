import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export class DynamicDelta extends React.Component {
  static childContextTypes = {
    projectID: PropTypes.string.isRequired,
  }

  static propTypes = {
    projectID: PropTypes.string.isRequired,
  }

  getChildContext() {
    if (isEmpty(this.props.projectID)) {
      console.error('DynamicDelta: projectID is required')
    }
    return { projectID: this.props.projectID };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default DynamicDelta;
