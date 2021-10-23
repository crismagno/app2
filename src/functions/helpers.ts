export function generateColor(opacidade = 1) {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

export function generateRandom() { return String(Date.now() + Math.floor(Math.random() * 100000000000 + 10))};
