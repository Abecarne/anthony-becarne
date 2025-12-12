import React, { useEffect, useId, useMemo, useRef } from 'react';

interface MeshBackgroundProps {
  className?: string;
  gridSize?: number;
  squareSize?: number;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

type VertexMeta = {
  index: number;
  baseX: number;
  baseY: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  row: number;
  col: number;
};

type PointerState = {
  x: number;
  targetX: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  intensity: number;
  active: boolean;
};

const MeshBackground: React.FC<MeshBackgroundProps> = ({
  className = '',
  gridSize = 25,
  squareSize = 50,
  strokeColor = '#2563eb',
  strokeWidth = 0.6,
  opacity = 0.8
}) => {
  // Calculer les dimensions du SVG basées sur la taille de la grille
  const svgWidth = gridSize * squareSize;
  const svgHeight = gridSize * squareSize;
  const patternId = useId().replace(/:/g, '');
  const jitterRange = 15;
  const dimension = gridSize + 1;

  const { verticesGrid, verticesFlat } = useMemo(() => {
    const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

    const grid: VertexMeta[][] = [];

    const flat: VertexMeta[] = [];

    let globalIndex = 0;

    for (let row = 0; row <= gridSize; row++) {
      const rowEntries: VertexMeta[] = [];

      for (let col = 0; col <= gridSize; col++) {
        const baseX = col * squareSize;
        const baseY = row * squareSize;
        const phaseX = Math.random() * Math.PI * 2;
        const phaseY = Math.random() * Math.PI * 2;
        const speedX = randomBetween(0.3, 0.8);
        const speedY = randomBetween(0.44, 0.75);

        const entry = {
          index: globalIndex,
          baseX,
          baseY,
          phaseX,
          phaseY,
          speedX,
          speedY,
          row,
          col,
        };

        rowEntries.push(entry);
        flat.push(entry);
        globalIndex += 1;
      }

      grid.push(rowEntries);
    }

    return { verticesGrid: grid, verticesFlat: flat };
  }, [gridSize, squareSize]);

  const circleRefs = useRef<Array<SVGCircleElement | null>>([]);
  const horizontalRefs = useRef<Array<SVGPolylineElement | null>>([]);
  const verticalRefs = useRef<Array<SVGPolylineElement | null>>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointerRef = useRef<PointerState>({
    x: svgWidth / 2,
    y: svgHeight / 2,
    targetX: svgWidth / 2,
    targetY: svgHeight / 2,
    vx: 0,
    vy: 0,
    intensity: 0,
    active: false,
  });

  useEffect(() => {
    pointerRef.current.x = svgWidth / 2;
    pointerRef.current.y = svgHeight / 2;
    pointerRef.current.targetX = svgWidth / 2;
    pointerRef.current.targetY = svgHeight / 2;
  }, [svgWidth, svgHeight]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (event: PointerEvent) => {
      const svgElement = svgRef.current;
      if (!svgElement) return;

      const rect = svgElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      if (xRatio < 0 || xRatio > 1 || yRatio < 0 || yRatio > 1) {
        pointerRef.current.active = false;
        return;
      }

  const mappedX = xRatio * svgWidth;
  const mappedY = yRatio * svgHeight;

      const state = pointerRef.current;

      state.targetX = mappedX;
      state.targetY = mappedY;
      state.intensity = Math.min(1, state.intensity * 0.8 + 0.2);
      state.active = true;
    };

    const handlePointerLeave = () => {
      const state = pointerRef.current;
      state.active = false;
      state.targetX = svgWidth / 2;
      state.targetY = svgHeight / 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointercancel', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointercancel', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, [svgWidth, svgHeight]);

  useEffect(() => {
    if (!verticesFlat.length) return;

    const totalVertices = verticesFlat.length;
    const currentPositions = new Array<{ x: number; y: number }>(totalVertices);
    let animationFrame: number;
    const pointer = pointerRef.current;
    const pointerRadiusBase = Math.min(svgWidth, svgHeight) * 0.2;
    let lastTimestamp = performance.now();

    const update = (timestamp: number) => {
      const deltaSeconds = Math.max((timestamp - lastTimestamp) / 1000, 1 / 120);
      lastTimestamp = timestamp;
      const frameRatio = Math.min(deltaSeconds / (1 / 60), 2);
      const timeSeconds = timestamp / 1000;

      const centerX = svgWidth / 2;
      const centerY = svgHeight / 2;

      if (!pointer.active) {
        pointer.targetX += (centerX - pointer.targetX) * 0.05 * frameRatio;
        pointer.targetY += (centerY - pointer.targetY) * 0.05 * frameRatio;
      }

      const previousX = pointer.x;
      const previousY = pointer.y;
      const followStrength = Math.min((pointer.active ? 0.22 : 0.1) * frameRatio, 0.45);
      pointer.x += (pointer.targetX - pointer.x) * followStrength;
      pointer.y += (pointer.targetY - pointer.y) * followStrength;

      const velocityX = pointer.x - previousX;
      const velocityY = pointer.y - previousY;
      const velocityBlend = Math.min(0.35 * frameRatio, 0.8);
      pointer.vx = pointer.vx * (1 - velocityBlend) + velocityX * velocityBlend;
      pointer.vy = pointer.vy * (1 - velocityBlend) + velocityY * velocityBlend;

      if (pointer.active) {
        const growth = Math.min(0.12 * frameRatio, 0.25);
        pointer.intensity = Math.min(1, pointer.intensity * (1 - growth) + growth);
      } else {
        const decay = Math.pow(0.88, frameRatio);
        pointer.intensity *= decay;
        pointer.vx *= decay;
        pointer.vy *= decay;
      }

      if (pointer.intensity < 0.001) {
        pointer.intensity = 0;
      }

      const pointerRadius = pointerRadiusBase * (0.7 + pointer.intensity * 0.45);

      verticesFlat.forEach((vertex) => {
        const offsetX = Math.sin(timeSeconds * vertex.speedX + vertex.phaseX) * jitterRange;
        const offsetY = Math.cos(timeSeconds * vertex.speedY + vertex.phaseY) * jitterRange;
        let x = vertex.baseX + offsetX;
        let y = vertex.baseY + offsetY;

        if (pointer.intensity > 0.001) {
          const dx = pointer.x - vertex.baseX;
          const dy = pointer.y - vertex.baseY;
          const distance = Math.hypot(dx, dy) || 0.0001;
          const falloff = Math.max(0, 1 - distance / pointerRadius);

          if (falloff > 0) {
            const influence = pointer.intensity * falloff * falloff * falloff;
            const dirX = dx / distance;
            const dirY = dy / distance;
            const tangentX = -dirY;
            const tangentY = dirX;

            const pullStrength = influence * 7.5;
            const ripple = Math.sin(distance * 0.045 - timeSeconds * 1.8) * 3.2 * influence;
            const swirlVelocity = pointer.vx * tangentX + pointer.vy * tangentY;
            const swirlStrength = swirlVelocity * 4.2 * influence;

            let offsetInfluenceX = dirX * (pullStrength + ripple) + tangentX * (swirlStrength + pointer.vy * 0.4 * influence);
            let offsetInfluenceY = dirY * (pullStrength + ripple) + tangentY * (swirlStrength - pointer.vx * 0.4 * influence);

            const maxDisplacement = jitterRange * 1.4 + pointerRadius * 0.2;
            const displacement = Math.hypot(offsetInfluenceX, offsetInfluenceY);
            if (displacement > maxDisplacement) {
              const scale = maxDisplacement / displacement;
              offsetInfluenceX *= scale;
              offsetInfluenceY *= scale;
            }

            x += offsetInfluenceX;
            y += offsetInfluenceY;
          }
        }

        const previousPosition = currentPositions[vertex.index];
        if (previousPosition) {
          const smoothing = pointer.intensity > 0.2 ? 0.6 : 0.75;
          x = previousPosition.x + (x - previousPosition.x) * smoothing;
          y = previousPosition.y + (y - previousPosition.y) * smoothing;
        }

        currentPositions[vertex.index] = { x, y };

        const circle = circleRefs.current[vertex.index];
        if (circle) {
          circle.setAttribute('cx', x.toFixed(2));
          circle.setAttribute('cy', y.toFixed(2));
        }
      });

      for (let row = 0; row < dimension; row++) {
        let points = '';

        for (let col = 0; col < dimension; col++) {
          const pos = currentPositions[row * dimension + col];
          if (pos) {
            points += `${pos.x.toFixed(2)},${pos.y.toFixed(2)} `;
          }
        }

        const polyline = horizontalRefs.current[row];
        if (polyline) {
          polyline.setAttribute('points', points.trim());
        }
      }

      for (let col = 0; col < dimension; col++) {
        let points = '';

        for (let row = 0; row < dimension; row++) {
          const pos = currentPositions[row * dimension + col];
          if (pos) {
            points += `${pos.x.toFixed(2)},${pos.y.toFixed(2)} `;
          }
        }

        const polyline = verticalRefs.current[col];
        if (polyline) {
          polyline.setAttribute('points', points.trim());
        }
      }

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [verticesFlat, dimension, jitterRange, svgWidth, svgHeight]);

  const renderGridLines = () => {
    const lines: React.ReactNode[] = [];

    verticesGrid.forEach((rowEntries, rowIndex) => {
      const points = rowEntries
        .map((vertex) => `${vertex.baseX.toFixed(2)},${vertex.baseY.toFixed(2)}`)
        .join(' ');

      lines.push(
        <polyline
          key={`horizontal-${rowIndex}`}
          ref={(element) => {
            horizontalRefs.current[rowIndex] = element;
          }}
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      );
    });

    for (let colIndex = 0; colIndex < dimension; colIndex++) {
      const columnPoints = verticesGrid
        .map((rowEntries) => {
          const vertex = rowEntries[colIndex];
          return `${vertex.baseX.toFixed(2)},${vertex.baseY.toFixed(2)}`;
        })
        .join(' ');

      lines.push(
        <polyline
          key={`vertical-${colIndex}`}
          ref={(element) => {
            verticalRefs.current[colIndex] = element;
          }}
          points={columnPoints}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      );
    }

    return lines;
  };

  const renderVertices = () =>
    verticesFlat.map((vertex) => (
      <circle
        key={`vertex-${vertex.index}`}
        ref={(element) => {
          circleRefs.current[vertex.index] = element;
        }}
        cx={vertex.baseX}
        cy={vertex.baseY}
        r={2}
        fill={strokeColor}
        opacity={opacity * 1.5}
      />
    ));

  return (
    <div className={`mesh-background ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Définir un pattern pour répéter le maillage */}
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            {/* Lignes du maillage */}
            {renderGridLines()}
            {/* Sommets du maillage */}
            {renderVertices()}
          </pattern>
        </defs>
        
        {/* Appliquer le pattern sur tout le rectangle */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    </div>
  );
};

export default MeshBackground;
