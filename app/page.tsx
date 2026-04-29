'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [tinyStatus, setTinyStatus] = useState({ code: 0, color: 'zinc' });
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  // Tiny live status (top right)
  useEffect(() => {
    fetch('/api/relay', { method: 'GET', cache: 'no-store' })
      .then(res => setTinyStatus({ code: res.status, color: res.status === 200 ? 'emerald' : 'red' }))
      .catch(() => setTinyStatus({ code: 502, color: 'red' }));
  }, []);

  const runNodeTest = async () => {
    setTesting(true);
    setTestResult(null);
    const start = Date.now();

    try {
      const res = await fetch('/api/relay', { 
        method: 'GET', 
        cache: 'no-store',
        headers: { 'X-Test': 'game-node-check' }
      });
      const latency = Date.now() - start;

      setTestResult({
        status: res.status,
        latency,
        ok: res.status >= 200 && res.status < 300
      });
    } catch (err) {
      setTestResult({ status: 502, latency: Date.now() - start, ok: false });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 relative">
      {/* Tiny status */}
      <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono">
        <span className="text-zinc-400">NODE STATUS</span>
        <div className="px-3 py-1 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center gap-1.5">
          <div className={`w-2 h-2 bg-${tinyStatus.color}-400 rounded-full animate-pulse`}></div>
          <span className={`text-${tinyStatus.color}-400`}>{tinyStatus.code}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
          CryptoTestLab
        </h1>

        {/* === NEW TESTING SECTION === */}
        <div className="mt-16 bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Live Game Node Tester</h2>
          <p className="text-zinc-400 text-center mb-8">Test real-time connectivity to your active game node</p>

          <div className="flex justify-center mb-8">
            <button
              onClick={runNodeTest}
              disabled={testing}
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 text-black font-semibold text-lg rounded-2xl transition"
            >
              {testing ? 'Testing Connection...' : 'Test Live Game Node'}
            </button>
          </div>

          {testResult && (
            <div className="max-w-md mx-auto bg-black/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Status Code</span>
                <span className={`font-mono text-2xl ${testResult.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                  {testResult.status}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-zinc-400">Latency</span>
                <span className="font-mono text-2xl">{testResult.latency} ms</span>
              </div>
              <div className="mt-6 text-center text-sm font-medium">
                {testResult.ok ? (
                  <span className="text-emerald-400">✅ Game Node Connected Successfully</span>
                ) : (
                  <span className="text-red-400">❌ Connection Failed</span>
                )}
              </div>
            </div>
          )}
        </div>
        {/* === END OF TESTING SECTION === */}

        <div className="grid grid-cols-3 gap-6 mt-16">
          {/* your existing 3 cards */}
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <div className="text-cyan-400 text-5xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold">Game Simulator</h3>
            <p className="text-zinc-500 mt-2">Test your game on 12 testnets instantly</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <div className="text-purple-400 text-5xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold">Wallet Tester</h3>
            <p className="text-zinc-500 mt-2">Connect &amp; debug any wallet flow</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <div className="text-emerald-400 text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold">Live Game Nodes</h3>
            <p className="text-zinc-500 mt-2">Ultra-low latency edge nodes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
