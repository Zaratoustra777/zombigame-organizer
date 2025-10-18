// ========================================
// 🎮 INFOS CONTRÔLES
// ========================================

import React from 'react';

export default function ControlsInfo() {
  return (
    <div style={{
      marginTop: '20px',
      background: 'rgba(0,0,0,0.8)',
      padding: '15px',
      borderRadius: '10px',
      maxWidth: '700px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#ffaa00' }}>🎮 CONTRÔLES</h3>
      <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
        <div><strong>PC:</strong> ZQSD/WASD = Mouvement</div>
        <div><strong>PC:</strong> ESPACE = Dash (×2.2 vitesse, CD 3s) ⚡</div>
        <div><strong>PC:</strong> Maintenir clic = Viser | Relâcher = Tirer 🎯</div>
        <div><strong>PC:</strong> Approche cadavre = Ouvrir loot AUTO 📦</div>
        <div><strong>PC:</strong> Double-clic item = Utiliser/Équiper ⚡</div>
        <div><strong>PC:</strong> Drag & drop = Déplacer items 🎒</div>
        <div><strong>📱 Mobile:</strong> Joystick gauche = Mouvement</div>
        <div><strong>📱 Mobile:</strong> Droite = Viser + Relâcher = Tir 🎯</div>
        <div><strong>📱 Mobile:</strong> Bouton DASH en bas à droite</div>
      </div>
      
      <div style={{
        marginTop: '10px',
        padding: '10px',
        background: 'rgba(255,0,0,0.3)',
        borderRadius: '5px',
        fontSize: '11px'
      }}>
        <strong>🍖💧 SURVIE HARDCORE:</strong><br/>
        Faim/Soif: 100→0 en 48h réel | Si 0 → HP diminue en 24h<br/>
        HP=0 → K.O. 12h | Pas réanimé = MORT DÉFINITIVE !<br/>
        <strong style={{ color: '#ffaa00' }}>⚠️ TON PERSO VIT MÊME HORS LIGNE !</strong><br/>
        <strong style={{ color: '#ff6666' }}>💾 Note: localStorage ne fonctionne pas sur Claude.ai</strong>
      </div>
    </div>
  );
}