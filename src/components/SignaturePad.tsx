import { useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from './BigButton';

interface SignaturePadProps {
  onComplete: (dataUrl: string) => void;
  onClose: () => void;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 260;

/**
 * デモ用の署名パッド。Canvas上でのお絵かきによる署名のみを扱い、
 * 実際の本人確認や法的効力のある電子署名としての機能は持たない。
 */
export default function SignaturePad({ onComplete, onClose }: SignaturePadProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#171717';
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasDrawn) setHasDrawn(true);
  }

  function handlePointerUp() {
    drawingRef.current = false;
  }

  function handleClear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  function handleComplete() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onComplete(canvas.toDataURL('image/png'));
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="mb-1 text-lg font-bold text-neutral-900">
          {t.expertCall.signatureModalTitle}
        </h2>
        <p className="mb-3 text-sm text-neutral-500">{t.expertCall.signaturePlaceholder}</p>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full touch-none rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50"
          style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-bold text-neutral-500 underline underline-offset-2"
          >
            {t.expertCall.clearButton}
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <BigButton onClick={handleComplete} disabled={!hasDrawn}>
            {t.expertCall.completeSignButton}
          </BigButton>
          <BigButton variant="secondary" onClick={onClose}>
            {t.expertCall.cancelButton}
          </BigButton>
        </div>
      </div>
    </div>
  );
}
