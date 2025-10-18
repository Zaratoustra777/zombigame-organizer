// src/entities/projectiles.js

import { WEAPONS } from '../config/weapons.js';

export function fireWeapon(player, weapon, targetX, targetY, projectiles) {
  if (player.weaponCooldown > 0) return null;
  
  player.weaponCooldown = weapon.fireRate || 500;
  
  if (weapon.type === 'melee') {
    const angle = Math.atan2(targetY - player.y, targetX - player.x);
    return {
      type: 'melee',
      angle,
      range: weapon.range,
      damage: weapon.damage,
      knockback: weapon.knockback
    };
  }
  
  if (weapon.type === 'projectile' || weapon.type === 'explosive' || weapon.type === 'poison') {
    const dx = targetX - player.x;
    const dy = targetY - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (weapon.pellets) {
      for (let i = 0; i < weapon.pellets; i++) {
        const spread = (Math.random() - 0.5) * weapon.spread;
        const angle = Math.atan2(dy, dx) + spread;
        
        projectiles.push({
          x: player.x,
          y: player.y,
          vx: Math.cos(angle) * weapon.projectileSpeed,
          vy: Math.sin(angle) * weapon.projectileSpeed,
          damage: weapon.damage,
          owner: 'player',
          weaponType: player.weapon,
          lifetime: weapon.range / weapon.projectileSpeed,
          age: 0
        });
      }
    } else {
      projectiles.push({
        x: player.x,
        y: player.y,
        vx: (dx / dist) * weapon.projectileSpeed,
        vy: (dy / dist) * weapon.projectileSpeed,
        damage: weapon.damage,
        owner: 'player',
        weaponType: player.weapon,
        lifetime: weapon.range / weapon.projectileSpeed,
        age: 0
      });
    }
    
    return { type: 'projectile' };
  }
  
  return null;
}

export function updateProjectiles(projectiles, dt) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const proj = projectiles[i];
    
    proj.x += proj.vx * dt;
    proj.y += proj.vy * dt;
    proj.age += dt;
    
    if (proj.age >= proj.lifetime) {
      projectiles.splice(i, 1);
    }
  }
}