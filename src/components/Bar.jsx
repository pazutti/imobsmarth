
import React from 'react'
import { formatCurrency } from '../utils/format.js'

export default function Bar({ label, convencional, imobia }) {
  const max = Math.max(convencional, imobia, 1)
  const aw = Math.round((convencional / max) * 100)
  const bw = Math.round((imobia / max) * 100)
  return (
    <div className="barRow">
      <div style={{ fontSize: 12, color: '#334155', marginBottom: 6 }}>{label}</div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <div className="barTrack a"><div className="barFill a" style={{ width: aw + '%' }} /></div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Convencional: <strong>{formatCurrency(convencional)}</strong></div>
        </div>
        <div>
          <div className="barTrack b"><div className="barFill b" style={{ width: bw + '%' }} /></div>
          <div style={{ fontSize: 12, marginTop: 4 }}>ImobIA: <strong>{formatCurrency(imobia)}</strong></div>
        </div>
      </div>
    </div>
  )
}
