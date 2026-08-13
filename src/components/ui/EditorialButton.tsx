import React from 'react';
import { motion } from 'framer-motion';

interface EditorialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  dataCursor?: string;
}

export const EditorialButton: React.FC<EditorialButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  dataCursor,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-[10px] tracking-[0.22em]',
    md: 'px-8 py-3.5 text-[11px] tracking-[0.25em]',
    lg: 'px-10 py-4 text-[12px] tracking-[0.28em]',
  }[size];

  const baseStyle = "relative inline-flex items-center justify-center font-sans font-semibold uppercase transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden group";

  let variantStyle = '';
  if (variant === 'primary') {
    variantStyle = "bg-[#141413] text-[#F6F4EE] hover:bg-[#20201E] shadow-sm";
  } else if (variant === 'outline') {
    variantStyle = "border border-[#141413]/25 text-[#141413] hover:border-[#B89B72] hover:text-[#141413] bg-transparent";
  } else if (variant === 'text') {
    variantStyle = "p-0 bg-transparent text-[#141413] hover:text-[#141413]";
  }

  const content = (
    <motion.span
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variant === 'text' ? '' : sizeClasses} ${variantStyle} ${className}`}
      data-cursor={dataCursor}
    >
      {/* Background Fill / Hover Accent */}
      {variant === 'outline' && (
        <span className="absolute inset-0 bg-[#B89B72]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
      )}

      <span className="relative z-10 flex items-center gap-3">
        {children}
        <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>

      {/* Gold underline for text variant */}
      {variant === 'text' && (
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B89B72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]" />
      )}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" data-cursor={dataCursor}>
        {content}
      </a>
    );
  }

  return (
    <button {...props} data-cursor={dataCursor}>
      {content}
    </button>
  );
};
