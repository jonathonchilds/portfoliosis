import { useAnimationState } from '../context/AnimationContext';

export default function AnimationToggle() {
  const { ufoEnabled, blobEnabled, toggleUfo, toggleBlob } = useAnimationState();

  return (
    <div className="fixed top-4 right-4 z-50 flex border border-white/20 rounded-full overflow-hidden shadow-lg backdrop-blur-md">
      <button
        onClick={toggleUfo}
        className={`cursor-pointer px-4 py-2 text-xs md:text-sm font-semibold transition-colors duration-300 border-r border-white/20 ${
          ufoEnabled
            ? 'bg-indigo-500/80 text-white'
            : 'bg-black/40 text-slate-400 hover:bg-white/10'
        }`}
      >
        UFO
      </button>
      <button
        onClick={toggleBlob}
        className={`cursor-pointer px-4 py-2 text-xs md:text-sm font-semibold transition-colors duration-300 ${
          blobEnabled
            ? 'bg-teal-500/80 text-white'
            : 'bg-black/40 text-slate-400 hover:bg-white/10'
        }`}
      >
        BLOB
      </button>
    </div>
  );
}
