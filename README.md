# Sumit-Kumar_Frontend

## Q1: Explain what the simple List component does.

A: Simple list is a functional component that renders a simple list of items with selectable single items. The list component takes an array of items as a prop and maps through them to render a list of `SingleListItem` components. Each `SingleListItem` component renders a list item with the item's text and a background color that changes based on whether the item is selected or not.

When a `SingleListItem` is clicked, the handClick function is called with the item's index, which sets the `selectedIndex` state variable to the clicked index. This causes the corresponding item to change its background color to green, and all the other items to change their background color to red.

The `useEffect` hook with the dependency on the items array sets the `selectedIndex` to null every time the items array changes.

Both `SingleListItem` and `WrappedListComponent` are memoized components, which means they will only re-render when their props have changed. This helps to optimize performance by avoiding unnecessary re-renders.

The list component exports the `WrappedListComponent` as a memoized component. This allows the list component to re-render only when its props have changed, which also helps to optimize performance.

## Q2: What problems / warnings are there with code?

A: 1. Syntax error in useState() of WrappedListComponent `const [setSelectedIndex, selectedIndex] = useState();`. The correct method is `const [selectedIndex, setSelectedIndex] = useState();` because the useState hook returns an array with two elements, the first one being the state value and the second one being the function to update that state value.

2. The onClickHandler should be passed as an arrow function in WrappedSingleListItem component  `onClick={onClickHandler(index)}`. The correct way is `onClick={() => onClickHandler(index)}` because the onClick handler is being called immediately when the component is rendered instead of when the component is clicked.

3. The propType for the items prop is incorrect. In this arrayof should be used instead of array and shape should be used instead of shapeOf.
```javascript
WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shapeOf({
    text: PropTypes.string.isRequired,
  })),
};
```

4. The isSelected prop in the WrappedSingleListItem component is expected to be a boolean but is being passed the selectedIndex state value, which is a number. So, we need to pass a bool value `isSelected={selectedIndex}` change it to `isSelected={selectedIndex === index}`

5. Every time when the items prop changes the WrappedListComponent component sets the selectedIndex state to null. This may cause the component to lose its selection state every time the list is updated. It is better to only reset the selectedIndex state when the list is completely changed.

## Q3: Please fix, optimize, and/or modify the component as much as you think is necessary.

```javascript
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
    return null;
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

// take example
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

```

Initially when no list item is selected:
![Screenshot (2149)](https://user-images.githubusercontent.com/102703158/233797955-d3c78c9f-965d-4f05-a84a-441f1de19fb9.png)


Second list item is selected:
![Screenshot (2150)](https://user-images.githubusercontent.com/102703158/233797975-ab1ae1c2-99b3-4cf6-99ef-956ad8b1ecb8.png)



