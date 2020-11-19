import React, { useRef, useState, useMemo } from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';
import styles from './index.module.scss';

const TextFormatter = ({ text }) => {
  const element = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasMoreText = useMemo(() => {
    return element.current?.scrollHeight > element.current?.clientHeight;
  }, [element.current]);

  const textWrapperCN = classnames(
    styles.textWrapper,
    isOpen && styles.expanded,
  );

  const onToggle = () => {
    if (!hasMoreText) return;
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex justify-content-between" onClick={onToggle}>
      <div className={styles.iconWrapper}>
        { hasMoreText && !isOpen && <i className="material-icons">expand_more</i> }
        { hasMoreText && isOpen && <i className="material-icons">expand_less</i> }
      </div>
      <div ref={element} className={textWrapperCN}>
        { text }
      </div>
    </div>
  );
};

TextFormatter.propTypes = {
  text: string.isRequired,
};

export default TextFormatter;
