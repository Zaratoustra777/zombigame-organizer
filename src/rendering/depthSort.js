// src/rendering/depthSort.js

export function createRenderables(state, camera) {
  const renderables = [];
  const { props, entities, boss, player } = state;
  
  // Props
  props.forEach(prop => {
    if (camera.isVisible(prop.x, prop.y)) {
      renderables.push({
        type: 'prop',
        y: prop.y + (prop.height || 0),
        data: prop
      });
    }
  });
  
  // Entities
  entities.forEach(entity => {
    if (camera.isVisible(entity.x, entity.y)) {
      renderables.push({
        type: 'entity',
        y: entity.y,
        data: entity
      });
    }
  });
  
  // Boss
  if (boss && camera.isVisible(boss.x, boss.y)) {
    renderables.push({
      type: 'boss',
      y: boss.y,
      data: boss
    });
  }
  
  // Player
  renderables.push({
    type: 'player',
    y: player.y,
    data: player
  });
  
  renderables.sort((a, b) => a.y - b.y);
  
  return renderables;
}