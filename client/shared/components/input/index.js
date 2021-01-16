import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/FormControl';
import cx from 'classnames';
import styles from './index.module.scss';
import IconBlock from './iconBlock';

/**
 * Simple Usage
 *
 *<UAInput
 *
 * placeholder="Type Something"
 * value="test"
 * size="lg"
 * errorMessage="Good For You"
 * isValid={false}
 * disabled={false}
 * append={{ icon: 'hd', action: () => {} }}
 * prepend={{ icon: 'hd', action: () => {} }}
 * />
*/

const UAInput = (props) => {
  const {
    append,
    prepend,
    className,
    size,
    ...inputProps
  } = props;

  const onIconClick = (event, variant) => {
    if (props.disabled) return;
    props[variant] && props[variant].action(event);
  };

  const inputClasses = cx(
    styles.ua_input,
    prepend.icon && styles.hasprepend,
    append.icon && styles.hasappend,
    className
  );

  return (
    <div className={styles.ua_input_container}>
      { prepend.icon && (
        <IconBlock
          onClick={onIconClick}
          icon={prepend.icon}
          variant="prepend"
          size={size}
        />
      )}

      <FormControl
        {...inputProps}
        size={size}
        className={inputClasses}
      />

      { append.icon && (
        <IconBlock
          onClick={onIconClick}
          icon={append.icon}
          variant="append"
          size={size}
        />
      )}
    </div>
  );
};

UAInput.propTypes = {
  size: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  append: PropTypes.shape({
    icon: PropTypes.string,
    action: PropTypes.func,
  }),
  prepend: PropTypes.shape({
    icon: PropTypes.string,
    action: PropTypes.func,
  }),
};

UAInput.defaultProps = {
  size: 'md',
  disabled: false,
  className: '',
  append: {
    action: () => {},
  },
  prepend: {
    action: () => {},
  },
};

export default UAInput;
