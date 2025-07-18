import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  shadow = 'shadow-material-2',
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-white dark:bg-gray-800
        rounded-lg
        ${shadow}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;