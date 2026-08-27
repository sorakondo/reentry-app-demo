import { useEffect, useRef, useState } from 'react';

/**
 * 「スマホ画面」「入口ディスプレイ」などのデバイス枠を、
 * ブラウザの拡大率やWindowsの画面拡大率が変わってもレイアウトが一切崩れないように
 * 表示するための仕組み。
 *
 * 【これまでの問題】
 * デバイス枠の大きさは使える画面領域（高さ or 幅）に応じて伸縮する一方、
 * 中の文字サイズや余白は別の基準（remなど）で決まっていたため、
 * 拡大率が変わって枠の大きさが変化すると「枠と中身のバランス」が崩れ、
 * ラベルの折り返され方などが変わってしまっていた
 * （CSSコンテナクエリで文字サイズだけを追随させる対策を試みたが、
 * 　余白やアイコンサイズなど文字以外の要素までは追随できず、不十分だった）。
 *
 * 【この仕組みでの解決方法】
 * 中身は常に「基準サイズ（例：405×900px）」という決め打ちの解像度でレイアウトする。
 * つまりブラウザの拡大率が何%であっても、中身から見れば常に同じピクセル数の中に
 * 描画しているため、文字の折り返し方・余白の比率は常に完全に同一になる。
 * そのうえで、実際に画面上で使える領域に収まるよう、中身全体を
 * CSSの transform: scale() で一括で拡大縮小して見せる
 * （＝写真や動画を画面サイズに合わせて縮小表示するのと同じ考え方）。
 * これにより、文字だけでなく余白・アイコン・枠線を含めた「見た目の比率」が
 * 拡大率によらず常に完全に同じになる。
 */
export function useScaleToFit(refWidth: number, refHeight: number, maxScale = 1) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function computeScale(width: number, height: number) {
      if (width <= 0 || height <= 0) return;
      const next = Math.min(width / refWidth, height / refHeight, maxScale);
      setScale(next > 0 && Number.isFinite(next) ? next : 1);
    }

    // 初期表示時点のサイズも反映する
    const rect = el.getBoundingClientRect();
    computeScale(rect.width, rect.height);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      computeScale(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [refWidth, refHeight, maxScale]);

  return { containerRef, scale };
}
