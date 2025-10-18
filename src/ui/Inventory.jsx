// src/ui/Inventory.jsx - VERSION RESPONSIVE

import React from 'react';
import { ITEMS } from '../config/items/index.js';

export default function Inventory({ inventory, player, gameState, isMobile }) {
  const handleSlotClick = (index) => {
    const item = inventory[index];
    if (!item) return;
    
    const itemDef = ITEMS[item.type];
    if (!itemDef) return;
    
    // Double-clic pour équiper/utiliser
    if (itemDef.category === 'weapon') {
      player.weapon = item.type;
      player.equippedWeaponSlot = index;
    } else if (itemDef.category === 'consumable') {
      if (itemDef.type === 'food') {
        player.hunger = Math.min(100, player.hunger + (itemDef.restore || 20));
      } else if (itemDef.type === 'drink') {
        player.thirst = Math.min(100, player.thirst + (itemDef.restore || 20));
      } else if (itemDef.type === 'health') {
        player.hp = Math.min(player.maxHp, player.hp + (itemDef.restore || 30));
      }
      
      item.count--;
      if (item.count <= 0) {
        inventory[index] = null;
      }
    }
  };
  
  const handleDragStart = (e, index) => {
    if (gameState?.ui) {
      gameState.ui.draggedSlot = index;
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    
    if (!gameState?.ui || gameState.ui.draggedSlot === null) return;
    
    const sourceIndex = gameState.ui.draggedSlot;
    
    const temp = inventory[targetIndex];
    inventory[targetIndex] = inventory[sourceIndex];
    inventory[sourceIndex] = temp;
    
    gameState.ui.draggedSlot = null;
  };

  const slotSize = isMobile ? 50 : 60;
  const gap = isMobile ? 6 : 8;
  const padding = isMobile ? 12 : 15;

  return (
    <div style={{
      position: 'fixed',
      bottom: isMobile ? '10px' : '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.85)',
      padding: `${padding}px`,
      borderRadius: isMobile ? '10px' : '15px',
      border: isMobile ? '2px solid #00ff00' : '3px solid #00ff00',
      boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
      zIndex: 100,
      maxWidth: '95vw',
      overflowX: 'auto'
    }}>
      <div style={{
        display: 'flex',
        gap: `${gap}px`,
        justifyContent: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}>
        {inventory.map((item, index) => {
          const itemDef = item ? ITEMS[item.type] : null;
          const isEquipped = player.equippedWeaponSlot === index;
          
          return (
            <div
              key={index}
              draggable={!!item}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDoubleClick={() => handleSlotClick(index)}
              onClick={() => {
                if (isMobile) handleSlotClick(index);
              }}
              style={{
                width: `${slotSize}px`,
                height: `${slotSize}px`,
                minWidth: `${slotSize}px`,
                background: isEquipped 
                  ? 'linear-gradient(135deg, #00ff00 0%, #00aa00 100%)'
                  : item 
                    ? 'rgba(50, 50, 50, 0.9)' 
                    : 'rgba(30, 30, 30, 0.9)',
                border: isEquipped 
                  ? `${isMobile ? 2 : 3}px solid #00ff00` 
                  : `${isMobile ? 1.5 : 2}px solid #555`,
                borderRadius: isMobile ? '6px' : '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: item ? 'pointer' : 'default',
                position: 'relative',
                transition: 'all 0.2s',
                boxShadow: isEquipped 
                  ? '0 0 15px rgba(0, 255, 0, 0.5)' 
                  : 'none',
                touchAction: 'manipulation'
              }}
              onMouseEnter={(e) => {
                if (item && !isMobile) {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.borderColor = '#00ff00';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.borderColor = isEquipped ? '#00ff00' : '#555';
                }
              }}
            >
              {item ? (
                <>
                  <div style={{
                    fontSize: isMobile ? '20px' : '24px',
                    marginBottom: '2px'
                  }}>
                    {itemDef?.icon || '📦'}
                  </div>
                  
                  {item.count > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: isMobile ? '2px' : '4px',
                      right: isMobile ? '2px' : '4px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: '#fff',
                      fontSize: isMobile ? '8px' : '10px',
                      fontWeight: 'bold',
                      padding: isMobile ? '1px 3px' : '2px 4px',
                      borderRadius: '3px',
                      fontFamily: 'monospace'
                    }}>
                      x{item.count}
                    </div>
                  )}
                  
                  {isEquipped && (
                    <div style={{
                      position: 'absolute',
                      top: isMobile ? '-6px' : '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#00ff00',
                      color: '#000',
                      fontSize: isMobile ? '8px' : '10px',
                      fontWeight: 'bold',
                      padding: isMobile ? '1px 4px' : '2px 6px',
                      borderRadius: isMobile ? '6px' : '8px',
                      fontFamily: 'monospace',
                      whiteSpace: 'nowrap'
                    }}>
                      ⚡
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  color: '#555',
                  fontSize: isMobile ? '10px' : '12px',
                  fontFamily: 'monospace'
                }}>
                  {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {!isMobile && (
        <div style={{
          marginTop: '8px',
          fontSize: '10px',
          color: '#aaa',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          Double-clic : Équiper/Utiliser | Drag & Drop : Déplacer
        </div>
      )}
      
      {isMobile && (
        <div style={{
          marginTop: '6px',
          fontSize: '9px',
          color: '#aaa',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          Tap : Utiliser/Équiper
        </div>
      )}
    </div>
  );
}