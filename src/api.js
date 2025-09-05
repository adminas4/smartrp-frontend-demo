const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function health() {
  const r = await fetch(`${API_BASE}/progress/health`);
  return r.status; // 204 ok
}

export async function listProgress(project_id) {
  const r = await fetch(`${API_BASE}/progress/list?project_id=${encodeURIComponent(project_id)}`);
  if (!r.ok) throw new Error('progress list failed');
  return r.json();
}

export async function createProgress(payload) {
  const r = await fetch(`${API_BASE}/progress/create`, {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('progress create failed');
  return r.json();
}

export async function pricingSuggest(items) {
  const r = await fetch(`${API_BASE}/pricing/suggest`, {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({ items })
  });
  if (!r.ok) throw new Error('pricing suggest failed');
  return r.json();
}
