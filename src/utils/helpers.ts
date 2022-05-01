export const generateColor = (opacity: number = 1): string => {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const generateRandom = (): string => {
  return `${Date.now() + Math.floor(Math.random() * 100000000000 + 10)}`;
};

export const sleep = (time: number = 0): Promise<any> =>
  new Promise((resolve: any) => setTimeout(() => resolve(), time * 1000));
