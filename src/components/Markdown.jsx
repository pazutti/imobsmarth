
import React from 'react'
export default function Markdown({ text }) {
  const lines = String(text || '').split('\n')
  return (
    <div>
      {lines.map((l, i) => {
        if (l.startsWith('# ')) return <h1 key={i} style={{ fontSize: 22, fontWeight: 800, marginTop: 16 }}>{l.slice(2)}</h1>
        if (l.startsWith('## ')) return <h2 key={i} style={{ fontSize: 18, fontWeight: 700, marginTop: 12 }}>{l.slice(3)}</h2>
        if (l.startsWith('### ')) return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, marginTop: 10 }}>{l.slice(4)}</h3>
        if (l.trim() === '') return <div key={i} style={{ height: 8 }} />
        return <p key={i} style={{ margin: 0 }}>{l}</p>
      })}
    </div>
  )
}
