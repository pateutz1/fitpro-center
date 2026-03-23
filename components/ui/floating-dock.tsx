'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type: 'link' | 'action' | 'component';
  component?: React.ReactNode;
  external?: boolean;
}

interface FloatingDockProps {
  items?: DockItem[];
  position?:
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'left-center'
    | 'right-center';
  className?: string;
  /** When true, the dock is not fixed-positioned (use inside a parent fixed container). */
  embedded?: boolean;
}

// Helper function to get tooltip positioning
const getTooltipPosition = (position: string) => {
  if (position === 'bottom-right') {
    return '-left-24 -translate-y-1/2 top-1/2 transform';
  }

  if (
    position.includes('center') &&
    (position.includes('left') || position.includes('right'))
  ) {
    if (position.includes('right')) {
      return '-left-24 -translate-y-1/2 top-1/2 transform';
    }
    return '-right-24 -translate-y-1/2 top-1/2 transform';
  }

  return '-top-12 -translate-x-1/2 left-1/2 transform';
};

// Helper function to get tooltip arrow positioning
const getTooltipArrow = (position: string) => {
  if (position === 'bottom-right') {
    return '-translate-y-1/2 top-1/2 left-full transform border-transparent border-t-4 border-b-4 border-l-4 border-l-gray-900/95';
  }

  if (
    position.includes('center') &&
    (position.includes('left') || position.includes('right'))
  ) {
    if (position.includes('right')) {
      return '-translate-y-1/2 top-1/2 left-full transform border-transparent border-t-4 border-b-4 border-l-4 border-l-gray-900/95';
    }
    return '-translate-y-1/2 top-1/2 right-full transform border-transparent border-t-4 border-r-4 border-r-gray-900/95 border-b-4';
  }

  return '-translate-x-1/2 top-full left-1/2 transform border-transparent border-t-4 border-t-gray-900/95 border-r-4 border-l-4';
};

// Helper function to get hover animation
const getHoverAnimation = (position: string) => {
  const isVertical =
    position === 'bottom-right' ||
    (position.includes('center') &&
      (position.includes('left') || position.includes('right')));
  const isRightSide = position === 'bottom-right' || position.includes('right');

  if (isVertical) {
    return { scale: 1.1, x: isRightSide ? -3 : 3 };
  }
  return { scale: 1.1, y: -3 };
};

// Main Button Component - Moved outside to fix nested component issue
interface MainButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ isExpanded, onToggle }) => (
  <motion.button
    aria-label={isExpanded ? 'Close floating dock' : 'Open floating dock'}
    className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-emerald-600 shadow-2xl shadow-primary/40"
    onClick={onToggle}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    type="button"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Animated background */}
    <motion.div
      animate={{
        scale: isExpanded ? 1.05 : 1,
        rotate: isExpanded ? 180 : 0,
      }}
      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/80 to-emerald-500/80"
      transition={{ duration: 0.3 }}
    />

    {/* Glow effect */}
    <div className="absolute inset-0 scale-110 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

    {/* Icon */}
    <motion.div
      animate={{ rotate: isExpanded ? 45 : 0 }}
      className="relative z-10 text-white"
      transition={{ duration: 0.3 }}
    >
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <title>Toggle Menu</title>
        <path
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </motion.div>

    {/* Ripple effect */}
    <motion.div
      animate={{ scale: isExpanded ? 1 : 0, opacity: isExpanded ? 0.3 : 0 }}
      className="absolute inset-0 rounded-2xl bg-white/20"
      initial={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
);

// Dock Item Component - Moved outside and simplified to fix complexity issue
interface DockItemProps {
  item: DockItem;
  position: string;
  hoveredItem: string | null;
  onHover: (id: string | null) => void;
}

