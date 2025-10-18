// src/App.jsx - VERSION FULLSCREEN RESPONSIVE

import React, { useState, useRef, useEffect } from 'react';
import GameEngine from './game/GameEngine';
import HUD from './ui/HUD';
import Inventory from './ui/Inventory';

export default function App() {
  const [stats, setStats] = useState({
    hp: 100,
    hunger: 100,
    thirst: 100,
    enemies: 0,
    dashReady: true,
    isKO: false
  });
  
  const gameStateRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Détecter si mobile/tablette
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      padding: 0,
      margin: 0,
      boxSizing: 'border-box'
    }}>
      {/* HUD - Responsive */}
      <HUD stats={stats} isMobile={isMobile} />
      
      {/* Canvas du jeu - Vraiment plein écran */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <GameEngine 
            onStatsUpdate={setStats}
            onReportUpdate={() => {}}
            onStateReady={(state) => {
              gameStateRef.current = state;
            }}
          />
        </div>
      </div>
      
      {/* Inventaire - Responsive */}
      {gameStateRef.current && (
        <Inventory 
          inventory={gameStateRef.current.inventory}
          player={gameStateRef.current.player}
          gameState={gameStateRef.current}
          isMobile={isMobile}
        />
      )}
      
      {/* Style global pour supprimer marges/scrollbars */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          touch-action: none;
        }
        
        #root {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}