export type GangwonCity = {
  id: string;
  name: string;
  description: string;
  attractions: [string, string, string];
  imageGradient: string;
  marker: { x: number; y: number };
};
