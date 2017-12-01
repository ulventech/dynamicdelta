import React from 'react';
import PropTypes from 'prop-types';

export class DynamicDelta extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

DynamicDelta.propTypes = {
  projectID: PropTypes.string.isRequired,
};

export default DynamicDelta;
