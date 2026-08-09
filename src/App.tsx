import Scene from './components/Scene'
import Projects from './components/Projects'
import Capabilities from './components/Capabilities'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import UfoCompanion from './components/UfoCompanion'
import AnimationToggle from './components/AnimationToggle'

function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative w-full text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-clip">
      <AnimationToggle />
      <Scene />
      <UfoCompanion />
      


      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 pointer-events-none">
        {/* Glow effect behind the card */}
        <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen pointer-events-none"></div>
        
        <div className="relative pointer-events-auto backdrop-blur-md bg-gradient-to-b from-white/5 to-transparent border-t border-t-white/20 border-x border-x-white/10 border-b border-b-white/5 p-10 md:p-16 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] text-center max-w-3xl transform transition-all hover:scale-[1.02] duration-500 ring-1 ring-white/5">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-teal-400/30 bg-teal-400/10 text-teal-300 text-sm font-medium tracking-wide uppercase">
            Full-Stack Software Engineer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-br from-indigo-300 via-teal-200 to-indigo-500 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
            Architecting the Modern Web
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 mb-10 leading-relaxed font-light">
            I engineer scalable backend systems and immersive, high-performance frontends that push the boundaries of the browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
            >
              Explore My Work
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-all hover:scale-105"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>

      <Capabilities />
      <Projects />
      <Philosophy />
      <Contact />
      
      <footer className="relative z-10 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Jonathan. Built with React, Three.js, and GSAP.</p>
      </footer>
    </main>
  )
}

export default App
