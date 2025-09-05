import { useState } from "react";
export default function AgentBox(){
  const [q,setQ]=useState("Kuo gali padėti?"); 
  const [a,setA]=useState(""); 
  const [busy,setBusy]=useState(false);
  const ask = async () => {
    if(!q.trim()) return;
    setBusy(true); setA("");
    const r = await fetch(`${import.meta.env.VITE_API_BASE||""}/api/agent/ask`, {
      method:"POST", headers:{ "content-type":"application/json" },
      body: JSON.stringify({ question: q })
    });
    const j = await r.json(); setA(j.answer||"(nėra ats.)"); setBusy(false);
  };
  return (
    <section style={{padding:12,border:"1px solid #ddd",borderRadius:8,marginTop:12}}>
      <h2 style={{marginTop:0}}>Asistentas (GPT)</h2>
      <textarea rows={3} value={q} onChange={e=>setQ(e.target.value)} style={{width:"100%"}} />
      <div style={{marginTop:8}}>
        <button onClick={ask} disabled={busy}>{busy?"Klausia...":"Klausti asistento"}</button>
      </div>
      {a && <pre style={{whiteSpace:"pre-wrap",marginTop:10}}>{a}</pre>}
    </section>
  );
}
