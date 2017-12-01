import React from 'react';
import PropTypes from 'prop-types';

export default function createInstantSearch() {
  return class CreateInstantSearch extends React.Component {
    static propTypes = {
      projectID: PropTypes.string.isRequired,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    };

    render() {
      return (
        <InstantSearch
          projectID={this.props.projectID}
        >
          {this.props.children}
        </InstantSearch>
      );
    }
  };
}
