// src/game/state.js - STATE INITIAL

import { Camera } from '../utils/Camera.js';
import { WORLD_SIZE, CAMERA_WIDTH, CAMERA_HEIGHT, PLAYER } from '../utils/constants.js';

export function createInitialState() {
  const player = {
    x: 1280,
    y: 1280,
    mapX: 0,
    mapY: 0,
    hp: PLAYER.MAX_HP,
    maxHp: PLAYER.MAX_HP,
    hunger: PLAYER.MAX_HUNGER,
    thirst: PLAYER.MAX_THIRST,
    speed: PLAYER.SPEED,
    weapon: 'weapon_melee',
    weaponCooldown: 0,
    dashCooldown: 0,
    isDashing: false,
    dashTimer: 0,
    dashDirX: 0,
    dashDirY: 0,
    dashSpeed: 0,
    isKO: false,
    koTimer: 0,
    koStartTime: 0,
    lastValidX: 1280,
    lastValidY: 1280
  };
  
  const inventory = Array(10).fill(null);
  inventory[0] = { type: 'weapon_melee', count: 1 };
  
  return {
    player,
    inventory,
    entities: [],
    projectiles: [],
    loot: [],
    effects: [],
    deadBodies: [],
    boss: null,
    props: [],
    camera: new Camera(WORLD_SIZE, CAMERA_WIDTH, CAMERA_HEIGHT),
    input: {
      up: false,
      down: false,
      left: false,
      right: false,
      shoot: false,
      dash: false,
      mouseX: 0,
      mouseY: 0
    },
    time: 0,
    lastShootState: false,
    lastDashState: false,
    lootInventory: null,
    dungeon: null,
    dungeonProximity: null,
    dungeonCooldowns: {}
  };
}