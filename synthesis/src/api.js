// backend communication
const BASE = 'http://127.0.0.1:8000'; // uvicorn

export async function returnMostSimilarScent(text) {
    console.log("begin fetch.");
    const res = await fetch(`${BASE}/match`, {
      method: 'POST', // transcript information goes *not* into the url.
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    console.log("fetch complete.");
    if (!res.ok) throw new Error('match failed');
    return res.json();          // {idx, name, description, score}
}

export async function diffuseScent(idx) {
    return fetch(`${BASE}/diffuse/${idx}`, { method: 'POST' });
}
