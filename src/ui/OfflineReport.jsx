// ========================================
// 📊 RAPPORT D'ABSENCE (Modal)
// ========================================

import React from 'react';

export default function AbsenceReport({ report, onClose }) {
  if (!report) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.95)',
      border: '4px solid #ffaa00',
      borderRadius: '10px',
      padding: '30px',
      maxWidth: '500px',
      zIndex: 1000,
      boxShadow: '0 0 30px rgba(255, 170, 0, 0.8)'
    }}>
      <h2 style={{ 
        margin: '0 0 20px 0', 
        color: '#ffaa00', 
        textAlign: 'center',
        fontSize: '24px'
      }}>
        {report.died ? '💀 TU ES MORT !' : 
         report.wentKO ? '💀 TU ES TOMBÉ K.O. !' :
         report.wasKO ? '💀 TOUJOURS K.O.' :
         '📊 RAPPORT D\'ABSENCE'}
      </h2>
      
      <div style={{ fontSize: '16px', lineHeight: '2', color: '#ffffff' }}>
        <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255,170,0,0.1)', borderRadius: '5px' }}>
          <strong>⏰ Tu étais absent pendant:</strong><br/>
          {report.elapsedDays >= 1 ? 
            `${report.elapsedDays.toFixed(1)} jours (${report.elapsedHours.toFixed(1)}h)` :
            `${report.elapsedHours.toFixed(1)} heures`
          }
        </div>
        
        {report.died && (
          <div style={{ 
            padding: '15px', 
            background: 'rgba(255,0,0,0.2)', 
            borderRadius: '5px',
            marginBottom: '15px',
            border: '2px solid #ff0000'
          }}>
            <strong style={{ color: '#ff0000', fontSize: '18px' }}>💀 MORT DÉFINITIVE</strong><br/>
            Tu es resté K.O. trop longtemps sans réanimation.<br/>
            Tout a été réinitialisé.
          </div>
        )}
        
        <div style={{ marginBottom: '10px' }}>
          <strong>🍖 Faim:</strong> <span style={{ 
            color: report.hungerLost > 50 ? '#ff0000' : '#ffaa00' 
          }}>-{report.hungerLost.toFixed(1)}%</span>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>💧 Soif:</strong> <span style={{ 
            color: report.thirstLost > 50 ? '#ff0000' : '#00bfff' 
          }}>-{report.thirstLost.toFixed(1)}%</span>
        </div>
        
        {report.hpLost > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <strong>❤️ Vie:</strong> <span style={{ color: '#ff0000' }}>
              -{report.hpLost.toFixed(1)} HP
            </span>
            <br/>
            <small style={{ color: '#ff6666' }}>
              (Faim/Soif critique = perte de vie)
            </small>
          </div>
        )}
      </div>
      
      <button 
        onClick={onClose}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '12px',
          background: '#00ff00',
          border: 'none',
          borderRadius: '5px',
          color: '#000000',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        OK, COMPRIS !
      </button>
    </div>
  );
}