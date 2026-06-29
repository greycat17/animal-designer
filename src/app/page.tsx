'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import DrawingCanvas from '@/components/DrawingCanvas';
import type { StrokeData } from '@/components/DrawingCanvas';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import {
  CartoonRabbit,
  CartoonCat,
  CartoonDog,
  CartoonFrog,
  CartoonDino,
  CartoonSnail,
  CartoonFish,
  CartoonDragonfly,
  CartoonSquirrel,
  CartoonLake,
  CartoonGrass,
  CartoonBoy,
  CartoonGirl,
  Flower1,
  Flower2,
  Flower3,
  Flower4,
  Flower5,
} from '@/components/CartoonComponents';

/* ================================================================
   DATA
   ================================================================ */

const MATERIALS: {
  category: string;
  items: { id: string; emoji: React.ReactNode; name: string }[];
}[] = [
  {
    category: '小动物',
    items: [
      { id: 'rabbit', emoji: <CartoonRabbit />, name: '兔子' },
      { id: 'cat', emoji: <CartoonCat />, name: '小猫' },
      { id: 'dog', emoji: <CartoonDog />, name: '小狗' },
      { id: 'frog', emoji: <CartoonFrog />, name: '青蛙' },
      { id: 'dino', emoji: <CartoonDino />, name: '恐龙' },
      { id: 'snail', emoji: <CartoonSnail />, name: '蜗牛' },
      { id: 'fish', emoji: <CartoonFish />, name: '小鱼' },
      { id: 'dragonfly', emoji: <CartoonDragonfly />, name: '蜻蜓' },
      { id: 'butterfly', emoji: '🦋', name: '蝴蝶' },
      { id: 'bird', emoji: '🐦', name: '小鸟' },
      { id: 'squirrel', emoji: <CartoonSquirrel />, name: '松鼠' },
      { id: 'boy', emoji: <CartoonBoy />, name: '小男孩' },
      { id: 'girl', emoji: <CartoonGirl />, name: '小女孩' },
    ],
  },
  {
    category: '自然',
    items: [
      { id: 'sun', emoji: '☀️', name: '太阳' },
      { id: 'cloud', emoji: '☁️', name: '白云' },
      { id: 'tree', emoji: '🌳', name: '大树' },
      { id: 'pine', emoji: '🌲', name: '松树' },
      { id: 'mushroom', emoji: '🍄', name: '蘑菇' },
      { id: 'rock', emoji: '🪨', name: '石块' },
      { id: 'lake', emoji: <CartoonLake />, name: '湖泊' },
      { id: 'grass', emoji: <CartoonGrass />, name: '小草' },
      { id: 'flower1', emoji: <Flower1 />, name: '粉花' },
      { id: 'flower2', emoji: <Flower2 />, name: '蓝花' },
      { id: 'flower3', emoji: <Flower3 />, name: '郁金香' },
      { id: 'flower4', emoji: <Flower4 />, name: '黄花' },
      { id: 'flower5', emoji: <Flower5 />, name: '薰衣草' },
    ],
  },
  {
    category: '建筑',
    items: [
      { id: 'house', emoji: '🏠', name: '房子' },
      { id: 'fence', emoji: '🏗️', name: '栅栏' },
      { id: 'nest', emoji: '🪺', name: '鸟巢' },
    ],
  },
];

const COLORS = [
  '#FF6B6B',
  '#FF9F43',
  '#FFD93D',
  '#6BCB77',
  '#4ECDC4',
  '#45B7D1',
  '#96C',
  '#FF85A1',
  '#8B6914',
  '#2D3436',
];

const BRUSH_SIZES = [
  { label: '小', value: 4 },
  { label: '中', value: 10 },
  { label: '大', value: 22 },
];

/* ================================================================
   TYPES
   ================================================================ */

interface CanvasElement {
  id: string;
  emoji: React.ReactNode;
  name: string;
  x: number;
  y: number;
  size: number;
}

type AppMode = 'drag' | 'draw';

/* ================================================================
   PAGE COMPONENT
   ================================================================ */

