'use client';

import { useEffect, useState } from 'react';

// Real paw print SVG path
const PAW = (
  <g>
    <ellipse cx="15" cy="25" rx="5.5" ry="7"/>
    <ellipse cx="29" cy="25" rx="5.5" ry="7"/>
    <ellipse cx="22" cy="18" rx="5" ry="6.5"/>
    <ellipse cx="12" cy="14" rx="3.5" ry="5"/>
    <ellipse cx="32" cy="14" rx="3.5" ry="5"/>
  </g>
);

export function PawTrail() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // How many paw pairs to reveal based on scroll
  const stepsRevealed = Math.floor(scrollY / 60);

  // Generate steps that follow a path down the page
  const steps = [];
  for (let i = 0; i < 80; i++) {
    const isLeft = i % 2 === 0;
    // Zigzag from left to right across the page
    const baseX = 50 + Math.sin(i * 0.3) * 35;
    const x = isLeft ? baseX - 4 : baseX + 4;
    const y = 120 + i * 110; // pixels from top of document
    const rotation = Math.sin(i * 0.3) * 30 + (isLeft ? -12 : 12);
    steps.push({ x, y, rotation, isLeft, visible: i < stepsRevealed });
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {steps.map((step, i) => (
        <svg
          key={i}
          viewBox="0 0 44 36"
          width="26"
          height="22"
          style={{
            position: 'absolute',
            left: `${step.x}%`,
            top: `${step.y}px`,
            transform: `translate(-50%, -50%) rotate(${step.rotation}deg) scale(${step.visible ? 1 : 0})`,
            opacity: step.visible ? 0.045 : 0,
            transition: `opacity 0.6s ease, transform 0.6s ease`,
            fill: '#1a1a1a',
          }}
        >
          {PAW}
        </svg>
      ))}
    </div>
  );
}
