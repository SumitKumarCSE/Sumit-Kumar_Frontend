import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  children,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {children}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  if (!items) {
    return null; // or return an error message or a loading indicator
  }

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          index={index}
          isSelected={selectedIndex === index}
          key={index}
        >
          {item.component || item.text}
        </SingleListItem>
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    component: PropTypes.node,
  })),
};

WrappedListComponent.defaultProps = {
  items: [
    {text: 'one'},
    {text: 'two'},
    {text: 'three'},
    {text: 'four'},
  ],
};

const List = memo(WrappedListComponent);

export default List;