export default function AnimalDesignerPage() {
  /* ---- state ---- */
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [mode, setMode] = useState<AppMode>('drag');
  const [showMaterials, setShowMaterials] = useState(true);
  const [drawColor, setDrawColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(4);
  const [strokes, setStrokes] = useState<StrokeData[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  /* ---- refs ---- */
  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    elX: number;
    elY: number;
  } | null>(null);

  /* ---- prevent page scroll on canvas area ---- */
  useEffect(() => {
    const el = canvasAreaRef.current;
    if (!el) return;
    const handler = (e: Event) => e.preventDefault();
    el.addEventListener('touchmove', handler, { passive: false });
    return () => el.removeEventListener('touchmove', handler);
  }, []);

  /* ---- QR code generation ---- */
  useEffect(() => {
    // Use permanent domain from env, fallback to current URL
    const envDomain = process.env.COZE_PROJECT_DOMAIN_DEFAULT;
    const url = envDomain
      ? (envDomain.startsWith('http') ? envDomain : `https://${envDomain}`)
      : window.location.href;
    setPageUrl(url);
    QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
      color: { dark: '#2D3436', light: '#FFFFFF' },
    }).then(setQrDataUrl).catch(() => {});
  }, []);

  /* ---- add material ---- */
  const addElement = useCallback((emoji: React.ReactNode, name: string) => {
    const newEl: CanvasElement = {
      id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      emoji,
      name,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 30,
      size: 64,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(newEl.id);
  }, []);

  /* ---- size adjustment ---- */
  function resizeElement(id: string, delta: number) {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, size: Math.max(28, Math.min(160, el.size + delta)) }
          : el,
      ),
    );
  }

  /* ---- wheel-to-zoom on elements ---- */
  function onElementWheel(e: React.WheelEvent<HTMLDivElement>) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    e.preventDefault();
    resizeElement(id, e.deltaY < 0 ? 6 : -6);
  }

  /* ---- drag handlers (on element div) ---- */
  function onElementPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (mode !== 'drag') return;
    e.stopPropagation();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const id = el.dataset.id!;
    setSelectedId(id);
    dragStateRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      elX: parseFloat(el.dataset.x || '0'),
      elY: parseFloat(el.dataset.y || '0'),
    };
    el.style.scale = '1.15';
    el.style.zIndex = '20';
  }

  function onElementPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const ds = dragStateRef.current;
    if (!ds) return;
    const area = canvasAreaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();

    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    const dxPct = (dx / rect.width) * 100;
    const dyPct = (dy / rect.height) * 100;

    let newX = ds.elX + dxPct;
    let newY = ds.elY + dyPct;
    newX = Math.max(0, Math.min(90, newX));
    newY = Math.max(0, Math.min(90, newY));

    setElements((prev) =>
      prev.map((item) =>
        item.id === ds.id ? { ...item, x: newX, y: newY } : item,
      ),
    );
  }

  function onElementPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const ds = dragStateRef.current;
    if (!ds) return;
    e.currentTarget.style.scale = '1';
    e.currentTarget.style.zIndex = '10';
    dragStateRef.current = null;
  }

  /* ---- delete / clear ---- */
  function deleteElement(id: string) {
    setElements((prev) => prev.filter((el) => el.id !== id));
  }

  function clearAll() {
    setElements([]);
    setStrokes([]);
  }

  /* ---- export ---- */
  async function exportPNG() {
    if (!exportRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const area = canvasAreaRef.current;
      if (!area) return;
      const areaRect = area.getBoundingClientRect();

      const W = Math.floor(areaRect.width);
      const H = Math.floor(areaRect.height);
      const FOOTER_H = 80;
      const SCALE = 2;

      const canvas = document.createElement('canvas');
      canvas.width = W * SCALE;
      canvas.height = (H + FOOTER_H) * SCALE;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(SCALE, SCALE);

      /* 1. background gradient */
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#E0F4FF');
      grad.addColorStop(1, '#E8F5E9');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      /* 2. helper: SVG React element → Image */
      async function svgToImage(node: React.ReactNode): Promise<HTMLImageElement | null> {
        if (node == null || typeof node === 'string' || typeof node === 'number') return null;
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '100px';
        document.body.appendChild(el);
        const root = createRoot(el);
        root.render(node);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const svgEl = el.querySelector('svg');
        if (!svgEl) {
          root.unmount();
          document.body.removeChild(el);
          return null;
        }
        svgEl.setAttribute('width', '100');
        svgEl.setAttribute('height', '100');
        const str = new XMLSerializer().serializeToString(svgEl);
        root.unmount();
        document.body.removeChild(el);
        const b64 = btoa(unescape(encodeURIComponent(str)));
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${b64}`;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
        });
        return img;
      }

      /* 3. helper: draw emoji text */
      function drawEmojiText(emojiStr: string, cx: number, cy: number, size: number) {
        ctx.font = `${size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emojiStr, cx, cy);
      }

      /* 4. pre-convert all SVG elements to images */
      const imgMap = new Map<string, HTMLImageElement>();
      for (const el of elements) {
        if (typeof el.emoji !== 'string') {
          const img = await svgToImage(el.emoji);
          if (img) imgMap.set(el.id, img);
        }
      }

      /* 5. draw placed elements */
      for (const el of elements) {
        const cx = (el.x / 100) * W;
        const cy = (el.y / 100) * H;
        const s = el.size;
        const img = imgMap.get(el.id);
        if (img) {
          ctx.drawImage(img, cx - s / 2, cy - s / 2, s, s);
        } else if (typeof el.emoji === 'string') {
          drawEmojiText(el.emoji, cx, cy, s);
        }
      }

      /* 6. draw the drawing canvas */
      const drawCanvas = drawingCanvasRef.current;
      if (drawCanvas && drawCanvas.width > 0 && drawCanvas.height > 0) {
        ctx.drawImage(drawCanvas, 0, 0, W, H);
      }

      /* 7. footer with QR code */
      const tY = H;
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillRect(0, tY, W, FOOTER_H);

      /* dashed border */
      ctx.strokeStyle = '#A8E6A0';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, tY);
      ctx.lineTo(W, tY);
      ctx.stroke();
      ctx.setLineDash([]);

      /* QR code on the right */
      const qrSize = 60;
      const qrX = W - qrSize - 12;
      const qrY = tY + (FOOTER_H - qrSize) / 2;
      if (qrDataUrl) {
        const qrImg = new Image();
        qrImg.src = qrDataUrl;
        await new Promise<void>((resolve) => {
          qrImg.onload = () => resolve();
          qrImg.onerror = () => resolve();
        });
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
      }

      /* title text on the left */
      const mid = tY + FOOTER_H / 2;
      ctx.font = `bold 18px "PingFang SC","Microsoft YaHei",sans-serif`;
      ctx.fillStyle = '#2D3436';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('🏡 动物家园设计师', 20, mid - 12);

      ctx.font = `400 12px "PingFang SC","Microsoft YaHei",sans-serif`;
      ctx.fillStyle = '#888';
      const shortUrl = pageUrl.length > 40 ? pageUrl.slice(0, 40) + '...' : pageUrl;
      ctx.fillText(shortUrl, 20, mid + 12);

      /* 8. download */
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `我的动物家园-${Date.now()}.png`;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }, 'image/png');
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }

  /* ---- derived ---- */
  const isEraser = brushSize > 20;

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <div className="h-dvh w-full flex flex-col bg-gradient-to-b from-[#E0F4FF] to-[#E8F5E9] overflow-hidden select-none">
      {/* ---- HEADER ---- */}
      <header className="flex-shrink-0 flex items-center justify-between px-3 py-2 bg-white/80 backdrop-blur-sm shadow-sm z-30">
        <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
          <span className="mr-1">🏡</span>动物家园设计师
        </h1>
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium active:scale-95 transition-transform"
          >
            清空
          </button>
          <button
            onClick={exportPNG}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-full bg-[#4ECDC4] text-white text-sm font-bold shadow-md active:scale-95 transition-transform disabled:opacity-60"
          >
            {isExporting ? '导出中...' : '📷 导出'}
          </button>
        </div>
      </header>

      {/* ---- MAIN ---- */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* ---- CANVAS AREA (exportable) ---- */}
        <div
          ref={exportRef}
          className="flex-1 flex flex-col min-h-0"
          style={{ background: 'linear-gradient(180deg,#E0F4FF 0%,#E8F5E9 100%)' }}
        >
          {/* drawing canvas + elements */}
          <div
            ref={canvasAreaRef}
            className="flex-1 relative overflow-hidden min-h-0"
            onClick={() => setSelectedId(null)}
          >
            {/* decorative clouds */}
            <div className="absolute top-[6%] left-[8%] text-5xl opacity-30 pointer-events-none">
              ☁️
            </div>
            <div className="absolute top-[10%] right-[12%] text-4xl opacity-25 pointer-events-none">
              ☁️
            </div>
            <div className="absolute top-[4%] left-[45%] text-3xl opacity-20 pointer-events-none">
              ☁️
            </div>

            {/* grass decoration at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[18%] pointer-events-none z-[1]">
              <div
                className="w-full h-full"
                style={{
                  background:
                    'linear-gradient(0deg, #7EC850 0%, #A8E060 50%, transparent 100%)',
                  borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
                  opacity: 0.35,
                }}
              />
            </div>

            {/* placed elements */}
            {elements.map((el) => {
              const isSelected = selectedId === el.id;
              return (
                <div
                  key={el.id}
                  data-id={el.id}
                  data-x={el.x}
                  data-y={el.y}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    fontSize: `${el.size}px`,
                    lineHeight: 1,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 15 : 10,
                    pointerEvents: mode === 'drag' ? 'auto' : 'none',
                    touchAction: 'none',
                    transition: dragStateRef.current?.id === el.id ? 'none' : 'all 0.15s',
                    filter: `drop-shadow(0 2px 3px rgba(0,0,0,0.15))${isSelected ? ' drop-shadow(0 0 6px rgba(78,205,196,0.6))' : ''}`,
                  }}
                  onPointerDown={onElementPointerDown}
                  onPointerMove={onElementPointerMove}
                  onPointerUp={onElementPointerUp}
                  onPointerCancel={onElementPointerUp}
                  onWheel={onElementWheel}
                >
                  {typeof el.emoji === 'string' ? (
                    <span role="img" aria-label={el.name}>
                      {el.emoji}
                    </span>
                  ) : (
                    el.emoji
                  )}
                  {/* selection ring */}
                  {mode === 'drag' && isSelected && (
                    <div
                      className="absolute inset-0 rounded-xl border-2 border-[#4ECDC4] pointer-events-none"
                      style={{
                        width: '120%',
                        height: '120%',
                        left: '-10%',
                        top: '-10%',
                        animation: 'pulse 1.5s ease-in-out infinite',
                      }}
                    />
                  )}
                  {/* delete button */}
                  {mode === 'drag' && isSelected && (
                    <button
                      className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#FF6B6B] text-white text-sm flex items-center justify-center shadow-md active:scale-90 z-20"
                      style={{ pointerEvents: 'auto', lineHeight: 1 }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteElement(el.id);
                        setSelectedId(null);
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}

            {/* drawing canvas overlay */}
            <DrawingCanvas
              ref={drawingCanvasRef}
              strokes={strokes}
              setStrokes={setStrokes}
              isDrawMode={mode === 'draw'}
              drawColor={drawColor}
              brushSize={brushSize}
            />

            {/* empty state hint */}
            {elements.length === 0 && strokes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
                <div className="text-center text-gray-400/60">
                  <div className="text-5xl mb-2">👆</div>
                  <p className="text-base font-medium">
                    点击下方素材，开始设计动物家园吧！
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---- MATERIAL PANEL (slide-up) ---- */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out z-20 ${
            showMaterials ? 'translate-y-0' : 'translate-y-[calc(100%-44px)]'
          }`}
        >
          {/* handle */}
          <button
            className="w-full flex items-center justify-center py-2.5 cursor-pointer"
            onClick={() => setShowMaterials(!showMaterials)}
          >
            <div
              className={`w-10 h-1 rounded-full bg-gray-300 transition-transform duration-300 ${showMaterials ? '' : 'rotate-180'}`}
            />
            <span className="ml-2 text-xs text-gray-400 font-medium">
              {showMaterials ? '收起素材' : '展开素材'}
            </span>
          </button>

          {/* material grid */}
          <div className="px-3 pb-3 max-h-[35vh] overflow-y-auto overscroll-contain">
            {MATERIALS.map((cat) => (
              <div key={cat.category} className="mb-2 last:mb-0">
                <div className="text-xs font-bold text-gray-400 mb-1">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addElement(item.emoji, item.name)}
                      className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gray-50 rounded-2xl active:scale-90 active:bg-gray-100 transition-all hover:bg-white hover:shadow-md border border-gray-100 overflow-hidden"
                      title={item.name}
                      style={{ fontSize: typeof item.emoji === 'string' ? '1.75rem' : '2rem' }}
                    >
                      {typeof item.emoji === 'string' ? (
                        <span role="img" aria-label={item.name}>{item.emoji}</span>
                      ) : (
                        item.emoji
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- TOOLBAR ---- */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2 z-30">
        {/* row 1: mode tabs + actions */}
        <div className="flex items-center gap-2 mb-2">
          {/* mode tabs */}
          <div className="flex bg-gray-100 rounded-2xl p-0.5">
            <button
              onClick={() => setMode('drag')}
              className={`px-3 py-1.5 rounded-2xl text-sm font-medium transition-all ${
                mode === 'drag'
                  ? 'bg-[#4ECDC4] text-white shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              ✋ 摆放
            </button>
            <button
              onClick={() => setMode('draw')}
              className={`px-3 py-1.5 rounded-2xl text-sm font-medium transition-all ${
                mode === 'draw'
                  ? 'bg-[#FF9F43] text-white shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              ✏️ 画画
            </button>
          </div>

          <div className="flex-1" />

          {/* undo last stroke */}
          {mode === 'draw' && strokes.length > 0 && (
            <button
              onClick={() => setStrokes((prev) => prev.slice(0, -1))}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium active:scale-95 transition-transform"
            >
              ↩ 撤销
            </button>
          )}

          {/* clear drawings */}
          {mode === 'draw' && strokes.length > 0 && (
            <button
              onClick={() => setStrokes([])}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium active:scale-95 transition-transform"
            >
              🗑️ 清除画笔
            </button>
          )}
        </div>

        {/* row 2: draw tools (only in draw mode) */}
        {mode === 'draw' && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* colors */}
            <div className="flex gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setDrawColor(c);
                    if (brushSize > 20) setBrushSize(4);
                  }}
                  className={`w-7 h-7 rounded-full border-2 transition-all active:scale-90 ${
                    drawColor === c && !isEraser
                      ? 'border-gray-700 scale-110 shadow-md'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* divider */}
            <div className="w-px h-6 bg-gray-200 mx-0.5" />

            {/* brush sizes */}
            <div className="flex gap-1">
              {BRUSH_SIZES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setBrushSize(s.value)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                    brushSize === s.value
                      ? 'bg-[#FF9F43] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* drag mode: size controls for selected element */}
        {mode === 'drag' && selectedId && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              {elements.find((e) => e.id === selectedId)?.name ?? ''}
            </span>
            <div className="flex items-center gap-1 bg-gray-50 rounded-2xl px-1.5 py-0.5">
              <button
                onClick={() => resizeElement(selectedId, -8)}
                className="w-8 h-8 rounded-full bg-white text-gray-600 text-lg font-bold flex items-center justify-center shadow-sm active:scale-90 transition-transform border border-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center text-xs text-gray-500 font-medium tabular-nums">
                {elements.find((e) => e.id === selectedId)?.size ?? 0}
              </span>
              <button
                onClick={() => resizeElement(selectedId, 8)}
                className="w-8 h-8 rounded-full bg-[#4ECDC4] text-white text-lg font-bold flex items-center justify-center shadow-sm active:scale-90 transition-transform"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-400 ml-1">滚轮也可缩放</span>
          </div>
        )}

        {/* drag mode hint */}
        {mode === 'drag' && !selectedId && (
          <div className="text-xs text-gray-400 text-center py-0.5">
            点击素材添加到画布 · 点选元素可缩放 · 拖拽移动位置
          </div>
        )}
      </div>
    </div>
  );
}
