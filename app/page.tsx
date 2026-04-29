export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-8 relative">
      
      {/* Tiny status section - top right */}
      <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono">
        <span className="text-zinc-400">NODE STATUS</span>
        <div id="status" className="px-3 py-1 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span id="status-code" className="text-emerald-400">200</span>
        </div>
      </div>

      {/* Rest of your existing UI */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CryptoTestLab
        </h1>
        <p className="text-2xl text-zinc-400 mb-8">Test • Simulate • Deploy Web3 Games</p>
        
        <div className="grid grid-cols-3 gap-6 mb-12">
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

        <a href="/dashboard" 
           className="inline-block bg-white text-black px-10 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition">
          Open Testing Dashboard →
        </a>

        <p className="text-xs text-zinc-500 mt-16">Open source • Trusted by game devs • Powered by edge network</p>
      </div>
    </div>
  );
}
