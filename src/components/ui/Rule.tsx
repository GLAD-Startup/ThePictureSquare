import React from 'react';

interface RuleProps {
  className?: string;
  variant?: 'rule' | 'gold' | 'gold-subtle';
  ariaHidden?: boolean;
}

/**
 * Editorial hairline divider.
 */
export const Rule: React.FC<RuleProps> = ({
  className = '',
  variant = 'rule',
  ariaHidden = true,
}) => {
  let variantStyle = 'h-[1px] w-full bg-rule';
  if (variant === 'gold') {
    variantStyle = 'w-full gold-hairline';
  } else if (variant === 'gold-subtle') {
    variantStyle = 'w-full gold-hairline-subtle';
  }

  return (
    <div
      className={`${variantStyle} ${className}`}
      aria-hidden={ariaHidden}
      role={ariaHidden ? 'presentation' : 'separator'}
    />
  );
};

export default Rule;
