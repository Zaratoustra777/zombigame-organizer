// src/game/GameEngine.jsx

import React, { useEffect, useRef, useState } from 'react';
import { CONFIG, CALCULATED } from '../config/gameConfig.js';
import { ITEMS } from '../config/items/index.js';
import { ENEMY_TYPES } from '../config/enemies.js';
import { generateZombiesForMap, getCircleInfo } from '../config/spawnCircles.js'; // ⬅️ AJOUTÉ
import { BOSS_TYPES, BOSS_CONFIG } from '../config/bosses.js';
import { PROPS } from '../config/map.js';
import { Camera } from '../rendering/Camera.js';
import update from './update.js';
import { render } from '../rendering/render.js';
import { saveGameState, loadGameState } from '../systems/save.js';
import { initKeyboard } from '../input/keyboard.js';
import { initMouse } from '../input/mouse.js';
import { initTouch } from '../input/touch.js';
import { SAVE } from '../utils/constants.js';
import { checkWaveComplete } from '../systems/dungeon.js';

export default function GameEngine({ onStatsUpdate, onReportUpdate, onStateReady }) {
  const canvasRef = useRef(null);
  const gameStateRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const lastSaveRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.95;
    canvas.width = size;
    canvas.height = size;
    
    gameStateRef.current = {
      player: {
        x: 1280,
        y: 1280,
        hp: 100,
        maxHp: 100,
        hunger: 100,
        thirst: 100,
        speed: 220,
        size: 24,
        weapon: 'melee',
        equippedWeaponSlot: null,
        dashCooldown: 0,
        isDashing: false,
        speedBoost: 1,
        speedBoostEnd: 0,
        isKO: false,
        koTimer: 0,
        deathTime: 0,
        city: 'StartCity',
        mapX: 0,
        mapY: 0,
        lastValidX: 1280,
        lastValidY: 1280
      },
      inventory: Array(10).fill(null),
      loot: [],
      projectiles: [],
      entities: [],
      boss: null,
      deadBodies: [],
      effects: [],
      props: [...PROPS],
      dungeon: null,
      dungeonProximity: null, // ⬅️ AJOUTÉ pour bouton entrée
      camera: new Camera(CALCULATED.MAP_WIDTH_PX, CALCULATED.MAP_HEIGHT_PX, CALCULATED.VIEWPORT_SIZE_PX),
      input: {
        up: false,
        down: false,
        left: false,
        right: false,
        shoot: false,
        dash: false,
        mouseX: 0,
        mouseY: 0,
        touchMove: null,
        touchShoot: null,
        godMode: false
      },
      ui: {
        draggedSlot: null,
        hoveredSlot: null,
        clickedSlot: null,
        clickStartX: null,
        clickStartY: null,
        lastClickTime: 0,
        lastClickSlot: null
      },
      lootInventory: null,
      lastShootState: false,
      lastDashState: false,
      time: 0
    };
    
    const state = gameStateRef.current;
    
    if (onStateReady) {
      onStateReady(state);
    }
    
    const loadedData = loadGameState();
    if (loadedData) {
      state.player.hp = loadedData.player.hp;
      state.player.hunger = loadedData.player.hunger;
      state.player.thirst = loadedData.player.thirst;
      state.player.isKO = loadedData.player.isKO;
      state.player.koTimer = loadedData.player.koTimer;
      state.player.x = loadedData.player.x;
      state.player.y = loadedData.player.y;
      state.player.weapon = loadedData.player.weapon || 'melee';
      state.player.equippedWeaponSlot = loadedData.player.equippedWeaponSlot;
      state.inventory[0] = { type: 'weapon_baseball', count: 1 };
      state.inventory[1] = { type: 'weapon_pistol_basic', count: 1 };
      state.player.weapon = 'weapon_baseball';
      state.player.equippedWeaponSlot = 0;
      state.player.city = loadedData.player.city || 'StartCity';
      state.player.mapX = loadedData.player.mapX || 0;
      state.player.mapY = loadedData.player.mapY || 0;
      
      onReportUpdate(loadedData.report);
      setTimeout(() => onReportUpdate(null), 8000);
    } else {
      state.inventory[0] = { type: 'weapon_melee', count: 1 };
      state.player.weapon = 'melee';
      state.player.equippedWeaponSlot = 0;
    }
    
    // ========================================
    // 🧟 SPAWN ZOMBIES SELON CERCLE EUCLIDIEN
    // ========================================
    
    const mapSize = CALCULATED.MAP_WIDTH_PX;
    
    // Debug: Afficher info cercle
    const circleInfo = getCircleInfo(state.player.mapX, state.player.mapY);
    console.log('🗺️ Position spawn:', state.player.mapX, state.player.mapY, '→', circleInfo);
    
    // Générer zombies selon cercle
    const zombieTypes = generateZombiesForMap(state.player.mapX, state.player.mapY);
    
    zombieTypes.forEach(type => {
      const enemyDef = ENEMY_TYPES[type];
      
      if (!enemyDef) {
        console.error(`❌ Type zombie inconnu: ${type}`);
        return;
      }
      
      state.entities.push({
        name: enemyDef.name,
        x: 200 + Math.random() * (mapSize - 400),
        y: 200 + Math.random() * (mapSize - 400),
        hp: enemyDef.hp,
        maxHp: enemyDef.hp,
        speed: enemyDef.speed,
        damage: enemyDef.damage,
        color: enemyDef.color,
        size: enemyDef.size,
        attackRange: enemyDef.attackRange,
        attackRate: enemyDef.attackRate,
        lastAttack: 0,
        special: enemyDef.special,
        alerted: false,
        aggroed: false
      });
    });
    
    console.log(`✅ ${zombieTypes.length} zombies spawnés sur cercle ${circleInfo.circle}`);
    
    // ⬇️ FONCTION SPAWN BOSS ⬇️
    window.spawnBoss = (bossType) => {
      const bossDef = BOSS_TYPES[bossType];
      if (!bossDef) {
        console.error('Boss type inconnu:', bossType);
        return;
      }
      
      state.boss = {
        name: bossDef.name,
        x: BOSS_CONFIG.SPAWN_X,
        y: BOSS_CONFIG.SPAWN_Y,
        hp: bossDef.hp,
        maxHp: bossDef.maxHp,
        speed: bossDef.speed,
        damage: bossDef.damage,
        color: bossDef.color,
        size: bossDef.size,
        attackRange: bossDef.attackRange,
        patterns: bossDef.patterns,
        phase: bossDef.phase || 1,
        lastAttack: 0,
        isBoss: true,
        damageType: bossDef.damageType || 'physical',
        enraged: false,
        charging: false,
        hooking: false,
        lasering: false
      };
    };
    
    // ⬇️ FONCTION START DUNGEON (pour God Mode) ⬇️
    window.startDungeon = async (dungeonType) => {
      const { createDungeon, startNextWave } = await import('../systems/dungeon.js');
      state.dungeon = createDungeon(dungeonType, state.player, state);
      if (state.dungeon) {
        startNextWave(state.dungeon, state);
        console.log(`🏟️ Donjon démarré: ${dungeonType}`);
      }
    };
    
    const cleanupKeyboard = initKeyboard(state.input, state);
    const cleanupMouse = initMouse(canvas, state.input, state.ui, state);
    const cleanupTouch = initTouch(canvas, state.input, state.ui, state);
    
    let running = true;
    
    const loop = () => {
      if (!running) return;
      
      const now = performance.now();
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;
      
      update(dt, state);
      render(ctx, state);
      
      // ⬇️ VÉRIFICATION FIN DE VAGUE ⬇️
      if (state.dungeon) {
        checkWaveComplete(state.dungeon, state);
      }
      
      onStatsUpdate({
        hp: Math.ceil(state.player.hp),
        hunger: Math.ceil(state.player.hunger),
        thirst: Math.ceil(state.player.thirst),
        enemies: state.entities.length,
        dashReady: state.player.dashCooldown <= 0,
        isKO: state.player.isKO
      });
      
      const currentTime = Date.now();
      if (currentTime - lastSaveRef.current > SAVE.INTERVAL) {
        saveGameState(state);
        lastSaveRef.current = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => {
      running = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      saveGameState(gameStateRef.current);
      cleanupKeyboard();
      cleanupMouse();
      cleanupTouch();
      delete window.spawnBoss;
      delete window.startDungeon;
    };
  }, [onStatsUpdate, onReportUpdate]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '4px solid #00ff00',
        borderRadius: '4px',
        boxShadow: '0 0 20px rgba(0,255,0,0.5)',
        imageRendering: 'pixelated',
        cursor: 'crosshair'
      }}
    />
  );
}