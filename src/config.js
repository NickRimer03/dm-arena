export const [width, height] = [800, 600];
export const ships = {
  vulture: {
    damping: 0.985,
    speed: {
      linear: 400,
      angular: 320
    },
    fireRate: 200,
    lastFired: 0,
    ammo: 20
  }
};

export default { width, height, ships };
