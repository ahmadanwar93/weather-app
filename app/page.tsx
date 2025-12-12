export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="border border-zinc-700 p-4 max-w-4xl">
        <h1 className="text-lg tracking-wide mb-2">MET_MY_WEATHER</h1>
        <p className="text-zinc-500 text-sm">7-Day Forecast System</p>

        <div className="mt-4 pt-4 border-t border-zinc-800">
          <span className="text-cyan-400">STATUS:</span>
          <span className="ml-2 text-green-500">● ONLINE</span>
        </div>
      </div>
    </main>
  );
}
