// src/ui/DungeonEnterButton.jsx - VERSION STABLE

import React from 'react';

export default function DungeonEnterButton({ proximity, gameState, onAction }) {
  if (!proximity) return null;
  
  if (proximity.action === 'exit_layout') {
    const handleExit = () => {
      const { exitLayoutDungeon } = require('../systems/dungeonLayout.js');
      exitLayoutDungeon(gameState.dungeon, gameState.player, gameState);
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 255, 0, 0.9)',
        border: '3px solid #00ff00',
        borderRadius: '8px',
        padding: '20px 30px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 1000,
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)'
      }}>
        <div style={{ marginBottom: '10px' }}>🚪 SORTIE DU DONJON</div>
        <button
          onClick={handleExit}
          style={{
            background: '#00ff00',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          Appuyez sur E pour sortir
        </button>
      </div>
    );
  }
  
  if (proximity.action === 'enter_next') {
    const handleNext = () => {
      const { enterNextRoom } = require('../rendering/renderDungeonLayout.js');
      enterNextRoom(gameState.dungeon, gameState.player, gameState);
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 255, 255, 0.9)',
        border: '3px solid #00ffff',
        borderRadius: '8px',
        padding: '20px 30px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 1000,
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
      }}>
        <div style={{ marginBottom: '10px' }}>🚪 SALLE SUIVANTE</div>
        <button
          onClick={handleNext}
          style={{
            background: '#00ffff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          Appuyez sur E pour continuer
        </button>
      </div>
    );
  }
  
  if (proximity.layoutType === 'procedural') {
    const handleEnter = () => {
      if (onAction) onAction('enter_layout', proximity.type);
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(138, 43, 226, 0.95)',
        border: '3px solid #8a2be2',
        borderRadius: '8px',
        padding: '20px 30px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 1000,
        boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)'
      }}>
        <div style={{ marginBottom: '10px' }}>🏛️ DONJON LAYOUT</div>
        <div style={{ fontSize: '14px', marginBottom: '15px', opacity: 0.9 }}>
          Exploration + Combat | 7-9 salles | Boss final
        </div>
        <button
          onClick={handleEnter}
          style={{
            background: '#8a2be2',
            color: '#fff',
            border: '2px solid #fff',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          Appuyez sur E pour entrer
        </button>
      </div>
    );
  }
  
  if (proximity.layoutType === 'arena') {
    const handleEnter = () => {
      if (onAction) onAction('enter_arena', proximity.type);
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 69, 0, 0.95)',
        border: '3px solid #ff4500',
        borderRadius: '8px',
        padding: '20px 30px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 1000,
        boxShadow: '0 0 20px rgba(255, 69, 0, 0.5)'
      }}>
        <div style={{ marginBottom: '10px' }}>🏟️ ARÈNE</div>
        <div style={{ fontSize: '14px', marginBottom: '15px', opacity: 0.9 }}>
          Combat pur | 5-7 vagues | Boss final
        </div>
        <button
          onClick={handleEnter}
          style={{
            background: '#ff4500',
            color: '#fff',
            border: '2px solid #fff',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          Appuyez sur E pour entrer
        </button>
      </div>
    );
  }
  
  return null;
}