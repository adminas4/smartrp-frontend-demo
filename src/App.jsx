import { useState } from "react";
import AgentBox from "./AgentBox.jsx";

export default function App(){
  const [item,setItem]=useState("");
  const [offers,setOffers]=useState([]);
  const onSuggest = async () => {
    const r = await fetch(`${import.meta.env.VITE_API_BASE||""}/api/pricing/suggest`,{
      method:"POST", headers:{ "content-type":"application/json" },
      body: JSON.stringify({ items:[{name:item||"OSB"}] })
    });
    const j = await r.json();
    setOffers(j.results?.[0]?.offers || []);
  };
  return (
    <div style={{maxWidth:820,margin:"40px auto",padding:16,fontFamily:"system-ui,sans-serif"}}>
      <h1>SmartRP – demo</h1>
      <section style={{padding:12,border:"1px solid #ddd",borderRadius:8}}>
        <h2 style={{marginTop:0}}>Kainų paieška (stub)</h2>
        <label>Prekė:&nbsp;
          <input value={item} onChange={e=>setItem(e.target.value)} />
        </label>
        <button onClick={onSuggest} style={{marginLeft:8}}>Siūlyti</button>
        <div style={{marginTop:10}}>
          {offers.length===0 ? <i>nėra pasiūlymų</i> :
            <ul>{offers.map((o,i)=>
              <li key={i}>
                <a href={o.url} target="_blank" rel="noreferrer">{o.title}</a>
                {typeof o.price_nok==="number" ? ` – ${o.price_nok} NOK` : ""}
              </li>
            )}</ul>}
        </div>
      </section>
      <AgentBox/>
    </div>
  );
}
