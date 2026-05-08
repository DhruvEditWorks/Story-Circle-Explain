import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';
import { ArrowRight, Clapperboard, Film, Flame, Play, RadioTower, Sparkles, Wand2 } from 'lucide-react';
import './styles.css';

const storySteps = [
  { step: 'YOU', meaning: 'Reveal the ordinary identity before the story applies pressure.', emotional: 'Creates recognition. The audience needs a human anchor before spectacle matters.', psychology: 'Baseline attachment forms through habits, wounds, humor, and contradictions.', examples: 'Miles Morales sketching stickers. Naruto alone on the swing. Cobb haunted by memory.', mistakes: 'Starting with lore instead of emotional context; making the hero impressive but unknowable.', visual: 'Use still frames, routine details, quiet rooms, or repeated objects that carry identity.' },
  { step: 'NEED', meaning: 'Expose the missing emotional nutrient beneath the visible goal.', emotional: 'Turns plot into ache. Desire becomes personal because something inside is unresolved.', psychology: 'The conscious want masks an unconscious wound, shame, fear, or false belief.', examples: 'Spider-Man wants approval, but needs responsibility. Joker wants recognition, but needs dignity.', mistakes: 'Confusing a task with a transformation; giving the hero no internal contradiction.', visual: 'Frame the character beside what they cannot reach. Let silence reveal the gap.' },
  { step: 'GO', meaning: 'Cross the threshold into a world that cannot be solved by old behavior.', emotional: 'Creates momentum and danger. The audience feels the story become irreversible.', psychology: 'Novelty spikes attention because the familiar self is no longer enough.', examples: 'Cooper leaves Earth. Eren enters combat. A Minecraft creator enters the ruined city.', mistakes: 'A weak threshold; the hero could simply go home without consequence.', visual: 'Doorways, vehicles, portals, cuts from warm safety to cold scale, sudden sound drops.' },
  { step: 'SEARCH', meaning: 'Test strategies, allies, false answers, and survival patterns.', emotional: 'Builds curiosity. We watch the hero learn the language of the new world.', psychology: 'Trial and error exposes hidden values and forces adaptive behavior.', examples: 'Training arcs in anime. Detective sequences in thrillers. Documentary investigation turns.', mistakes: 'Making the middle a list of events without escalation or emotional cost.', visual: 'Montage with changing rhythm, maps, repeated failures, visual motifs evolving each scene.' },
  { step: 'FIND', meaning: 'Reach the thing desired, or discover the truth beneath the desire.', emotional: 'Offers release, then complication. What is found is rarely what was expected.', psychology: 'The reward confronts the false belief and makes denial harder.', examples: 'The basement reveal in Attack on Titan. Interstellar finding time as love and physics.', mistakes: 'Treating the midpoint as only a clue; no emotional reframe occurs.', visual: 'Change lens language, color temperature, or music key to signal a deeper discovery.' },
  { step: 'TAKE', meaning: 'Pay the price. Transformation demands sacrifice, loss, or moral choice.', emotional: 'Creates intensity and respect. The story proves the stakes are real.', psychology: 'Pain gives the new identity weight because the old self cannot survive intact.', examples: 'Peter loses Uncle Ben. Naruto chooses empathy over revenge. Joker embraces a destructive mask.', mistakes: 'Reward without cost; sacrifice that does not connect to the wound.', visual: 'Hold on faces. Remove music. Let one irreversible action own the frame.' },
  { step: 'RETURN', meaning: 'Bring the changed self back to the original world or emotional arena.', emotional: 'Creates comparison. We feel distance between who they were and who they are.', psychology: 'Return tests whether insight can survive reality, not just adventure.', examples: 'The hero faces the same room differently. The editor returns to the opening image with new meaning.', mistakes: 'Skipping integration; ending immediately after the climax.', visual: 'Mirror the opening shot with altered blocking, sound, or posture.' },
  { step: 'CHANGE', meaning: 'Make transformation visible through choice, not explanation.', emotional: 'Creates catharsis. The audience feels the internal shift land in behavior.', psychology: 'Closure occurs when belief changes, even if the external world remains imperfect.', examples: 'Miles takes the leap of faith. Cooper lets go. A short film hero speaks the truth.', mistakes: 'Having the character say the lesson without living it.', visual: 'End on action, contrast, posture, light, or a motif transformed by meaning.' },
];

const examples = [
  ['Interstellar', 'Love, time, sacrifice, and the terror of leaving home become one emotional equation.'],
  ['Spider-Man', 'Power is external; responsibility is the internal transformation that makes the myth last.'],
  ['Naruto', 'Loneliness becomes empathy through escalating tests of belonging, rage, and forgiveness.'],
  ['Attack on Titan', 'Freedom mutates from desire into ideology, then into tragedy.'],
  ['Joker', 'A wounded belief finds catharsis in performance, but transformation turns corrosive.'],
  ['Minecraft Cinematic Stories', 'Blocks become mythology when scale, silence, and visual cause-effect create emotion.'],
];

