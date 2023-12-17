// eslint-disable-next-line react/prop-types
const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span onClick={onClick} className={`selectButton ${selected ? 'selected' : ''}`}>
      {children}
    </span>
  );
};

export default SelectButton;
