import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { Flame, Brain, Trophy, ArrowLeft, Send, Share2, Home as HomeIcon, LogOut, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { generatePythagorasExercises, generateThalesExercises } from './exerciseBank';
import { generateEcuaciones1Exercises, generateJerarquiaExercises, generateSistemas2x2Exercises } from './exerciseBank2';

// ======================================================
//  COLECCIÓN ACTIVA
// ======================================================
const EJERCICIOS_COL = 'ejercicios_v3';

// ======================================================
//  SEED — Puebla Firebase con los 80+ ejercicios
// ======================================================
async function seedGrade3IfNeeded() {
  const topics = ['Teorema de Pitágoras', 'Teorema de Tales'];
  const generators = [generatePythagorasExercises, generateThalesExercises];

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const q = query(
      collection(db, EJERCICIOS_COL),
      where('grade', '==', '3'),
      where('topic', '==', topic)
    );
    const snap = await getDocs(q);

    if (snap.size < 30) {
      console.log(`🌱 Sembrando ${topic}…`);
      // Eliminar viejos si hay pocos
      for (const d of snap.docs) await deleteDoc(doc(db, EJERCICIOS_COL, d.id));

      const exercises = generators[i]();
      for (const ex of exercises) {
        await addDoc(collection(db, EJERCICIOS_COL), { ...ex, createdAt: new Date() });
      }
      console.log(`✅ ${exercises.length} ejercicios de ${topic} guardados.`);
    } else {
      console.log(`✅ ${topic}: ${snap.size} ejercicios ya existen.`);
    }
  }
}

// ======================================================
//  SEED — Grado 2 (80+ ejercicios por tema)
// ======================================================
async function seedGrade2IfNeeded() {
  const topics = [
    'Ecuaciones de 1er Grado',
    'Jerarquía de Operaciones',
    'Sistemas de Ecuaciones 2x2',
  ];
  const generators = [
    generateEcuaciones1Exercises,
    generateJerarquiaExercises,
    generateSistemas2x2Exercises,
  ];

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const q = query(
      collection(db, EJERCICIOS_COL),
      where('grade', '==', '2'),
      where('topic', '==', topic)
    );
    const snap = await getDocs(q);

    if (snap.size < 30) {
      console.log(`🌱 Sembrando ${topic}…`);
      for (const d of snap.docs) await deleteDoc(doc(db, EJERCICIOS_COL, d.id));
      const exercises = generators[i]();
      for (const ex of exercises) {
        await addDoc(collection(db, EJERCICIOS_COL), { ...ex, createdAt: new Date() });
      }
      console.log(`✅ ${exercises.length} ejercicios de ${topic} guardados.`);
    } else {
      console.log(`✅ ${topic}: ${snap.size} ejercicios ya existen.`);
    }
  }
}