const DockItem: React.FC<DockItemProps> = ({
  item,
  position,
  hoveredItem,
  onHover,
}) => {
  const isHovered = hoveredItem === item.id;

  const itemContent = (
    <motion.div
      aria-label={item.label}
      className="group relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gray-900/90 shadow-lg backdrop-blur-xl"
      layoutId={`dock-item-${item.id}`}
      onHoverEnd={() => onHover(null)}
      onHoverStart={() => onHover(item.id)}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      whileHover={getHoverAnimation(position)}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient background on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 scale-110 rounded-xl bg-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative z-10 text-white/80 transition-colors duration-300 group-hover:text-primary">
        {item.icon}
      </div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`absolute z-50 whitespace-nowrap rounded-lg border border-white/20 bg-gray-900/95 px-3 py-1.5 text-white text-xs shadow-xl backdrop-blur-lg ${getTooltipPosition(position)}`}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            key={`tooltip-${item.id}`}
            transition={{ duration: 0.2 }}
          >
            {item.label}
            <div className={`absolute h-0 w-0 ${getTooltipArrow(position)}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (item.type === 'component') {
    return (
      <div className="relative" key={item.id}>
        {item.component}
      </div>
    );
  }

  if (item.type === 'link' && item.href) {
    return (
      <Link
        href={item.href}
        key={item.id}
        rel={item.external ? 'noopener noreferrer' : ''}
        target={item.external ? '_blank' : '_self'}
      >
        {itemContent}
      </Link>
    );
  }

  return (
    <button
      aria-label={item.label}
      className="m-0 border-none bg-transparent p-0"
      key={item.id}
      onClick={item.onClick}
      type="button"
    >
      {itemContent}
    </button>
  );
};

const FloatingDock: React.FC<FloatingDockProps> = ({
  items: customItems,
  position = 'bottom-right',
  className = '',
  embedded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // Default dock items with proper SVG titles
  const defaultItems: DockItem[] = [
    {
      id: 'facebook',
      label: 'Facebook',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Facebook</title>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: 'https://facebook.com',
      type: 'link',
      external: true,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Instagram</title>
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.459 0 4.468 2.01 4.468 4.468s-2.009 4.468-4.468 4.468zm7.519 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.459 0 4.468 2.01 4.468 4.468s-2.009 4.468-4.468 4.468z" />
        </svg>
      ),
      href: 'https://instagram.com',
      type: 'link',
      external: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
        </svg>
      ),
      href: 'https://wa.me/1234567890',
      type: 'link',
      external: true,
    },
    {
      id: 'email',
      label: 'Email',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Email</title>
          <path
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      href: 'mailto:contact@fitprocenter.com',
      type: 'link',
      external: true,
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Phone</title>
          <path
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      href: 'tel:+1234567890',
      type: 'link',
      external: true,
    },
  ];

  const items = customItems || defaultItems;

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'left-center':
        return 'left-6 top-1/2 transform -translate-y-1/2';
      case 'right-center':
        return 'right-6 top-1/2 transform -translate-y-1/2';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getItemLayout = () => {
    // Always use vertical layout for bottom-right position to open upward
    if (
      position === 'bottom-right' ||
      (position.includes('center') &&
        (position.includes('left') || position.includes('right')))
    ) {
      return 'flex-col space-y-2';
    }
    return 'flex-row space-x-2';
  };

  const rootClassName = embedded
    ? `relative z-[9999] ${className}`
    : `fixed z-[9999] ${getPositionClasses()} ${className}`;

  return (
    <div className={rootClassName}>
      <div
        className={`flex items-center ${position === 'bottom-right' ? 'flex-col-reverse space-y-2 space-y-reverse' : getItemLayout()}`}
        ref={dockRef}
      >
        {/* Main toggle button */}
        <MainButton
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />

        {/* Dock items */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className={`flex ${getItemLayout()}`}
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              key="dock-items"
              transition={{ duration: 0.3 }}
            >
              {items.map((item) => (
                <DockItem
                  hoveredItem={hoveredItem}
                  item={item}
                  key={item.id}
                  onHover={setHoveredItem}
                  position={position}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-label="Close floating dock"
            className="-z-10 fixed inset-0 bg-black/20 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsExpanded(false);
              }
            }}
            role="button"
            tabIndex={0}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingDock;
