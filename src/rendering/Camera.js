export class Camera {
  constructor(worldSize, viewWidth, viewHeight) {
    this.worldSize = worldSize;
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.x = 0;
    this.y = 0;
  }

  update(player) {
    this.x = player.x - this.viewWidth / 2;
    this.y = player.y - this.viewHeight / 2;

    this.x = Math.max(0, Math.min(this.worldSize - this.viewWidth, this.x));
    this.y = Math.max(0, Math.min(this.worldSize - this.viewHeight, this.y));
  }

  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.x,
      y: screenY + this.y
    };
  }

  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.x,
      y: worldY - this.y
    };
  }
}