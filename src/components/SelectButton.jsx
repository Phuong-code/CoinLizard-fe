import PropTypes from 'prop-types';

// SelectButton component - a custom button used for selecting options
const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span onClick={onClick} className={`selectButton ${selected ? 'selected' : ''}`}>
      {children}
    </span>
  );
};

// Define PropTypes for the SelectButton component
SelectButton.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SelectButton;
