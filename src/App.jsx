import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { Flame, Brain, Trophy, ArrowLeft, Send, Share2, Home as HomeIcon, LogOut, ChevronRight, Volume2, VolumeX, ShieldCheck, Trash2 } from 'lucide-react';
import { generatePythagorasExercises, generateThalesExercises } from './exerciseBank';
import { generateEcuaciones1Exercises, generateJerarquiaExercises, generateSistemas2x2Exercises } from './exerciseBank2';
import { generateAngulosParalelasExercises, generateProbabilidadExercises } from './exerciseBank3';
import { deleteAllUsers } from './wipeUsers';

// ======================================================
//  COLECCIÓN ACTIVA
// ======================================================
const EJERCICIOS_COL = 'ejercicios_v4';

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
    'Ángulos entre Paralelas',
    'Probabilidad'
  ];
  const generators = [
    generateEcuaciones1Exercises,
    generateJerarquiaExercises,
    generateSistemas2x2Exercises,
    generateAngulosParalelasExercises,
    generateProbabilidadExercises
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

  useEffect(() => {
    const isGame = location.pathname.includes('/game/');
    const newTrack = isGame ? 'game' : 'home';
    if (newTrack !== currentTrack) {
      setCurrentTrack(newTrack);
    }
  }, [location.pathname]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;
    
    if (!muted) {
      audio.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction");
      });
    } else {
      audio.pause();
    }

    const unblock = () => {
      if (!muted) audio.play().catch(() => {});
      window.removeEventListener('click', unblock);
    };
    window.addEventListener('click', unblock);
    return () => window.removeEventListener('click', unblock);
  }, [muted, currentTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.load();
  }, [currentTrack]);

  return (
    <>
      <audio ref={audioRef} src={tracks[currentTrack]} loop />
      <button 
        onClick={() => setMuted(!muted)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
          background: muted ? '#F43F5E' : '#10B981',
          border: '2px solid white',
          width: '40px',
          height: '40px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          cursor: 'pointer'
        }}
      >
        {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
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
          <Link to="/admin-panel-control" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>👨‍🏫 Entrar como Administrador</Link>
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
    if (!formData.grade) {
      alert('Por favor selecciona tu grado (2do o 3ro)');
      return;
    }
    if (!formData.group) {
      alert('Por favor selecciona tu grupo (A-F)');
      return;
    }
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
        <select 
          className="input-field" 
          required 
          value={formData.grade} 
          onChange={e => setFormData({...formData, grade: e.target.value})}
        >
          <option value="">Selecciona tu grado</option>
          <option value="2">2do Año</option>
          <option value="3">3er Año</option>
        </select>

        <select 
          className="input-field notranslate" 
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          required 
          value={formData.group} 
          onChange={e => setFormData({...formData, group: e.target.value})}
          translate="no"
        >
          <option value="" translate="no">Selecciona tu grupo</option>
          <option value="A" translate="no">A</option>
          <option value="B" translate="no">B</option>
          <option value="C" translate="no">C</option>
          <option value="D" translate="no">D</option>
          <option value="E" translate="no">E</option>
          <option value="F" translate="no">F</option>
        </select>
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
          {user?.grade === '2' && (
            <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              {user.examen ? (
                <div style={{ background: '#F1F5F9', padding: '1rem', borderRadius: '1rem', textAlign: 'center', border: '2px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B' }}>EXAMEN COMPLETADO</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981' }}>Calificación: {user.examen.score}/10</div>
                </div>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '1.2rem', fontSize: '1.2rem', background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(225, 29, 72, 0.4)' }} 
                  onClick={() => navigate('/exam')}
                >
                  📝 TOMAR EXAMEN FINAL
                </button>
              )}
            </div>
          )}

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
    { name: 'Sistemas de Ecuaciones 2x2', icon: '🔗', class: 'grad-cyan' },
    { name: 'Ángulos entre Paralelas', icon: '📏', class: 'grad-emerald' },
    { name: 'Probabilidad', icon: '🎲', class: 'grad-pink' }
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
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        let q;
        // Obtenemos a todos los del grado para poder agruparlos
        q = query(collection(db, 'usuarios'), where('grade', '==', user.grade));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        // Ordenar globalmente por racha primero
        data.sort((a, b) => b.mejor_racha - a.mejor_racha);
        setList(data);

        // Si es por grupo, expandir por defecto el grupo del usuario
        if (type === 'group') {
          setExpandedGroups({ [user.group]: true });
        }
      } catch (err) {
        console.error("Error en ranking:", err);
      }
      setLoading(false);
    };
    if (user) fetchRanking();
  }, [user, type]);

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Agrupamiento
  const groupedData = list.reduce((acc, u) => {
    const group = u.group || "Sin Grupo";
    if (!acc[group]) acc[group] = [];
    acc[group].push(u);
    return acc;
  }, {});

  // Ordenar las llaves de los grupos (A, B, C...)
  const sortedGroups = Object.keys(groupedData).sort();

  return (
    <div className="app-container animate-fade">
      <div className="stats-bar">
        <Link to="/dashboard"><ArrowLeft size={24} color="#4F46E5" /></Link>
        <span>Ranking {user?.grade}° Año</span>
        <div style={{width: 24}}></div>
      </div>
      
      <div style={{ padding: '1rem' }}>
        {loading ? <div style={{textAlign:'center', padding:'2rem'}}>Cargando líderes...</div> : (
          type === 'grade' ? (
            // VISTA GLOBAL DE GRADO
            list.map((u, i) => (
              <RankingItem key={u.id} u={u} i={i} currentUser={user} />
            ))
          ) : (
            // VISTA AGRUPADA POR GRUPOS
            sortedGroups.map(groupName => (
              <div key={groupName} style={{ marginBottom: '0.8rem' }}>
                <button 
                  onClick={() => toggleGroup(groupName)}
                  className="glass-card" 
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1rem',
                    borderLeft: groupName === user.group ? '4px solid #4F46E5' : '1px solid #E2E8F0',
                    cursor: 'pointer',
                    background: groupName === user.group ? '#EEF2FF' : 'white'
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>GRUPO {groupName}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{groupedData[groupName].length} alumnos</span>
                    <ChevronRight 
                      size={20} 
                      style={{ 
                        transform: expandedGroups[groupName] ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }} 
                    />
                  </div>
                </button>
                
                {expandedGroups[groupName] && (
                  <div className="animate-fade" style={{ padding: '0.5rem 0 0 1rem' }}>
                    {groupedData[groupName].map((u, i) => (
                      <RankingItem key={u.id} u={u} i={i} currentUser={user} />
                    ))}
                  </div>
                )}
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

// Componente pequeño para el item del ranking
const RankingItem = ({ u, i, currentUser }) => (
  <div className="ranking-item" style={{ 
    background: u.nickname === currentUser?.nickname ? '#EEF2FF' : 'white', 
    border: u.nickname === currentUser?.nickname ? '2px solid #4F46E5' : 'none',
    marginBottom: '0.5rem'
  }}>
    <div className="ranking-rank" style={{ color: i < 3 ? '#F59E0B' : '#4F46E5', fontSize: '1.2rem', fontWeight: 800, width: '40px' }}>#{i+1}</div>
    <div className="ranking-info" style={{ flex: 1 }}>
      <div className="ranking-nickname" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.4rem' }}>{u.avatar || '🗿'}</span>
        {u.nickname} 
        {u.nickname === currentUser?.nickname && <span style={{ fontSize: '0.65rem', background: '#4F46E5', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>TÚ</span>}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
        👤 {u.name}
      </div>
      <div className="ranking-stats" style={{ color: '#4F46E5', fontSize: '0.85rem', fontWeight: 600 }}>
        🔥 Racha: {u.mejor_racha} <span style={{ color: '#94A3B8', fontWeight: 400 }}>• Niv: {u.nivel}</span>
      </div>
    </div>
    {i === 0 && <Trophy size={24} color="#F59E0B" fill="#F59E0B" />}
  </div>
);

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "zlagustin10@gmail.com";
  const ADMIN_PASS = "adminRacha2026"; // Puedes cambiarla aquí

  const fetchStudents = async () => {
    setLoading(true);
    try {
      console.log("Fetching students...");
      const q = query(collection(db, 'usuarios'));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Ordenar en memoria para evitar problemas de índices compuestos en Firestore
      const sortedData = data.sort((a, b) => {
        if (a.grade !== b.grade) return a.grade - b.grade;
        return (a.group || "").localeCompare(b.group || "");
      });

      setStudents(sortedData);
    } catch (err) {
      console.error("Error al obtener alumnos:", err);
      alert("Error al cargar alumnos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchStudents();
  }, [isAuthorized]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthorized(true);
    } else {
      alert("Credenciales de administrador incorrectas");
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (confirm(`¿Eliminar a ${name}?`)) {
      await deleteDoc(doc(db, 'usuarios', id));
      fetchStudents();
    }
  };

  const handleDeleteGroup = async (grade, group) => {
    if (confirm(`¿Eliminar a TODOS los alumnos de ${grade}° ${group}?`)) {
      const toDelete = students.filter(s => s.grade === grade && s.group === group);
      for (const s of toDelete) {
        await deleteDoc(doc(db, 'usuarios', s.id));
      }
      fetchStudents();
    }
  };

  const handleWipeAll = async () => {
    if (confirm("🚨 ¿BORRAR ABSOLUTAMENTE TODO? Esta acción no se puede deshacer.")) {
      await deleteAllUsers();
      fetchStudents();
    }
  };

  // Agrupar estudiantes
  const grouped = students.reduce((acc, s) => {
    const key = `${s.grade}° Grado - Grupo ${s.group}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <div className="app-container animate-fade" style={{ background: '#F8FAFC' }}>
      <div className="stats-bar">
        <Link to="/"><ArrowLeft size={24} color="#4F46E5" /></Link>
        <span>Control de Administrador</span>
        <div style={{width: 24}}></div>
      </div>

      <div style={{ padding: '1rem' }}>
        {!isAuthorized ? (
          <form className="glass-card" onSubmit={handleAuth} style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <ShieldCheck size={48} color="#4F46E5" style={{ margin: '0 auto' }} />
              <h2 style={{ marginTop: '1rem' }}>Admin Login</h2>
            </div>
            <input className="input-field" type="email" placeholder="Correo Administrador" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="input-field" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="btn btn-primary" type="submit">Acceder al Panel</button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Hola, Agustín 👋</h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Total: {students.length} inscritos</p>
              </div>
              <button className="btn-ranking" style={{ padding: '0.5rem 1rem', background: '#F43F5E' }} onClick={handleWipeAll}>
                Borrar Todo
              </button>
            </div>

            {loading ? <p style={{textAlign:'center'}}>Cargando lista...</p> : (
              Object.keys(grouped).length === 0 ? <p style={{textAlign:'center', color:'#64748B'}}>No hay alumnos registrados.</p> :
              Object.entries(grouped).map(([groupKey, list]) => (
                <div key={groupKey} className="glass-card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#4F46E5' }}>{groupKey}</h3>
                    <button 
                      style={{ background: 'none', border: 'none', color: '#F43F5E', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 700 }}
                      onClick={() => handleDeleteGroup(list[0].grade, list[0].group)}
                    >
                      🗑️ Eliminar Grupo
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {list.map(s => (
                      <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'white', borderRadius: '8px', border: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {/* 1. Datos del Alumno */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '120px', flex: 1 }}>
                          <span style={{ fontSize: '1.4rem' }}>{s.avatar}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E293B' }}>{s.nickname}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{s.name}</div>
                          </div>
                        </div>
                        
                        {/* 2. Columna del Examen */}
                        <div style={{ minWidth: '150px', flex: 1.5, textAlign: 'center', background: '#F8FAFC', padding: '0.4rem', borderRadius: '6px' }}>
                          {s.examen ? (
                            <>
                              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E11D48' }}>Examen: {s.examen.score}/10</div>
                              <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>{new Date(s.examen.timestamp).toLocaleString()}</div>
                            </>
                          ) : (
                            <div style={{ fontSize: '0.75rem', color: '#CBD5E1', fontStyle: 'italic' }}>Sin presentar examen</div>
                          )}
                        </div>

                        {/* 3. Columna de Estadísticas */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '100px', flex: 1, justifyContent: 'flex-end' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5' }}>🔥 {s.mejor_racha}</div>
                            <div style={{ fontSize: '0.6rem', color: '#94A3B8' }}>Niv. {s.nivel}</div>
                          </div>
                          <button 
                            style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer' }} 
                            onClick={() => handleDeleteUser(s.id, s.nickname)}
                            title="Eliminar usuario"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            
            <button className="btn btn-outline" onClick={() => setIsAuthorized(false)}>Cerrar Sesión</button>
          </div>
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

export const Exam = ({ user, onUserUpdate }) => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  useEffect(() => {
    if (!user || user.grade !== '2') {
      navigate('/dashboard');
      return;
    }
    if (user.examen) {
      alert('Ya has realizado este examen. No tienes más intentos.');
      navigate('/dashboard');
      return;
    }

    const fetchExamExercises = async () => {
      try {
        const topics = ['Sistemas de Ecuaciones 2x2', 'Ángulos entre Paralelas', 'Probabilidad'];
        const fetched = [];
        for (const t of topics) {
          const q = query(collection(db, EJERCICIOS_COL), where('grade', '==', '2'), where('topic', '==', t));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            const randomEx = docs[Math.floor(Math.random() * docs.length)];
            fetched.push(randomEx);
          }
        }
        if (fetched.length === 3) {
          setExercises(fetched);
        } else {
          alert('Faltan ejercicios en la base de datos para generar el examen.');
          navigate('/dashboard');
        }
      } catch (err) {
        console.error(err);
        alert('Error al generar examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExamExercises();
  }, [user, navigate]);

  const handleNext = async () => {
    const isCorrect = parseFloat(currentAnswer) === parseFloat(exercises[currentIndex].answer);
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setCurrentAnswer('');

    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const correctCount = newAnswers.filter(a => a).length;
      const score = parseFloat(((correctCount / 3) * 10).toFixed(1));
      
      const examenData = {
        score,
        timestamp: new Date().toISOString(),
      };

      try {
        await updateDoc(doc(db, 'usuarios', user.id), { examen: examenData });
        const updatedUser = { ...user, examen: examenData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        onUserUpdate(updatedUser);
        navigate('/exam-results');
      } catch (err) {
        console.error(err);
        alert('Error al guardar el examen');
      }
    }
  };

  if (loading) return <div className="app-container"><p style={{padding:'2rem'}}>Generando tu examen único...</p></div>;
  if (exercises.length === 0) return null;

  const exercise = exercises[currentIndex];

  return (
    <div className="app-container animate-fade" style={{ background: '#F8FAFC' }}>
      <div className="stats-bar" style={{ background: '#E11D48' }}>
        <span>Examen Final</span>
        <span>Pregunta {currentIndex + 1} / 3</span>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#1E293B', textAlign: 'center', marginBottom: '1rem' }}>
            {exercise.topic}
          </h2>

          <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid #E2E8F0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             {exercise.svgData ? (
               <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: exercise.svgData }} />
             ) : (
               <p style={{ fontSize: '1.2rem', color: '#334155', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 600 }}>{exercise.question}</p>
             )}
             
             {exercise.svgData && (
               <p style={{ fontSize: '1.1rem', color: '#334155', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 600 }}>{exercise.question}</p>
             )}

             <input
               type="number"
               className="input-field"
               placeholder="Tu respuesta..."
               value={currentAnswer}
               onChange={e => setCurrentAnswer(e.target.value)}
               style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, padding: '1rem' }}
             />
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleNext} 
          disabled={currentAnswer.trim() === ''}
          style={{ marginTop: '1.5rem', padding: '1.2rem', fontSize: '1.2rem', background: currentIndex === 2 ? '#10B981' : '#4F46E5' }}
        >
          {currentIndex === 2 ? 'ENVIAR EXAMEN' : 'SIGUIENTE PREGUNTA ➔'}
        </button>
      </div>
    </div>
  );
};

export const ExamResults = ({ user }) => {
  const navigate = useNavigate();
  if (!user || !user.examen) return null;

  return (
    <div className="app-container animate-fade" style={{ background: 'white', justifyContent: 'center' }}>
      <div className="glass-card" style={{ textAlign: 'center', margin: '2rem' }}>
        <h2 style={{ color: '#10B981', fontSize: '2.5rem' }}>¡Examen Terminado!</h2>
        <p style={{ margin: '1rem 0', fontSize: '1.2rem' }}>Has completado tu evaluación final, {user.nickname}.</p>
        
        <div style={{ background: '#F1F5F9', padding: '2rem', borderRadius: '1rem', margin: '2rem 0' }}>
          <div style={{ fontSize: '1rem', color: '#64748B', fontWeight: 800 }}>CALIFICACIÓN FINAL</div>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: '#0F172A' }}>{user.examen.score}</div>
          <div style={{ fontSize: '1.2rem', color: '#64748B' }}>sobre 10</div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));

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
        <Route path="/admin-panel-control" element={<Admin />} />
        <Route path="/exam" element={<Exam user={user} onUserUpdate={setUser} />} />
        <Route path="/exam-results" element={<ExamResults user={user} />} />
        {/* Catch-all route for any undefined paths */}
        <Route path="*" element={<Home onUserUpdate={setUser} />} />
      </Routes>
    </Router>
  );
}
