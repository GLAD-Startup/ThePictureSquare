import React from 'react';

interface ShellProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer';
  id?: string;
}

/**
 * Global layout shell container.
 * Enforces max-width 1560px and responsive horizontal padding (20px / 40px / 72px).
 */
export const Shell: React.FC<ShellProps> = ({
  children,
  className = '',
  as: Component = 'div',
  id,
}) => {
  return (
    <Component
      id={id}
      className={`w-full max-w-[1560px] mx-auto px-5 sm:px-10 lg:px-[72px] ${className}`}
    >
      {children}
    </Component>
  );
};

export default Shell;
