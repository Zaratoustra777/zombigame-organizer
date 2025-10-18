// src/ui/DungeonUI.jsx

import React from 'react';

export default function DungeonUI({ dungeon, onStartWave, onExit }) {
  if (!dungeon || !dungeon.active) return null;
  
  const config = dungeon.config;
  const progress = (dungeon.currentWave / dungeon.totalWaves) * 100;
  const isFinalWave = dungeon.currentWave === dungeon.totalWaves;
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0,0,0,0.95)',
      border: `4px solid ${config.color}`,
      borderRadius: '15px',
      padding: '30px',
      minWidth: '450px',
      maxWidth: '600px',
      zIndex: 999,
      textAlign: 'center',
      fontFamily: 'monospace',
      boxShadow: `0 0 30px ${config.color}80`
    }}>
      {/* Titre */}
      <h2 style={{ 
        color: config.color, 
        margin: '0 0 10px 0',
        fontSize: '28px',
        textShadow: `0 0 10px ${config.color}`
      }}>
        {config.name}
      </h2>
      
      <p style={{ 
        color: '#aaa', 
        fontSize: '14px', 
        marginBottom: '25px',
        fontStyle: 'italic'
      }}>
        {config.description}
      </p>
      
      {/* Barre de progression */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{
          background: '#222',
          height: '25px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '8px',
          border: '2px solid #444',
          position: 'relative'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${config.color}dd, ${config.color})`,
            height: '100%',
            width: `${progress}%`,
            transition: 'width 0.5s ease',
            boxShadow: `inset 0 0 10px ${config.color}`
          }}/>
          
          {/* Texte centré sur la barre */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px #000',
            zIndex: 1
          }}>
            VAGUE {dungeon.currentWave}/{dungeon.totalWaves}
          </div>
        </div>
      </div>
      
      {/* Status */}
      {dungeon.waveCleared ? (
        <div>
          <div style={{
            color: '#00ff00',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '0 0 10px #00ff00',
            animation: 'pulse 1s infinite'
          }}>
            {isFinalWave ? '🏆 DONJON COMPLÉTÉ !' : '✅ VAGUE TERMINÉE !'}
          </div>
          
          {/* Boutons */}
          {!isFinalWave && (
            <button onClick={onStartWave} style={{
              ...btnStyle,
              background: config.color,
              marginBottom: '12px'
            }}>
              🌊 VAGUE SUIVANTE
            </button>
          )}
          
          <button onClick={onExit} style={{
            ...btnStyle,
            background: isFinalWave ? config.color : '#ff3333',
            color: '#000'
          }}>
            🚪 {isFinalWave ? 'SORTIR (SUCCÈS)' : 'ABANDONNER'}
          </button>
        </div>
      ) : (
        <div>
          <div style={{ 
            color: '#ffaa00', 
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px',
            animation: 'blink 1.5s infinite'
          }}>
            ⚔️ COMBAT EN COURS...
          </div>
          
          <div style={{
            color: '#888',
            fontSize: '13px',
            fontStyle: 'italic'
          }}>
            Élimine tous les ennemis !
          </div>
        </div>
      )}
      
      {/* Récompenses */}
      <div style={{
        marginTop: '25px',
        padding: '15px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          color: '#aaa', 
          fontSize: '11px',
          marginBottom: '5px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          💎 RÉCOMPENSES COLLECTÉES
        </div>
        <div style={{ 
          color: config.color, 
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          {dungeon.rewards.length} items T1
        </div>
      </div>
      
      {/* Animations CSS */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

const btnStyle = {
  width: '100%',
  padding: '15px 30px',
  border: 'none',
  borderRadius: '10px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  fontFamily: 'monospace',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all 0.2s',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  ':hover': {
    transform: 'scale(1.05)'
  }
};