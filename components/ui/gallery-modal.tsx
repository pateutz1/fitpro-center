import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    id: number;
    src: string;
    alt: string;
    title: string;
    description: string;
    category?: string;
  }>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

// Helper functions to reduce cognitive complexity
const getNextIndex = (currentIndex: number, imagesLength: number): number => {
  return currentIndex < imagesLength - 1 ? currentIndex + 1 : 0;
};

const getPrevIndex = (currentIndex: number, imagesLength: number): number => {
  return currentIndex > 0 ? currentIndex - 1 : imagesLength - 1;
};

function CloseIcon() {
  return (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
      <title>Close modal</title>
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

function LeftArrowIcon() {
  return (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
      <title>Previous image</title>
      <path
        d="M15 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
      <title>Next image</title>
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

function ModalHeader({
  currentImage,
  onClose,
}: {
  currentImage: GalleryModalProps['images'][0];
  onClose: () => void;
}) {
  return (
    <div className="absolute top-0 right-0 left-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1 font-bold text-2xl text-white">
            {currentImage.title}
          </h3>
          <p className="text-white/70">{currentImage.description}</p>
        </div>

        <motion.button
          className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CloseIcon />
        </motion.button>
      </div>
    </div>
  );
}

function MainImage({
  currentImage,
  currentIndex,
  isLoading,
  setIsLoading,
}: {
  currentImage: GalleryModalProps['images'][0];
  currentIndex: number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  return (
    <div className="relative flex h-[70vh] w-full items-center justify-center">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="relative h-full w-full"
        exit={{ opacity: 0, x: -100 }}
        initial={{ opacity: 0, x: 100 }}
        key={currentIndex}
        transition={{ duration: 0.3 }}
      >
        <Image
          alt={currentImage.alt}
          className="object-contain"
          fill
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          src={currentImage.src}
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function NavigationButton({
  direction,
  onClick,
  className,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}) {
  const baseClassName =
    '-translate-y-1/2 absolute top-1/2 rounded-full bg-black/50 p-3 transition-colors hover:bg-black/70';
  const positionClassName = direction === 'left' ? 'left-4' : 'right-4';

  return (
    <motion.button
      className={`${baseClassName} ${positionClassName} ${className || ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {direction === 'left' ? <LeftArrowIcon /> : <RightArrowIcon />}
    </motion.button>
  );
}

function ThumbnailNavigation({
  images,
  currentIndex,
  onNavigate,
}: {
  images: GalleryModalProps['images'];
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
              index === currentIndex
                ? 'border-primary ring-2 ring-primary/50'
                : 'border-white/20 hover:border-white/40'
            }`}
            key={image.id}
            onClick={() => onNavigate(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="64px"
              src={image.src}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ImageCounter({
  currentIndex,
  totalImages,
}: {
  currentIndex: number;
  totalImages: number;
}) {
  return (
    <div className="absolute top-6 right-20 rounded-full bg-black/50 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
      {currentIndex + 1} / {totalImages}
    </div>
  );
}

function useKeyboardNavigation(
  isOpen: boolean,
  currentIndex: number,
  imagesLength: number,
  onClose: () => void,
  onNavigate: (index: number) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate(getPrevIndex(currentIndex, imagesLength));
      } else if (e.key === 'ArrowRight') {
        onNavigate(getNextIndex(currentIndex, imagesLength));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, imagesLength, onClose, onNavigate]);
}

export default function GalleryModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: GalleryModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useKeyboardNavigation(
    isOpen,
    currentIndex,
    images.length,
    onClose,
    onNavigate
  );

  if (!(isOpen && images[currentIndex])) {
    return null;
  }

  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    onNavigate(getPrevIndex(currentIndex, images.length));
  };

  const handleNext = () => {
    onNavigate(getNextIndex(currentIndex, images.length));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="relative mx-4 max-h-[90vh] w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-2xl backdrop-blur-xl"
            exit={{ scale: 0.8, opacity: 0 }}
            initial={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ModalHeader currentImage={currentImage} onClose={onClose} />

            <MainImage
              currentImage={currentImage}
              currentIndex={currentIndex}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            <NavigationButton direction="left" onClick={handlePrevious} />
            <NavigationButton direction="right" onClick={handleNext} />

            <ThumbnailNavigation
              currentIndex={currentIndex}
              images={images}
              onNavigate={onNavigate}
            />

            <ImageCounter
              currentIndex={currentIndex}
              totalImages={images.length}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
