import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const [R, setR] = useState(150);
  const [r, setr] = useState(75);
  const [O, setO] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
      ctx.save(); // 現在の描画状態を保存
      ctx.translate(canvas.width / 2, canvas.height / 2); // キャンバスの中心に移動
      drawSpirograph(ctx, R, r, O);
      ctx.restore(); // 保存された描画状態に戻す
    }
  }, [R, r, O]);

  return (
    <div>
      <h1>Spirograph Drawer</h1>
      <div>
        <label>
          R: <input type="number" value={R} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          r: <input type="number" value={r} onChange={(e) => setr(Number(e.target.value))} />
        </label>
        <label>
          O: <input type="number" value={O} onChange={(e) => setO(Number(e.target.value))} />
        </label>
      </div>
      <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }}></canvas>
    </div>
  );
}

function drawSpirograph(ctx, R, r, O) {
  ctx.beginPath();
  for (let theta = 0; theta <= Math.PI * 2 * r / gcd(r, R); theta += 0.01) {
    const x = (R - r) * Math.cos(theta) + O * Math.cos((R - r) / r * theta);
    const y = (R - r) * Math.sin(theta) - O * Math.sin((R - r) / r * theta);
    if (theta === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
