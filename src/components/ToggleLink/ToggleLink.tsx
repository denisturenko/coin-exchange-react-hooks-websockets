import React from 'react';
import styles from './ToggleLink.module.css';

interface ToggleLinkProps {
  showPrimary: boolean;
  primaryText: string;
  secondText: string;
  onToggle: () => void;
}

const ToggleLink: React.FC<ToggleLinkProps> = ({ showPrimary, onToggle, primaryText, secondText }) => {
  return (
    <span onClick={onToggle} className={styles.root}>
      {showPrimary ? primaryText : secondText}
    </span>
  );
};

export default React.memo(ToggleLink);
