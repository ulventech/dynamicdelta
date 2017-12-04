import React from 'react';
import PropTypes from 'prop-types';

export class DynamicDelta extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  getChildContext() {
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

DynamicDelta.childContextTypes = {
  projectID: PropTypes.string
};

DynamicDelta.propTypes = {
  projectID: PropTypes.string.isRequired,
};

export default DynamicDelta;
