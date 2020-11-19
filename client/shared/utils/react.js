import { Children, isValidElement, cloneElement } from 'react';

/**
 * Clones children and passes provided properties
 * @param {Array<component>|component} children react components
 * @param {Object} props Properties to be passes to each child
 */
export const cloneChildren = (children, props) => {
  return Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });
};
