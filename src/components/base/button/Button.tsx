// src/components/ui/button/Button.tsx
import type { ReactNode } from 'react';

import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types.ts';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isActive = false,
  isLoading = false,
  className = '',
  disabled,
  type = 'button',
  ...restProps
}: ButtonProps): ReactNode => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    isActive ? styles.active : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? <span>Loading...</span> : children}
    </button>
  );
};
