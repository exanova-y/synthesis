// backend communication




export async function matchScent(text) {
    const res = await fetch(`${BASE}/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('match failed');
    return res.json();          // {idx, name, description, score}
}

export async function diffuseScent(idx) {
    return fetch(`${BASE}/diffuse/${idx}`, { method: 'POST' });
}
  