import PropTypes from 'prop-types';

export const contextTypes = {
  projectID: PropTypes.string.isRequired,
}

export const propTypes = {
  componentID: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  className: PropTypes.string,
  itemProp: PropTypes.string,
};

export const defaultProps = {
  style: {},
  className: '',
};
