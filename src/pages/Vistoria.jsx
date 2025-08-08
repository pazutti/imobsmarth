
import React, { useMemo, useState } from 'react'
import useVistoria from '../hooks/useVistoria.js'
import Markdown from '../components/Markdown.jsx'

export default function Vistoria({ onLogout }) {
  const { address, setAddress, rooms, addRoom, removeRoom } = useVistoria()
  const [images, setImages] = useState([])
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [findings, setFindings] = useState([])
  const [roomToAdd, setRoomToAdd] = useState('')

  const onUpload = (files, room) => {
    if (!files) return
    const arr = Array.from(files).map(f => ({ url: URL.createObjectURL(f), room }))
    setImages(prev => [...prev, ...arr])
  }

  const runAI = async () => {
    if (rooms.length === 0) return
    setRunning(true); setProgress(0)
    for (let i=1;i<=100;i++){ await new Promise(r=>setTimeout(r,8)); setProgress(i) }
    const out = rooms.map(r => ({ room: r, tags:['piso_claro'], notes:['Sem trincas aparentes','Pintura em bom estado'], suspected: r.toLowerCase().includes('banheiro')?['azulejo_fissura_leve']:[] }))
    setFindings(out); setRunning(false)
  }

  const laudo = useMemo(()=>{
    const lines = []
    lines.push('# Laudo de Vistoria – Imóvel')
    lines.push(`Endereço informado: ${address || '(não informado)'}`)
    findings.forEach(f=>{
      const tags = (f.tags||[]).join(', ') || '—'
      const notes = (f.notes||[]).join('; ') || '—'
      const sus = (f.suspected||[]).join(', ') || 'Nenhuma'
      lines.push('')
      lines.push(`## ${f.room}`)
      lines.push(`Itens/Acabamentos: ${tags}`)
      lines.push(`Observações: ${notes}`)
      lines.push(`Alertas: ${sus}`)
    })
    lines.push('')
    lines.push('**Aviso**: Este laudo foi gerado por IA e pode conter imprecisões. Recomenda-se validação humana.')
    return lines.join('\n')
  }, [findings, address])

  return (
    <main className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Vistoria</h1>
        <button className="btn btn-outline" onClick={onLogout}>Sair</button>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 2fr', marginTop:16}}>
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Dados do Imóvel</div>
          <div style={{fontSize:12, color:'#334155'}}>Endereço</div>
          <input className="input" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Rua, nº, bairro, cidade" />

          <div style={{marginTop:12}}>
            <div style={{fontSize:12, color:'#334155'}}>Adicionar cômodo</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:8, marginTop:6}}>
              <select className="select" value={roomToAdd} onChange={e=>setRoomToAdd(e.target.value)}>
                <option value="">Selecione</option>
                {['Sala','Quarto','Cozinha','Banheiro','Varanda','Área de Serviço','Garagem','Quintal','Escritório','Hall','Despensa','Copa','Lavabo','Suíte','Área Técnica','Terraço','Jardim','Corredor','Loja','Depósito','Sacada'].map((r,i)=>(<option key={i} value={r}>{r}</option>))}
              </select>
              <button className="btn btn-outline" onClick={()=>{ if(roomToAdd){ addRoom(roomToAdd); setRoomToAdd('') } }}>Adicionar</button>
            </div>

            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:8}}>
              {rooms.map((r,i)=>(
                <span key={r+i} style={{ padding:'6px 10px', background:'#eef2ff', color:'#4f46e5', borderRadius:999, display:'inline-flex', alignItems:'center', gap:8 }}>
                  {r}
                  <button onClick={()=>removeRoom(i)} style={{ color:'#64748b' }}>×</button>
                </span>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={runAI} disabled={running || rooms.length===0} style={{ width:'100%', marginTop:12 }}>
            {running ? `Analisando ${progress}%` : 'Rodar IA de Vistoria'}
          </button>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Imagens por cômodo</div>
          {rooms.length===0 ? (
            <div style={{ color:'#64748b' }}>Adicione cômodos para habilitar o upload.</div>
          ) : (
            <div className="grid">
              {rooms.map((room,i)=>(
                <div key={room+i} className="card" style={{padding:12}}>
                  <div style={{fontWeight:700, marginBottom:6}}>{room}</div>
                  <input type="file" accept="image/*" multiple onChange={e=>onUpload(e.target.files, room)} />
                  <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginTop:8}}>
                    {images.filter(im=>im.room===room).map((img,idx)=>(
                      <img key={room+idx} src={img.url} alt="img" style={{width:'100%', height:96, objectFit:'cover', borderRadius:10, border:'1px solid #e5e7eb'}}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{fontWeight:700, marginTop:16, marginBottom:8}}>Achados da IA</div>
          {findings.length===0 ? (
            <div style={{ color:'#64748b' }}>Rode a IA para ver o resumo por cômodo.</div>
          ) : (
            <div className="grid">
              {findings.map((f,i)=>(
                <div key={'f-'+i} className="card" style={{padding:10}}>
                  <div style={{fontWeight:700}}>{f.room}</div>
                  <div style={{fontSize:13, color:'#334155'}}>Itens: {(f.tags||[]).join(', ')||'—'}</div>
                  <div style={{fontSize:13, color:'#334155'}}>Obs: {(f.notes||[]).join('; ')||'—'}</div>
                  <div style={{fontSize:13, color:'#92400e'}}>Alertas: {(f.suspected||[]).join(', ')||'Nenhum'}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{marginTop:12}}>
            <a href={URL.createObjectURL(new Blob([laudo], { type: 'text/markdown;charset=utf-8' }))} download="laudo_vistoria.md" className="btn btn-outline" style={{ textDecoration:'none', display:'inline-block' }}>Baixar Laudo (Markdown)</a>
          </div>

          <div className="card" style={{marginTop:12}}>
            <div style={{fontWeight:700, marginBottom:8}}>Prévia do Laudo</div>
            <Markdown text={laudo} />
          </div>
        </div>
      </div>
    </main>
  )
}
