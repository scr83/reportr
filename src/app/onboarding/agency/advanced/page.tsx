export default function OnboardingPlaceholder() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-white text-2xl font-bold mb-2">
          Coming Soon
        </h1>
        <p className="text-slate-400 mb-4">
          This onboarding page is under construction.
        </p>
        <div className="text-xs text-slate-500 font-mono bg-slate-900 p-2 rounded">
          Route: /onboarding/agency/advanced
        </div>
      </div>
    </div>
  );
}