// ======================================================
//  REPRODUCTOR DE MÚSICA
// ======================================================
const MusicPlayer = () => {
  const [muted, setMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('home');
  const location = useLocation();
  const audioRef = React.useRef(null);

  const tracks = {
    home: '/home.mp3',
    game: '/game.mp3'
  };

  // Monitor de ruta para cambiar track
  useEffect(() => {
    const isGame = location.pathname.includes('/game/');
    const newTrack = isGame ? 'game' : 'home';
    if (newTrack !== currentTrack) {
      setCurrentTrack(newTrack);
    }
  }, [location.pathname, currentTrack]);

  // Manejo de reproducción y autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15;
    
    const playAudio = () => {
      if (!muted) {
        audio.play().catch(err => {
          console.warn("Reproducción bloqueada: esperando interacción");
        });
      } else {
        audio.pause();
      }
    };

    // Intentar reproducir al cambiar track o silencio
    playAudio();

    // Escuchador de interacción para desbloquear audio
    const unlock = () => {
      if (!muted) audio.play().catch(() => {});
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);

    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [muted, currentTrack]);

  // Carga forzada al cambiar de pista
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentTrack]);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={tracks[currentTrack]} 
        loop 
        onError={() => console.warn("Archivo de audio no encontrado")}
      />
      <button 
        onClick={() => setMuted(!muted)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          background: muted ? '#F43F5E' : '#10B981',
          border: '3px solid white',
          width: '45px',
          height: '45px',
          borderRadius: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        className={muted ? 'pulse-button' : ''}
      >
        {muted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
        {!muted && (
          <div style={{
            position: 'absolute',
            bottom: '55px',
            right: '0',
            background: 'white',
            color: '#10B981',
            fontSize: '0.7rem',
            padding: '4px 8px',
            borderRadius: '8px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            MÚSICA ON 🎶
          </div>
        )}
      </button>
    </>
  );
};

// --- Components ---

const Home = ({ onUserUpdate }) => {
  return (
    <div className="app-container animate-fade">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
           <div className="floating-emojis" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧠🔥</div>
           <h1 style={{ fontSize: '3rem', lineHeight: 1, color: '#4F46E5', textShadow: '2px 2px 0px white' }}>
             Racha<br/>Matemática
           </h1>
           <p style={{ color: '#64748B', marginTop: '1rem', fontWeight: 600 }}>¡Demuestra tu nivel y rompe récords!</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/register" className="btn btn-primary">Registrarme</Link>
          <Link to="/login" className="btn btn-secondary">Ya estoy registrado</Link>
        </div>
      </div>
    </div>
  );
};

const Register = ({ onUserUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', name: '', grade: '', group: '', nickname: '', avatar: '🗿' });
  const brainrotAvatars = [
    { e: '🗿', n: 'Sigma' }, { e: '💀', n: 'Dead' }, { e: '🚽', n: 'Skibidi' }, { e: '🤫', n: 'Mewing' },
    { e: '👺', n: 'GigaChad' }, { e: '🤡', n: 'Ohio' }, { e: '🧠', n: 'Brainrot' }, { e: '🧊', n: 'Cold' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'usuarios'), {
        ...formData,
        racha: 0, nivel: 1, mejor_racha: 0, createdAt: new Date()
      });
      const userData = { id: docRef.id, ...formData, racha: 0, nivel: 1, mejor_racha: 0 };
      localStorage.setItem('user', JSON.stringify(userData));
      onUserUpdate(userData);
      navigate('/dashboard');
    } catch (err) { alert('Error: ' + err.message); }
  };

  return (
    <div className="app-container animate-fade">
      <div className="stats-bar">
        <Link to="/"><ArrowLeft size={24} color="#4F46E5" /></Link>
        <span>Registro de Alumno</span>
        <div style={{width: 24}}></div>
      </div>
      <form className="glass-card" onSubmit={handleSubmit}>
        <input className="input-field" placeholder="Correo electrónico" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <input className="input-field" placeholder="Nombre completo" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <select className="input-field" required value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
          <option value="">Selecciona tu grado</option>
          <option value="2">Segundo Año</option>
          <option value="3">Tercer Año</option>
        </select>
        <input className="input-field" placeholder="Grupo (ej: A, B)" required value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} />
        <input className="input-field" placeholder="Nickname" required value={formData.nickname} onChange={e => setFormData({...formData, nickname: e.target.value})} />
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>ELIGE TU AVATAR BRAINROT</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {brainrotAvatars.map(av => (
              <button 
                type="button" 
                key={av.e} 
                onClick={() => setFormData({...formData, avatar: av.e})}
                style={{
                  fontSize: '1.8rem',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  border: formData.avatar === av.e ? '2px solid #4F46E5' : '2px solid transparent',
                  background: formData.avatar === av.e ? '#EEF2FF' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {av.e}
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Guardar y comenzar</button>
      </form>
    </div>
  );
};

const Login = ({ onUserUpdate }) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const q = query(collection(db, 'usuarios'), where('nickname', '==', id));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const userData = { id: snap.docs[0].id, ...snap.docs[0].data() };
      localStorage.setItem('user', JSON.stringify(userData));
      onUserUpdate(userData);
      navigate('/dashboard');
    } else { alert('Usuario no encontrado'); }
  };

  return (
    <div className="app-container animate-fade">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', letterSpacing: '-1px', lineHeight: 1 }}>ACCESO<br/><span style={{ color: '#4F46E5', textShadow: '2px 2px 0px #E0E7FF' }}>JUGADOR</span></h2>
        <div style={{ height: '4px', width: '40px', background: '#4F46E5', margin: '1rem auto', borderRadius: '2px' }}></div>
      </div>
      <form className="glass-card" style={{marginTop: '2rem'}} onSubmit={handleLogin}>
        <input className="input-field" placeholder="Tu Nickname" required value={id} onChange={e => setId(e.target.value)} />
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
};

const Dashboard = ({ user, onUserUpdate }) => {
  const navigate = useNavigate();
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    const fetchTop = async () => {
      const q = query(collection(db, 'usuarios'), where('grade', '==', user.grade), orderBy('mejor_racha', 'desc'), limit(3));
      const snap = await getDocs(q);
      setTopUsers(snap.docs.map(d => d.data()));
    };
    fetchTop();
  }, [user]);

  return (
    <div className="app-container animate-fade">
      <div style={{ padding: '2rem' }}>
        <div className="profile-banner">
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ fontSize: '3rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '1.5rem', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{user?.avatar || '🗿'}</div>
               <div>
                 <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.8)' }}>Perfil del Jugador</div>
                 <h2 style={{ fontSize: '2.2rem', margin: '0.2rem 0', color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{user?.nickname}</h2>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span className="user-badge">{user?.grade === '2' ? 'SEGUNDO' : 'TERCER'} AÑO</span>
              <span className="user-badge" style={{ background: 'rgba(255,255,255,0.2)' }}>GRUPO "{user?.group}"</span>
            </div>
          </div>
          <button onClick={() => { localStorage.clear(); onUserUpdate(null); navigate('/'); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', padding: '0.8rem', borderRadius: '1rem', backdropFilter: 'blur(10px)' }}>
            <LogOut size={24} color="white" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ padding: '1.2rem', fontSize: '1.2rem' }} onClick={() => navigate('/selection')}>
             🚀 ¡JUGAR AHORA! ➔
          </button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <button className="btn-ranking" style={{ fontSize: '0.9rem', padding: '1rem' }} onClick={() => navigate('/ranking/grade')}>
               🌍 TOP GRADO
            </button>
            <button className="btn-ranking" style={{ fontSize: '0.9rem', padding: '1rem', background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)', border: '2px solid #059669' }} onClick={() => navigate('/ranking/group')}>
               👥 TOP GRUPO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategorySelection = ({ user }) => {
  const navigate = useNavigate();
  const topics2 = [
    { name: 'Ecuaciones de 1er Grado', icon: '➕', class: 'grad-purple' },
    { name: 'Jerarquía de Operaciones', icon: '📐', class: 'grad-orange' },
    { name: 'Sistemas de Ecuaciones 2x2', icon: '🔗', class: 'grad-cyan' }
  ];
  const topics3 = [
    { name: 'Teorema de Pitágoras', icon: '🔺', class: 'grad-emerald' },
    { name: 'Teorema de Tales', icon: '📏', class: 'grad-pink' }
  ];
  const myTopics = user?.grade === '2' ? topics2 : topics3;

  return (
    <div className="app-container animate-fade">
      <div className="stats-bar">
        <Link to="/dashboard"><ArrowLeft size={24} color="#4F46E5" /></Link>
        <span>Elige tu Reto</span>
        <div style={{width: 24}}></div>
      </div>
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', lineHeight: 1 }}>ELIGE TU<br/><span style={{ color: '#4F46E5', textShadow: '2px 2px 0px #E0E7FF' }}>RETO</span></h2>
           <div style={{ height: '4px', width: '60px', background: '#4F46E5', margin: '1rem auto', borderRadius: '2px' }}></div>
        </div>
        {myTopics.map(t => (
          <button key={t.name} className={`category-card ${t.class}`} onClick={() => navigate(`/game/${encodeURIComponent(t.name)}`)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{t.icon}</span>
              <span style={{ textAlign: 'left' }}>{t.name}</span>
            </div>
            <ChevronRight size={32} />
          </button>
        ))}
      </div>
    </div>
  );
};

// ======================================================
//  COMPONENTE GAME — con SVG inline y aleatori. sin repetición
// ======================================================
const Game = ({ user, onUserUpdate }) => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [exercise, setExercise] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allExercises, setAllExercises] = useState([]);
  const [queue, setQueue] = useState([]); // cola aleatoria sin repetición
  const [showHint, setShowHint] = useState(false);

  // Cargar todos los ejercicios del tema una sola vez
  useEffect(() => {
    if (!user) { navigate('/'); return; }
    const loadAll = async () => {
      setLoading(true);
      const q = query(
        collection(db, EJERCICIOS_COL),
        where('grade', '==', user.grade),
        where('topic', '==', topic)
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        alert('No hay ejercicios para este tema aún.');
        navigate('/selection');
        return;
      }
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllExercises(list);
      // Crear cola aleatoria inicial
      const shuffled = [...list].sort(() => Math.random() - 0.5);
      setQueue(shuffled);
      setExercise(shuffled[0]);
      setLoading(false);
    };
    loadAll();
  }, [topic]);

  const nextExercise = () => {
    let currentQueue = queue.slice(1);
    // Si la cola se agota, rebarajar
    if (currentQueue.length === 0) {
      currentQueue = [...allExercises].sort(() => Math.random() - 0.5);
    }
    setQueue(currentQueue);
    setExercise(currentQueue[0]);
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
  };

  const handleAnswer = async () => {
    if (!answer.trim()) return;
    const userAnswer = parseFloat(answer);
    const correctAnswer = parseFloat(exercise.answer);
    const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.5; // tolerancia de 0.5

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(async () => {
      let newStreak = isCorrect ? user.racha + 1 : 0;
      let newMax = Math.max(user.mejor_racha, newStreak);
      const updated = { ...user, racha: newStreak, mejor_racha: newMax };
      await updateDoc(doc(db, 'usuarios', user.id), { racha: newStreak, mejor_racha: newMax });
      onUserUpdate(updated);
      localStorage.setItem('user', JSON.stringify(updated));

      if (!isCorrect) {
        navigate('/results');
      } else {
        nextExercise();
      }
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !feedback) handleAnswer();
  };

  if (loading) {
    return (
      <div className="app-container">
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p>Preparando ejercicios...</p>
        </div>
      </div>
    );
  }

  const hasSvg = exercise?.svgData;
  const remainingInQueue = queue.length;

  return (
    <div className="app-container animate-fade">
      <div className="stats-bar">
        <Link to="/selection"><ArrowLeft size={24} color="#4F46E5" /></Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>🔥 {user.racha}</span>
          <span>🧠 Niv. {user.nivel}</span>
        </div>
        {/* Indicador de progreso en cola */}
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
          {allExercises.length - remainingInQueue + 1}/{allExercises.length}
        </span>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.8rem', color: '#64748B', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {topic}
        </div>

        {/* Diagrama SVG o fórmula de texto */}
        {hasSvg ? (
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            dangerouslySetInnerHTML={{ __html: exercise.svgData }}
          />
        ) : (
          <div className="math-formula-card" style={{ whiteSpace: 'pre-line' }}>
            {exercise.question}
          </div>
        )}

        {/* Pregunta textual adicional si hay SVG */}
        {hasSvg && exercise.question && (
          <div style={{
            background: '#F8FAFC',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            color: '#1E293B',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            {exercise.question}
          </div>
        )}

        {/* Input de respuesta */}
        <input
          className="input-field"
          style={{ fontSize: '1.5rem', textAlign: 'center' }}
          type="number"
          placeholder="Tu respuesta"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={!!feedback}
        />

        <button
          className="btn btn-primary"
          style={{ padding: '1.5rem' }}
          onClick={handleAnswer}
          disabled={!!feedback || !answer.trim()}
        >
          ENVIAR RESPUESTA
        </button>

        {/* Pista */}
        {exercise.hint && !feedback && (
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              background: 'transparent',
              border: '1px dashed #94A3B8',
              borderRadius: '0.75rem',
              padding: '0.5rem',
              color: '#64748B',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {showHint ? '🙈 Ocultar pista' : '💡 Ver pista'}
          </button>
        )}
        {showHint && exercise.hint && (
          <div style={{
            background: '#FEF9C3',
            borderRadius: '0.75rem',
            padding: '0.75rem',
            fontSize: '0.85rem',
            color: '#854D0E',
            textAlign: 'center'
          }}>
            💡 {exercise.hint}
          </div>
        )}

        {/* Feedback */}
        {feedback === 'correct' && (
          <div className="feedback-area feedback-correct" style={{ display: 'block' }}>
            ✨ ¡INCREÍBLE! +1 🔥
          </div>
        )}
        {feedback === 'incorrect' && (
          <div className="feedback-area feedback-incorrect" style={{ display: 'block' }}>
            💔 ¡ÁNIMO! La respuesta era {exercise.answer}
          </div>
        )}
      </div>
    </div>
  );
};

const Ranking = ({ user }) => {
  const { type } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        let q;
        if (type === 'group') {
          q = query(collection(db, 'usuarios'), where('grade', '==', user.grade), where('group', '==', user.group), orderBy('mejor_racha', 'desc'), limit(50));
        } else {
          q = query(collection(db, 'usuarios'), where('grade', '==', user.grade), orderBy('mejor_racha', 'desc'), limit(50));
        }
        const snap = await getDocs(q);
        setList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error en ranking:", err);
        const fallbackQ = query(collection(db, 'usuarios'), where('grade', '==', user.grade), limit(50));
        const snap = await getDocs(fallbackQ);
        setList(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => b.mejor_racha - a.mejor_racha));
      }
      setLoading(false);
    };
    if (user) fetchRanking();
  }, [user, type]);

  return (
    <div className="app-container animate-fade">
      <div className="stats-bar">
        <Link to="/dashboard"><ArrowLeft size={24} color="#4F46E5" /></Link>
        <span>Ranking {type === 'group' ? `Grupo ${user?.group}` : `${user?.grade === '2' ? 'Segundo' : 'Tercer'} Año`}</span>
        <div style={{width: 24}}></div>
      </div>
      
      <div style={{ padding: '1rem' }}>
        {loading ? <div style={{textAlign:'center', padding:'2rem'}}>Cargando líderes...</div> : (
          list.length === 0 ? <div style={{textAlign:'center', padding:'2rem', color:'#64748B'}}>¡Sé el primero en aparecer aquí! 🌟</div> :
          list.map((u, i) => (
            <div key={u.id} className="ranking-item" style={{ background: u.nickname === user?.nickname ? '#EEF2FF' : 'white', border: u.nickname === user?.nickname ? '2px solid #4F46E5' : 'none' }}>
              <div className="ranking-rank" style={{ color: i < 3 ? '#F59E0B' : '#4F46E5', fontSize: '1.2rem', fontWeight: 800, width: '40px' }}>#{i+1}</div>
              <div className="ranking-info" style={{ flex: 1 }}>
                <div className="ranking-nickname" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{u.avatar || '🗿'}</span>
                  {u.nickname} 
                  {u.nickname === user?.nickname && <span style={{ fontSize: '0.65rem', background: '#4F46E5', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>TÚ</span>}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  👤 <span style={{ textTransform: 'capitalize' }}>{u.name?.toLowerCase()}</span>
                </div>
                <div className="ranking-stats" style={{ color: '#4F46E5', fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>
                  🔥 Racha: {u.mejor_racha} <span style={{ color: '#94A3B8', fontWeight: 400 }}>• Niv: {u.nivel}</span>
                </div>
              </div>
              {i === 0 && <Trophy size={24} color="#F59E0B" fill="#F59E0B" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Results = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="app-container animate-fade" style={{ background: 'white', justifyContent: 'center' }}>
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#F43F5E', fontSize: '2rem' }}>¡Fin de la Racha!</h2>
        <p style={{ margin: '1rem 0 2rem' }}>Buen esfuerzo, {user?.nickname}.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div><div style={{ fontSize: '0.8rem' }}>MEJOR</div><div style={{ fontSize: '2rem', fontWeight: 800 }}>🔥 {user?.mejor_racha}</div></div>
          <div><div style={{ fontSize: '0.8rem' }}>Nivel</div><div style={{ fontSize: '2rem', fontWeight: 800 }}>🧠 {user?.nivel}</div></div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/selection')}>Intentar de nuevo</button>
        <button className="btn btn-outline" style={{marginTop:'1rem'}} onClick={() => navigate('/dashboard')}>Ir al Inicio</button>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));

    // Sembrar ejercicios al iniciar la app
    const init = async () => {
      try {
        await seedGrade2IfNeeded();
        await seedGrade3IfNeeded();
      } catch (err) {
        console.warn('Seed error:', err);
      }
    };
    init();
  }, []);

  return (
    <Router>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home onUserUpdate={setUser} />} />
        <Route path="/register" element={<Register onUserUpdate={setUser} />} />
        <Route path="/login" element={<Login onUserUpdate={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} onUserUpdate={setUser} />} />
        <Route path="/selection" element={<CategorySelection user={user} />} />
        <Route path="/game/:topic" element={<Game user={user} onUserUpdate={setUser} />} />
        <Route path="/ranking/:type" element={<Ranking user={user} />} />
        <Route path="/results" element={<Results user={user} />} />
      </Routes>
    </Router>
  );
}
