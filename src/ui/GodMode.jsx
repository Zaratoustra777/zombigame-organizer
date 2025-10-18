// src/ui/GodMode.jsx - VERSION COMPLÈTE

import React, { useState } from 'react';
import { ITEMS } from '../config/items/index.js';
import { ENEMY_TYPES } from '../config/enemies.js';

export default function GodMode({ gameState, onClose }) {
  const { player, inventory } = gameState;
  const [activeTab, setActiveTab] = useState('player');
  const [tpX, setTpX] = useState(1280);
  const [tpY, setTpY] = useState(1280);
  const [tpMapX, setTpMapX] = useState(0);
  const [tpMapY, setTpMapY] = useState(0);
  
  const heal = () => {
    player.hp = 100;
    player.hunger = 100;
    player.thirst = 100;
    player.isKO = false;
    player.koTimer = 0;
  };
  
  const giveItem = (itemType) => {
    const slot = inventory.findIndex(s => s === null);
    if (slot !== -1) {
      inventory[slot] = { type: itemType, count: 1 };
    } else {
      alert('Inventaire plein !');
    }
  };
  
  const giveAll = (category) => {
    Object.entries(ITEMS).forEach(([key, item]) => {
      if (item.category && item.category.startsWith(category)) {
        giveItem(key);
      }
    });
  };
  
  const spawnEnemy = (type) => {
    const enemyDef = ENEMY_TYPES[type];
    gameState.entities.push({
      name: enemyDef.name,
      x: player.x + 200,
      y: player.y,
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
  };
  
  const teleport = () => {
    player.x = tpX;
    player.y = tpY;
    player.mapX = tpMapX;
    player.mapY = tpMapY;
    alert(`✅ Téléporté à (${tpX}, ${tpY}) sur map (${tpMapX}, ${tpMapY})`);
  };
  
  const clearEnemies = () => {
    gameState.entities = [];
    gameState.boss = null;
  };
  
  const clearInventory = () => {
    for (let i = 0; i < inventory.length; i++) {
      inventory[i] = null;
    }
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0,0,0,0.95)',
      border: '3px solid #0f0',
      borderRadius: '8px',
      padding: '20px',
      color: '#0f0',
      fontFamily: 'monospace',
      zIndex: 9999,
      maxHeight: '80vh',
      overflowY: 'auto',
      minWidth: '700px',
      maxWidth: '90vw'
    }}>
      <h2 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>⚡ GOD MODE ⚡</h2>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <TabButton active={activeTab === 'player'} onClick={() => setActiveTab('player')}>👤 Player</TabButton>
        <TabButton active={activeTab === 'teleport'} onClick={() => setActiveTab('teleport')}>🌍 Téléport</TabButton>
        <TabButton active={activeTab === 'dungeons'} onClick={() => setActiveTab('dungeons')}>🏟️ Donjons</TabButton>
        <TabButton active={activeTab === 'lab'} onClick={() => setActiveTab('lab')}>💉 Labo</TabButton>
        <TabButton active={activeTab === 'fastfood'} onClick={() => setActiveTab('fastfood')}>🍔 Fast-Food</TabButton>
        <TabButton active={activeTab === 'chantier'} onClick={() => setActiveTab('chantier')}>🧱 Chantier</TabButton>
        <TabButton active={activeTab === 'boutique'} onClick={() => setActiveTab('boutique')}>🧵 Boutique</TabButton>
        <TabButton active={activeTab === 'oasis'} onClick={() => setActiveTab('oasis')}>🏝️ Oasis</TabButton>
        <TabButton active={activeTab === 'military'} onClick={() => setActiveTab('military')}>🔫 Militaire</TabButton>
        <TabButton active={activeTab === 'usine'} onClick={() => setActiveTab('usine')}>⚙️ Usine</TabButton>
        <TabButton active={activeTab === 'ferme'} onClick={() => setActiveTab('ferme')}>🌾 Ferme</TabButton>
        <TabButton active={activeTab === 'enemies'} onClick={() => setActiveTab('enemies')}>🧟 Ennemis</TabButton>
      </div>
      
      {activeTab === 'player' && (
        <div>
          <Section title="👤 PLAYER">
            <button onClick={heal} style={btnStyle}>❤️ Full Heal</button>
            <button onClick={() => { player.hp = 999; player.maxHp = 999; }} style={btnStyle}>💪 God HP</button>
            <button onClick={() => player.speed = 500} style={btnStyle}>⚡ Speed x5</button>
            <button onClick={clearInventory} style={{...btnStyle, background: '#f00'}}>🗑️ Clear Inventory</button>
          </Section>
          
          <Section title="🍖 CONSOMMABLES">
            <ItemButton onClick={() => giveItem('food_bread')}>🍞 Pain</ItemButton>
            <ItemButton onClick={() => giveItem('food_meat')}>🥩 Viande</ItemButton>
            <ItemButton onClick={() => giveItem('drink_water')}>💧 Eau</ItemButton>
            <ItemButton onClick={() => giveItem('drink_soda')}>🥤 Soda</ItemButton>
            <ItemButton onClick={() => giveItem('medical_bandage')}>🩹 Bandage</ItemButton>
            <ItemButton onClick={() => giveItem('medical_medkit')}>⚕️ Medkit</ItemButton>
            <ItemButton onClick={() => giveItem('boost_speed')}>⚡ Speed Boost</ItemButton>
          </Section>
        </div>
      )}
      
      {activeTab === 'teleport' && (
        <div>
          <Section title="🌍 TÉLÉPORTATION PERSONNALISÉE">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              width: '100%',
              marginBottom: '15px'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Position X (monde)</label>
                <input
                  type="number"
                  value={tpX}
                  onChange={(e) => setTpX(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#111',
                    border: '2px solid #0f0',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Position Y (monde)</label>
                <input
                  type="number"
                  value={tpY}
                  onChange={(e) => setTpY(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#111',
                    border: '2px solid #0f0',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Map X</label>
                <input
                  type="number"
                  value={tpMapX}
                  onChange={(e) => setTpMapX(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#111',
                    border: '2px solid #0f0',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Map Y</label>
                <input
                  type="number"
                  value={tpMapY}
                  onChange={(e) => setTpMapY(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#111',
                    border: '2px solid #0f0',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={teleport}
              style={{
                ...btnStyle,
                width: '100%',
                fontSize: '16px',
                padding: '12px',
                background: 'linear-gradient(135deg, #0f0, #0a0)'
              }}
            >
              ✨ TÉLÉPORTER
            </button>
          </Section>
          
          <Section title="📍 POSITIONS RAPIDES">
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(0); setTpMapY(0); }} style={btnStyle}>🏠 StartCity</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(0); setTpMapY(-3); }} style={btnStyle}>🍔 Fast-Food</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(0); setTpMapY(3); }} style={btnStyle}>🧱 Chantier</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(-3); setTpMapY(0); }} style={btnStyle}>🛒 Boutique</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(3); setTpMapY(0); }} style={btnStyle}>🏝️ Oasis</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(4); setTpMapY(-4); }} style={btnStyle}>🔫 Militaire</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(-4); setTpMapY(4); }} style={btnStyle}>💉 Labo</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(4); setTpMapY(4); }} style={btnStyle}>🌾 Ferme</button>
            <button onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(-4); setTpMapY(-4); }} style={btnStyle}>⚙️ Usine</button>
          </Section>
          
          <Section title="ℹ️ INFO">
            <div style={{
              padding: '12px',
              background: 'rgba(0,255,0,0.1)',
              borderRadius: '6px',
              fontSize: '12px',
              lineHeight: '1.6',
              width: '100%'
            }}>
              <strong>Position actuelle :</strong><br/>
              Monde: ({player.x.toFixed(0)}, {player.y.toFixed(0)})<br/>
              Map: ({player.mapX}, {player.mapY})
            </div>
          </Section>
        </div>
      )}
      
      {activeTab === 'dungeons' && (
        <div>
          <Section title="🏟️ ARÈNES">
            <button 
              onClick={() => window.startDungeon && window.startDungeon('fastfood')} 
              style={{...btnStyle, background: '#ff6b35', color: '#fff', width: '48%', margin: '5px'}}
            >
              🍔 Fast-Food
            </button>
            <button 
              onClick={() => window.startDungeon && window.startDungeon('chantier')} 
              style={{...btnStyle, background: '#8b4513', color: '#fff', width: '48%', margin: '5px'}}
            >
              🧱 Chantier
            </button>
            <button 
              onClick={() => window.startDungeon && window.startDungeon('boutique')} 
              style={{...btnStyle, background: '#ff1493', color: '#fff', width: '48%', margin: '5px'}}
            >
              🧵 Boutique
            </button>
            <button 
              onClick={() => window.startDungeon && window.startDungeon('oasis')} 
              style={{...btnStyle, background: '#20b2aa', color: '#fff', width: '48%', margin: '5px'}}
            >
              🏝️ Oasis
            </button>
          </Section>
          
          <Section title="🏛️ DONJONS LAYOUT">
            <button 
              onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(-4); setTpMapY(4); teleport(); }} 
              style={{...btnStyle, background: '#00ff00', color: '#000', width: '48%', margin: '5px'}}
            >
              💉 Labo
            </button>
            <button 
              onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(4); setTpMapY(4); teleport(); }} 
              style={{...btnStyle, background: '#00ff00', color: '#000', width: '48%', margin: '5px'}}
            >
              🌾 Ferme
            </button>
            <button 
              onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(4); setTpMapY(-4); teleport(); }} 
              style={{...btnStyle, background: '#00ff00', color: '#000', width: '48%', margin: '5px'}}
            >
              🔫 Base Militaire
            </button>
            <button 
              onClick={() => { setTpX(1280); setTpY(1280); setTpMapX(-4); setTpMapY(-4); teleport(); }} 
              style={{...btnStyle, background: '#00ff00', color: '#000', width: '48%', margin: '5px'}}
            >
              ⚙️ Usine
            </button>
          </Section>
        </div>
      )}
      
      {activeTab === 'lab' && (
        <div>
          <button onClick={() => giveAll('lab')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL LABO
          </button>
          
          <Section title="💉 TIER 1 - Composants">
            <ItemButton onClick={() => giveItem('lab_ampoule_enzyme')}>Ampoule Enzyme</ItemButton>
            <ItemButton onClick={() => giveItem('lab_poudre_catalytique')}>Poudre Catalytique</ItemButton>
            <ItemButton onClick={() => giveItem('lab_gel_stabilisateur')}>Gel Stabilisateur</ItemButton>
            <ItemButton onClick={() => giveItem('lab_cristal_energise')}>Cristal Énergisé</ItemButton>
            <ItemButton onClick={() => giveItem('lab_solvant_purifie')}>Solvant Purifié</ItemButton>
          </Section>
        </div>
      )}
      
      {activeTab === 'fastfood' && (
        <div>
          <button onClick={() => giveAll('ff')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL FAST-FOOD
          </button>
        </div>
      )}
      
      {activeTab === 'chantier' && (
        <div>
          <button onClick={() => giveAll('ch')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL CHANTIER
          </button>
        </div>
      )}
      
      {activeTab === 'boutique' && (
        <div>
          <button onClick={() => giveAll('bc')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL BOUTIQUE
          </button>
        </div>
      )}
      
      {activeTab === 'oasis' && (
        <div>
          <button onClick={() => giveAll('oa')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL OASIS
          </button>
        </div>
      )}
      
      {activeTab === 'military' && (
        <div>
          <button onClick={() => giveAll('bm')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL MILITAIRE
          </button>
        </div>
      )}
      
      {activeTab === 'usine' && (
        <div>
          <button onClick={() => giveAll('us')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL USINE
          </button>
        </div>
      )}
      
      {activeTab === 'ferme' && (
        <div>
          <button onClick={() => giveAll('fm')} style={{...btnStyle, background: '#ff0', color: '#000', marginBottom: '10px', width: '100%'}}>
            🎁 GIVE ALL FERME
          </button>
        </div>
      )}
      
      {activeTab === 'enemies' && (
        <div>
          <Section title="🧟 SPAWN ENEMIES">
            <button onClick={() => spawnEnemy('basic')} style={btnStyle}>🧟 Basic</button>
            <button onClick={() => spawnEnemy('hurleur')} style={btnStyle}>📢 Hurleur</button>
            <button onClick={() => spawnEnemy('gonfle')} style={btnStyle}>💨 Gonflé</button>
            <button onClick={() => spawnEnemy('sauterelle')} style={btnStyle}>🦗 Sauterelle</button>
            <button onClick={() => spawnEnemy('parasite')} style={btnStyle}>🪱 Parasité</button>
            <button onClick={() => spawnEnemy('vaporeux')} style={btnStyle}>👻 Vaporeux</button>
            <br/>
            <button onClick={clearEnemies} style={{...btnStyle, background: '#f00'}}>💀 Clear All</button>
          </Section>
          
          <Section title="👹 SPAWN BOSS">
            <button onClick={() => window.spawnBoss && window.spawnBoss('macon')} style={btnStyle}>Le Maçon</button>
            <button onClick={() => window.spawnBoss && window.spawnBoss('gerant')} style={btnStyle}>Le Gérant</button>
            <button onClick={() => window.spawnBoss && window.spawnBoss('consommatrice')} style={btnStyle}>La Consommatrice</button>
            <button onClick={() => window.spawnBoss && window.spawnBoss('pecheur')} style={btnStyle}>Le Pêcheur</button>
            <button onClick={() => window.spawnBoss && window.spawnBoss('colonel')} style={btnStyle}>Le Colonel</button>
          </Section>
        </div>
      )}
      
      <button onClick={onClose} style={{
        ...btnStyle,
        width: '100%',
        background: '#f00',
        marginTop: '15px'
      }}>❌ CLOSE (G)</button>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? '#0f0' : '#333',
      color: active ? '#000' : '#0f0',
      border: '2px solid #0f0',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '11px'
    }}>
      {children}
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <h3 style={{ 
        borderBottom: '2px solid #0f0', 
        paddingBottom: '5px',
        marginBottom: '8px',
        fontSize: '14px'
      }}>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
        {children}
      </div>
    </div>
  );
}

function ItemButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: '#0f0',
      color: '#000',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '3px',
      cursor: 'pointer',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '11px',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </button>
  );
}

const btnStyle = {
  background: '#0f0',
  color: '#000',
  border: 'none',
  padding: '8px 12px',
  margin: '3px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '12px'
};