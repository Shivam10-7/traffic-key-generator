import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);

  const springProps = useSpring({
    left: position.x,
    top: position.y,
    config: { tension: 250, friction: 20 }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as Element;
      if (target instanceof HTMLElement) {
        const fontSize = window.getComputedStyle(target).fontSize;
        const parsedSize = parseInt(fontSize);
        
        // Check if the element is a button, flashcard, or text
        const isButton = target.tagName.toLowerCase() === 'button' || target.closest('button');
        const isFlashcard = target.classList.contains('flashcard') || target.closest('.flashcard');
        
        if (isButton || isFlashcard) {
          setCursorSize(40); // Larger size for buttons and flashcards
        } else {
          // Set cursor size relative to font size, with a minimum of 20px
          setCursorSize(Math.max(parsedSize * 1.5, 20));
        }
      } else {
        setCursorSize(20); // Default size when not over text
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <animated.div
      style={{
        ...springProps,
        position: 'fixed',
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        borderRadius: '50%',
        // Using white color for the cursor
        background: 'white',
        // mixBlendMode: 'difference' inverts the colors underneath the cursor
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s'
      }}
    />
  );
};

export default AnimatedCursor;