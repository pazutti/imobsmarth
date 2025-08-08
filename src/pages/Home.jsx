import React, { useMemo, useState } from 'react';
import Bar from '../components/Bar.jsx';
import { formatCurrency } from '../utils/format.js';

export default function Home({ onLogin, onSignup }) {
  const [vistoriasMes, setVistoriasMes] = useState(6);
  const [contratosMes, setContratosMes] = useState(6);
  const vistConv = 400, contConv = 350, vistIA = 29, contIA = 29;
  const convencional = vistoriasMes * vistConv + contratosMes * contConv;
  const imobia = vistoriasMes * vistIA + contratosMes * contIA;
  const economia = Math.max(convencional - imobia, 0);

  const rows = useMemo(() => ([
    { label: 'Vistorias', a: vistoriasMes * vistConv, b: vistoriasMes * vistIA },
    { label: 'Contratos', a: contratosMes * contConv, b: contratosMes * contIA },
    { label: 'Total', a: convencional, b: imobia },
  ]), [vistoriasMes, contratosMes]);

  return (
    <main>
      <header className="sticky">
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div className="brand">
            <div className="logo">I</div>
            <strong>ImobIA</strong>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-outline" onClick={onLogin}>Entrar</button>
            <button className="btn btn-primary" onClick={onSignup}>Criar conta</button>
          </div>
        </div>
      </header>

      <section className="container" style={{display:'grid',gap:24,gridTemplateColumns:'1.1fr 0.9fr',alignItems:'center'}}>
        <div>
          <span className="chip">Novo • MVP</span>
          <h1 style={{marginTop:12,fontSize:44,lineHeight:1.1,fontWeight:900}}>Vistorias e contratos <span style={{color:'#4f46e5'}}>10x mais rápidos</span> com IA + validação humana</h1>
          <p style={{marginTop:12,fontSize:18,color:'#475569'}}>A ImobIA alia inteligência artificial e especialistas para entregar laudos precisos e contratos digitais em questão de minutos. Reduza custos sem abrir mão da segurança jurídica.</p>
          <div style={{marginTop:16,display:'flex',gap:12,flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={onSignup}>Teste grátis</button>
            <button className="btn btn-outline" onClick={onLogin}>Fazer login</button>
          </div>
          <div style={{marginTop:16,fontSize:12,color:'#6b7280'}}>7 dias de teste. Sem cartão. Cancele quando quiser.</div>
        </div>

        <div className="card" style={{background:'linear-gradient(135deg,#4f46e5,#7c3aed)',color:'#fff'}}>
          <div style={{opacity:0.9,fontSize:12}}>Comparativo de custos mensais</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:10}}>
            <div>
              <div style={{fontSize:12}}>Vistorias/mês</div>
              <input type="range" min="0" max="30" value={vistoriasMes} onChange={e=>setVistoriasMes(Number(e.target.value))} style={{width:'100%'}} />
              <div style={{fontSize:12,marginTop:4}}>{vistoriasMes}</div>
            </div>
            <div>
              <div style={{fontSize:12}}>Contratos/mês</div>
              <input type="range" min="0" max="30" value={contratosMes} onChange={e=>setContratosMes(Number(e.target.value))} style={{width:'100%'}} />
              <div style={{fontSize:12,marginTop:4}}>{contratosMes}</div>
            </div>
          </div>
          <div style={{marginTop:12}}>
            {rows.map((r,i)=><Bar key={i} label={r.label} convencional={r.a} imobia={r.b} />)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginTop:12,fontSize:13}}>
            <div style={{background:'rgba(255,255,255,.1)',padding:10,borderRadius:12}}>
              <div style={{opacity:0.9}}>Convencional</div>
              <div style={{fontWeight:800}}>{formatCurrency(convencional)}</div>
            </div>
            <div style={{background:'rgba(255,255,255,.1)',padding:10,borderRadius:12}}>
              <div style={{opacity:0.9}}>ImobIA</div>
              <div style={{fontWeight:800}}>{formatCurrency(imobia)}</div>
            </div>
            <div style={{background:'rgba(16,185,129,.25)',padding:10,borderRadius:12}}>
              <div style={{opacity:0.9}}>Economia</div>
              <div style={{fontWeight:800}}>{formatCurrency(economia)}</div>
            </div>
          </div>
          <div style={{marginTop:10,fontSize:12,opacity:0.9}}>
            Estimativas: vistoria {formatCurrency(vistConv)}, contrato {formatCurrency(contConv)}. ImobIA a partir de {formatCurrency(vistIA)} por item.
          </div>
        </div>
      </section>

      <section className="container" style={{marginTop:48,marginBottom:48}}>
        <h2 style={{fontSize:32,fontWeight:800,marginBottom:16}}>Por que escolher a ImobIA?</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:24}}>
          <div style={{padding:16,background:'#f8fafc',borderRadius:12}}>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>Agilidade incomparável</h3>
            <p style={{fontSize:14,color:'#475569'}}>Automatizamos etapas burocráticas e repetitivas, permitindo que você finalize vistorias e contratos em minutos, não dias.</p>
          </div>
          <div style={{padding:16,background:'#f8fafc',borderRadius:12}}>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>Economia garantida</h3>
            <p style={{fontSize:14,color:'#475569'}}>Reduza custos operacionais com tecnologia acessível e pague somente pelo uso. Seu negócio ganha escala sem inflar despesas.</p>
          </div>
          <div style={{padding:16,background:'#f8fafc',borderRadius:12}}>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>Segurança e confiança</h3>
            <p style={{fontSize:14,color:'#475569'}}>Combinamos IA de ponta e revisão humana para entregar laudos precisos e conformes às normas, oferecendo tranquilidade tanto para imobiliárias quanto para clientes finais.</p>
          </div>
          <div style={{padding:16,background:'#f8fafc',borderRadius:12}}>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>Experiência intuitiva</h3>
            <p style={{fontSize:14,color:'#475569'}}>Nossa plataforma foi desenhada para ser simples de usar em qualquer dispositivo. Sem curva de aprendizado: comece e veja resultados imediatos.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
