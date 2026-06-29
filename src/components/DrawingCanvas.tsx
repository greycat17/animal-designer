'use client';

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';

/* ---------- types ---------- */
export interface Point {
  x: number;
  y: number;
}

export interface StrokeData {
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

/* ---------- helpers ---------- */
function drawSmoothStroke(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  color: string,
  lineWidth: number,
  isEraser: boolean,
) {
  if (points.length < 2) return;

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = lineWidth;

  if (isEraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = color;
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  if (points.length === 2) {
    ctx.lineTo(points[1].x, points[1].y);
  } else {
    for (let i = 1; i < points.length - 1; i++) {
      const mx = (points[i].x + points[i + 1].x) / 2;
      const my = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
    }
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  ctx.stroke();
  ctx.restore();
}

function redrawAll(
  ctx: CanvasRenderingContext2D,
  strokes: StrokeData[],
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);
  for (const s of strokes) {
    drawSmoothStroke(ctx, s.points, s.color, s.width, s.isEraser);
  }
}

/* ---------- component ---------- */
interface DrawingCanvasProps {
  strokes: StrokeData[];
  setStrokes: React.Dispatch<React.SetStateAction<StrokeData[]>>;
  isDrawMode: boolean;
  drawColor: string;
  brushSize: number;
}

const DrawingCanvas = forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  function DrawingCanvas(
    { strokes, setStrokes, isDrawMode, drawColor, brushSize },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const drawingRef = useRef(false);
    const currentPointsRef = useRef<Point[]>([]);
    const strokesRef = useRef<StrokeData[]>([]);
    strokesRef.current = strokes;
    /* track canvas buffer size to avoid unnecessary resets */
    const bufferSizeRef = useRef({ w: 0, h: 0 });

    /* resize canvas to match container — only reset buffer when size actually changes */
    const syncSize = useCallback(() => {
      const canvas = (ref as React.RefObject<HTMLCanvasElement | null>).current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;

      const prev = bufferSizeRef.current;
      if (prev.w === w && prev.h === h) return; // no change → skip

      bufferSizeRef.current = { w, h };
      canvas.width = w;
      canvas.height = h;
      /* redraw existing strokes after buffer reset */
      const ctx = canvas.getContext('2d');
      if (ctx) redrawAll(ctx, strokesRef.current, w, h);
    }, []);

    useEffect(() => {
      syncSize();
      window.addEventListener('resize', syncSize);
      return () => window.removeEventListener('resize', syncSize);
    }, [syncSize]);

    /* re-render strokes when they change externally (e.g. undo / clear) */
    useEffect(() => {
      const canvas = (ref as React.RefObject<HTMLCanvasElement | null>).current;
      if (!canvas) return;
      if (canvas.width <= 0 || canvas.height <= 0) return;
      const ctx = canvas.getContext('2d');
      if (ctx) redrawAll(ctx, strokes, canvas.width, canvas.height);
    }, [strokes, ref]);

    /* pointer handlers */
    function getPos(e: ReactPointerEvent<HTMLCanvasElement>): Point {
      const canvas = (ref as React.RefObject<HTMLCanvasElement | null>).current!;
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onPointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
      if (!isDrawMode) return;
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
      drawingRef.current = true;
      const p = getPos(e);
      currentPointsRef.current = [p];
    }

    function onPointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
      if (!isDrawMode || !drawingRef.current) return;
      const canvas = (ref as React.RefObject<HTMLCanvasElement | null>).current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const p = getPos(e);
      currentPointsRef.current.push(p);
      const pts = currentPointsRef.current;
      const len = pts.length;

      /* draw incremental segment */
      if (len >= 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = brushSize;
        if (brushSize > 20) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = drawColor;
        }
        ctx.beginPath();
        if (len === 2) {
          ctx.moveTo(pts[0].x, pts[0].y);
          ctx.lineTo(pts[1].x, pts[1].y);
        } else {
          const prev = pts[len - 3] ?? pts[len - 2];
          const cur = pts[len - 2];
          const next = pts[len - 1];
          const mx1 = (prev.x + cur.x) / 2;
          const my1 = (prev.y + cur.y) / 2;
          const mx2 = (cur.x + next.x) / 2;
          const my2 = (cur.y + next.y) / 2;
          ctx.moveTo(mx1, my1);
          ctx.quadraticCurveTo(cur.x, cur.y, mx2, my2);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    function onPointerUp() {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      if (currentPointsRef.current.length > 0) {
        setStrokes((prev) => [
          ...prev,
          {
            points: [...currentPointsRef.current],
            color: drawColor,
            width: brushSize,
            isEraser: brushSize > 20,
          },
        ]);
      }
      currentPointsRef.current = [];
    }

    return (
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          pointerEvents: isDrawMode ? 'auto' : 'none',
          touchAction: isDrawMode ? 'none' : 'auto',
          zIndex: isDrawMode ? 10 : 5,
        }}
      >
        <canvas
          ref={ref}
          className="block w-full h-full"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
    );
  },
);

export default DrawingCanvas;
