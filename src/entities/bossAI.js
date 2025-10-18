// src/entities/bossAI.js

export function updateMacon(boss, player, entities, time, dt) {
  const hpPercent = boss.hp / boss.maxHp;
  
  boss.phases.forEach((phase, index) => {
    if (hpPercent <= phase.threshold && (!boss.currentPhase || boss.currentPhase < index)) {
      boss.currentPhase = index;
      
      if (phase.summonCount > 0) {
        for (let i = 0; i < phase.summonCount; i++) {
          const angle = (Math.PI * 2 * i) / phase.summonCount;
          const spawnX = boss.x + Math.cos(angle) * 100;
          const spawnY = boss.y + Math.sin(angle) * 100;
          
          entities.push({
            name: 'Invocation',
            x: spawnX,
            y: spawnY,
            hp: 30,
            maxHp: 30,
            speed: 80,
            damage: 8,
            color: '#8b4513',
            size: 24,
            attackRange: 30,
            attackRate: 1000,
            lastAttack: 0,
            special: null,
            alerted: true,
            aggroed: true
          });
        }
      }
    }
  });
  
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist > boss.attackRange) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  } else {
    if (time - boss.lastAttack >= boss.attackRate / 1000) {
      player.hp -= boss.damage;
      boss.lastAttack = time;
    }
  }
}

export function updateGerant(boss, player, projectiles, entities, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (!boss.lastSpecialAttack) boss.lastSpecialAttack = 0;
  
  if (time - boss.lastSpecialAttack >= boss.specialAttackRate / 1000) {
    boss.lastSpecialAttack = time;
    
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      projectiles.push({
        x: boss.x,
        y: boss.y,
        vx: Math.cos(angle) * 300,
        vy: Math.sin(angle) * 300,
        damage: 15,
        owner: 'boss',
        lifetime: 2,
        age: 0
      });
    }
  }
  
  if (dist > boss.attackRange) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  } else {
    if (time - boss.lastAttack >= boss.attackRate / 1000) {
      player.hp -= boss.damage;
      boss.lastAttack = time;
    }
  }
}

export function updateConsommatrice(boss, player, effects, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist > boss.attackRange) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  } else {
    if (time - boss.lastAttack >= boss.attackRate / 1000) {
      player.hp -= boss.damage;
      boss.lastAttack = time;
    }
  }
}

export function updatePecheur(boss, player, effects, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist > boss.attackRange) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  } else {
    if (time - boss.lastAttack >= boss.attackRate / 1000) {
      player.hp -= boss.damage;
      boss.lastAttack = time;
    }
  }
}

export function updateColonel(boss, player, projectiles, effects, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (!boss.burstTimer) boss.burstTimer = 0;
  
  if (time - boss.lastAttack >= boss.attackRate / 1000) {
    const angle = Math.atan2(dy, dx);
    
    projectiles.push({
      x: boss.x,
      y: boss.y,
      vx: Math.cos(angle) * 600,
      vy: Math.sin(angle) * 600,
      damage: boss.damage,
      owner: 'boss',
      lifetime: 1.5,
      age: 0
    });
    
    boss.lastAttack = time;
  }
  
  if (dist > 150) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  }
}

export function updateScientifique(boss, player, effects, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist > boss.attackRange) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  } else {
    if (time - boss.lastAttack >= boss.attackRate / 1000) {
      player.hp -= boss.damage;
      boss.lastAttack = time;
    }
  }
}

export function updateFermier(boss, player, entities, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist > boss.attackRange) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  } else {
    if (time - boss.lastAttack >= boss.attackRate / 1000) {
      player.hp -= boss.damage;
      boss.lastAttack = time;
    }
  }
}

export function updateMachine(boss, player, projectiles, effects, time, dt) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (time - boss.lastAttack >= boss.attackRate / 1000) {
    const angle = Math.atan2(dy, dx);
    
    projectiles.push({
      x: boss.x,
      y: boss.y,
      vx: Math.cos(angle) * 400,
      vy: Math.sin(angle) * 400,
      damage: boss.damage,
      owner: 'boss',
      lifetime: 2,
      age: 0
    });
    
    boss.lastAttack = time;
  }
  
  if (dist > 200) {
    const norm = dist || 1;
    boss.x += (dx / norm) * boss.speed * dt;
    boss.y += (dy / norm) * boss.speed * dt;
  }
}