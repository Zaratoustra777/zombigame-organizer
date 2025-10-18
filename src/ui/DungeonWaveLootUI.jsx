// src/ui/DungeonWaveLootUI.jsx - NOUVEAU FICHIER

import React from 'react';
import { ITEMS } from '../config/items/index.js';
import { startNextWave, exitDungeon } from '../systems/dungeon.js';

export default function DungeonWaveLootUI({ dungeon, gameState, onClose }) {
  if (!dungeon.pendingLoot) return null;
  
  const { loot, isLastWave } = dungeon.pendingLoot;
  
  const handleTakeItem = (item) => {
    // Ajouter à l'inventaire
    const emptySlot = gameState.inventory.findIndex(slot => slot === null);
    if (emptySlot !== -1) {
      gameState.inventory[emptySlot] = item;
      
      // Retirer du loot pending
      const index = loot.indexOf(item);
      if (index > -1) {
        loot.splice(index, 1);
      }
    }
  };
  
  const handleContinue = () => {
    dungeon.pendingLoot = null;
    startNextWave(dungeon, gameState);
  };
  
  const handleExit = () => {
    exitDungeon(dungeon, gameState.player, gameState);
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
        border: '4px solid #00ff00',
        borderRadius: '16px',
        padding: '30px',
        maxWidth: '600px',
        width: '90%',
        boxShadow: '0 0 40px rgba(0, 255, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            color: '#00ff00',
            fontSize: '32px',
            margin: '0 0 10px 0',
            fontFamily: 'monospace',
            textTransform: 'uppercase'
          }}>
            ✅ Vague {dungeon.currentWave} Terminée !
          </h2>
          {isLastWave && (
            <p style={{
              color: '#ffaa00',
              fontSize: '20px',
              margin: 0,
              fontFamily: 'monospace'
            }}>
              🎉 ARÈNE COMPLÉTÉE !
            </p>
          )}
        </div>
        
        {/* Loot */}
        {loot.length > 0 ? (
          <div>
            <h3 style={{
              color: '#fff',
              fontSize: '20px',
              marginBottom: '15px',
              fontFamily: 'monospace',
              textAlign: 'center'
            }}>
              💎 Loot Obtenu
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {loot.map((item, index) => {
                const itemData = ITEMS[item.type];
                return (
                  <div
                    key={index}
                    onClick={() => handleTakeItem(item)}
                    style={{
                      background: 'rgba(0, 255, 0, 0.1)',
                      border: '2px solid #00ff00',
                      borderRadius: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 0, 0.3)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 0, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={{
                      fontSize: '24px',
                      marginBottom: '5px'
                    }}>
                      {itemData?.icon || '❓'}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#fff',
                      fontFamily: 'monospace',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {itemData?.name || item.type}
                    </div>
                    {item.count > 1 && (
                      <div style={{
                        fontSize: '12px',
                        color: '#ffaa00',
                        fontWeight: 'bold'
                      }}>
                        x{item.count}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <p style={{
              color: '#aaa',
              fontSize: '14px',
              textAlign: 'center',
              fontFamily: 'monospace',
              margin: '10px 0'
            }}>
              👆 Clique sur un item pour l'ajouter à ton inventaire
            </p>
          </div>
        ) : (
          <p style={{
            color: '#888',
            fontSize: '18px',
            textAlign: 'center',
            fontFamily: 'monospace',
            margin: '20px 0'
          }}>
            💎 Pas de loot cette fois
          </p>
        )}
        
        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px'
        }}>
          {!isLastWave && (
            <button
              onClick={handleContinue}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #00ff00, #00cc00)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '0 4px 10px rgba(0, 255, 0, 0.3)'
              }}
            >
              ▶️ Continuer
            </button>
          )}
          
          <button
            onClick={handleExit}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #ff0000, #cc0000)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '15px',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(255, 0, 0, 0.3)'
            }}
          >
            🚪 Sortir
          </button>
        </div>
      </div>
    </div>
  );
}