const lessons = [
  ['Short Film Writing', 'Build a complete transformation in one decisive emotional turn.', Film],
  ['Trailer Storytelling', 'Compress desire, danger, contrast, and catharsis into escalation.', Play],
  ['Documentary Storytelling', 'Find the human question beneath facts, footage, and testimony.', RadioTower],
  ['Anime Emotional Pacing', 'Use pause, repetition, memory, and release to make feelings land.', Flame],
  ['YouTube Retention Storytelling', 'Turn curiosity gaps into honest emotional propulsion.', Sparkles],
  ['Cinematic Editing Psychology', 'Shape attention through rhythm, contrast, silence, and payoff.', Clapperboard],
];

function ParticleField() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    const redLight = new THREE.PointLight(0xff2b2b, 12, 18);
    redLight.position.set(-3, -1, 4);
    scene.add(redLight);
    let frame;
    const animate = () => {
      points.rotation.y += 0.0009;
      points.rotation.x += 0.00025;
      redLight.position.x = Math.sin(Date.now() * 0.0005) * 3.5;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="particle-field" ref={mountRef} aria-hidden="true" />;
}

function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (event) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${event.clientX - 190}px, ${event.clientY - 190}px)`;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div className="mouse-glow" ref={ref} aria-hidden="true" />;
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.35]);
  return (
    <section className="hero section" id="top">
      <ParticleField />
      <motion.div className="story-orbit" style={{ y, opacity }} aria-hidden="true">
        {storySteps.map((item, index) => <span key={item.step} style={{ '--i': index }}>{index + 1}</span>)}
      </motion.div>
      <motion.div className="hero-content" initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.1, ease: 'easeOut' }}>
        <div className="brand-line">DS Framework Studio</div>
        <h1>MASTER CINEMATIC STORYTELLING</h1>
        <p>Learn how emotion, conflict, and transformation create unforgettable stories.</p>
        <div className="hero-actions">
          <a className="button primary" href="#builder">Start Learning <ArrowRight size={18} /></a>
          <a className="button ghost" href="#story-circle">Explore Story Circle</a>
        </div>
      </motion.div>
      <div className="hero-tagline">Where Emotion Meets Cinema.</div>
    </section>
  );
}

function StoryCircle() {
  const [active, setActive] = useState(0);
  const activeStep = storySteps[active];
  return (
    <section className="section circle-section" id="story-circle">
      <div className="section-kicker">Interactive Framework</div>
      <h2>Dan Harmon's Story Circle, Rebuilt as a Cinematic Lab</h2>
      <div className="circle-layout">
        <div className="circle-stage"><div className="circle-core">
          {storySteps.map((item, index) => <button type="button" key={item.step} className={`circle-step ${active === index ? 'active' : ''}`} style={{ '--i': index }} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>{index + 1}</span>{item.step}</button>)}
          <div className="circle-title"><span>8-Step</span>Story Engine</div>
        </div></div>
        <AnimatePresence mode="wait">
          <motion.article className="glass-panel step-panel" key={activeStep.step} initial={{ opacity: 0, x: 22, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -18, filter: 'blur(8px)' }} transition={{ duration: 0.35 }}>
            <div className="step-number">{String(active + 1).padStart(2, '0')}</div>
            <h3>{activeStep.step}</h3>
            <Info label="Meaning" text={activeStep.meaning} />
            <Info label="Emotional Purpose" text={activeStep.emotional} />
            <Info label="Psychological Effect" text={activeStep.psychology} />
            <Info label="Famous Examples" text={activeStep.examples} />
            <Info label="Common Mistakes" text={activeStep.mistakes} />
            <Info label="Visual Storytelling" text={activeStep.visual} />
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Info({ label, text }) { return <div className="info-row"><strong>{label}</strong><p>{text}</p></div>; }

function Psychology() {
  const emotions = ['Fear', 'Desire', 'Conflict', 'Vulnerability', 'Catharsis', 'Transformation'];
  return <section className="section psychology"><div className="section-kicker">Story Psychology</div><h2>Why Stories Control Emotion</h2><div className="emotion-grid">{emotions.map((emotion, index) => <motion.div className="emotion-card" key={emotion} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}><div className="mini-graph" style={{ '--level': 34 + index * 8 }} /><h3>{emotion}</h3><p>{emotion} becomes cinematic when it changes what the character is willing to risk.</p></motion.div>)}</div><div className="belief-compare">{[['Monster', 'I am weak.'], ['Rejection', 'I am unlovable.'], ['Failure', 'I will never matter.']].map(([external, internal]) => <div className="comparison-card" key={external}><span>External Problem</span><h3>{external}</h3><i /><span>Internal Belief</span><h3>"{internal}"</h3></div>)}</div></section>;
}

function Examples() {
  const [open, setOpen] = useState(0);
  return <section className="section examples"><div className="section-kicker">Cinematic Examples</div><h2>Story Worlds You Can Deconstruct</h2><div className="example-grid">{examples.map(([title, description], index) => <motion.button type="button" className={`example-card ${open === index ? 'open' : ''}`} key={title} onClick={() => setOpen(open === index ? -1 : index)} whileHover={{ y: -6 }}><span>Case File {String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p><AnimatePresence>{open === index && <motion.div className="breakdown" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><b>Breakdown</b><p>Circle: ordinary wound, pressure threshold, false answer, sacrifice, return, changed choice.</p><p>Arc: the character's visible goal collides with a deeper belief that must be rewritten.</p></motion.div>}</AnimatePresence></motion.button>)}</div></section>;
}

function StoryBuilder() {
  const [form, setForm] = useState({ character: 'A quiet editor', fear: 'being invisible', desire: 'to create a film that matters', belief: 'my voice is too small', conflict: 'a final deadline and a broken friendship', ending: 'chooses truth over perfection' });
  const output = useMemo(() => { const c = form.character || 'Your character'; return [['YOU', `${c} begins in a familiar world shaped by the belief: "${form.belief || 'I am not enough'}."`], ['NEED', `They want ${form.desire || 'something meaningful'}, but secretly fear ${form.fear || 'loss'}.`], ['GO', `The conflict arrives: ${form.conflict || 'a pressure they cannot avoid'}.`], ['SEARCH', 'They try old strategies first, then discover the cost of staying unchanged.'], ['FIND', 'A truth appears: the external win is meaningless without emotional honesty.'], ['TAKE', `They sacrifice the old mask and make the ending real: ${form.ending || 'choose transformation'}.`], ['RETURN', 'They come back to the original arena with a new posture and clearer voice.'], ['CHANGE', 'The final image proves the belief has transformed through action.']]; }, [form]);
  return <section className="section builder" id="builder"><div className="section-kicker">Story Builder Tool</div><h2>Generate a Cinematic Short Film Structure</h2><div className="builder-layout"><div className="glass-panel form-panel">{Object.entries(form).map(([key, value]) => <label key={key}><span>{key.replace(/^\w/, (letter) => letter.toUpperCase())}</span><input value={value} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>)}</div><div className="glass-panel output-panel"><div className="output-header"><Wand2 size={20} />Complete Story Circle</div>{output.map(([label, text]) => <div className="output-step" key={label}><strong>{label}</strong><p>{text}</p></div>)}<div className="short-outline"><b>Short Film Outline</b><p>Opening image, emotional disruption, failed control, midpoint truth, costly decision, mirrored return, transformed final image.</p></div></div></div></section>;
}

function ArcVisualizer() {
  const [values, setValues] = useState({ tension: 68, hope: 42, fear: 56, conflict: 74, catharsis: 62 });
  const points = useMemo(() => Object.values(values).map((value, index) => `${8 + index * 21},${96 - value}`).join(' '), [values]);
  return <section className="section arc"><div className="section-kicker">Emotional Arc Visualizer</div><h2>Shape the Feeling Curve</h2><div className="arc-layout"><div className="arc-canvas glass-panel"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><filter id="glow"><feGaussianBlur stdDeviation="2.2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><path d="M 0 82 C 20 76, 28 30, 48 48 S 70 82, 100 18" className="ghost-curve" /><polyline points={points} className="main-curve" filter="url(#glow)" />{Object.values(values).map((value, index) => <circle key={`${value}-${index}`} cx={8 + index * 21} cy={96 - value} r="2.2" />)}</svg></div><div className="control-stack">{Object.entries(values).map(([key, value]) => <label key={key}><span>{key}</span><input type="range" min="5" max="95" value={value} onChange={(event) => setValues({ ...values, [key]: Number(event.target.value) })} /><b>{value}</b></label>)}</div></div></section>;
}

function LearningHub() { return <section className="section hub"><div className="section-kicker">Filmmaker Learning Hub</div><h2>Premium Lessons for Modern Creators</h2><div className="lesson-rail">{lessons.map(([title, copy, Icon]) => <motion.article className="lesson-card" key={title} whileHover={{ y: -10 }}><div className="lesson-image"><Icon size={36} /></div><h3>{title}</h3><p>{copy}</p><span>Watch Module</span></motion.article>)}</div></section>; }

function Finale() { return <section className="finale"><div className="finale-art" /><div className="finale-overlay" /><motion.div className="finale-content" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}><h2>Every Great Story Is About Transformation.</h2><a className="button primary" href="#builder">Start Creating Stories <ArrowRight size={18} /></a></motion.div></section>; }

function App() {
  useEffect(() => { gsap.fromTo('.section', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', scrollTrigger: undefined }); }, []);
  return <><MouseGlow /><div className="grain" aria-hidden="true" /><nav className="nav"><a href="#top" className="logo">DS</a><div><a href="#story-circle">Circle</a><a href="#builder">Builder</a><a href="#top">Studio</a></div></nav><main><Hero /><StoryCircle /><Psychology /><Examples /><StoryBuilder /><ArcVisualizer /><LearningHub /><Finale /></main></>;
}

createRoot(document.getElementById('root')).render(<App />);
