import { useState } from "react";
import { ChevronRight, ChevronLeft, Share2, RotateCcw, CheckCircle, Home } from "lucide-react";

// ─── LOGO (base64 inline via img tag pointing to public folder) ─────────────
// Place LOGO_HUB2GETHER.jpg in /public/ folder of your project
const LOGO_SRC = "/LOGO_HUB2GETHER.jpg";

// ─── DATA ──────────────────────────────────────────────────────────────────
const DIMENSIONS = [
  { id: "raquette",     label: "Expérience Raquette",      weight: 0.05,  icon: "🎾", color: "#f59e0b" },
  { id: "niveau",       label: "Niveau Général",            weight: 0.10,  icon: "⭐", color: "#8b5cf6" },
  { id: "vitres",       label: "Utilisation des Vitres",   weight: 0.125, icon: "🪟", color: "#06b6d4" },
  { id: "techniques",  label: "Techniques de Frappe",      weight: 0.15,  icon: "💥", color: "#f43f5e" },
  { id: "competition", label: "Compétition / FFT",         weight: 0.15,  icon: "🏆", color: "#12a675" },
  { id: "tactique",    label: "Sens Tactique",             weight: 0.075, icon: "🧠", color: "#a78bfa" },
  { id: "equipe",      label: "Jeu en Équipe",             weight: 0.075, icon: "🤝", color: "#34d399" },
  { id: "defense",     label: "Défense",                   weight: 0.10,  icon: "🛡️", color: "#fb923c" },
  { id: "regularite",  label: "Régularité",                weight: 0.10,  icon: "📈", color: "#60a5fa" },
  { id: "physique",    label: "Physique",                  weight: 0.075, icon: "⚡", color: "#facc15" },
];

const QUESTIONS = [
  {
    dimension: "raquette",
    question: "Depuis combien de temps pratiquez-vous le padel (ou un sport de raquette) ?",
    options: [
      { label: "Je débute, moins de 6 mois",          value: 1 },
      { label: "Entre 6 mois et 1 an",                value: 2.5 },
      { label: "Entre 1 et 2 ans",                    value: 4 },
      { label: "Entre 2 et 5 ans",                    value: 6 },
      { label: "5 ans et plus",                       value: 8 },
    ],
  },
  {
    dimension: "niveau",
    question: "Comment évaluez-vous votre niveau général de padel ?",
    options: [
      { label: "Débutant complet, j'apprends encore les bases",          value: 1 },
      { label: "Débutant intermédiaire, je maintiens quelques échanges", value: 2.5 },
      { label: "Intermédiaire, j'échange régulièrement en partie",       value: 4 },
      { label: "Bon joueur de club, je perfectionne ma technique",       value: 5.5 },
      { label: "Joueur compétitif, je maîtrise la plupart des coups",   value: 7 },
      { label: "Très haut niveau, proche du professionnel",              value: 8 },
    ],
  },
  {
    dimension: "vitres",
    question: "Comment utilisez-vous les vitres dans votre jeu ?",
    options: [
      { label: "Je ne les utilise pas, elles me font peur",              value: 1 },
      { label: "Je les évite mais je sais que c'est important",          value: 2 },
      { label: "J'utilise la vitre arrière de manière basique",          value: 3.5 },
      { label: "J'exploite la vitre arrière et parfois les latérales",   value: 5 },
      { label: "J'utilise toutes les vitres pour construire le point",   value: 6.5 },
      { label: "La bandeja, la víbora, le chiquita sur vitre… c'est ma signature", value: 8 },
    ],
  },
  {
    dimension: "techniques",
    question: "Quelles techniques de frappe maîtrisez-vous ?",
    options: [
      { label: "Coup droit et revers de base uniquement",                          value: 1 },
      { label: "Je commence à travailler le lob et le smash",                      value: 2.5 },
      { label: "Lob, smash, volée — je suis à l'aise en échanges",                value: 4 },
      { label: "Bandeja, vibora, et bonne gestion de la volée",                    value: 6 },
      { label: "Tous les coups techniques maîtrisés avec intention tactique",      value: 7.5 },
      { label: "Niveau expert : spin, chiquita, kick, variation permanente",       value: 8 },
    ],
  },
  {
    dimension: "competition",
    question: "Participez-vous à des compétitions ou avez-vous un classement FFT ?",
    options: [
      { label: "Jamais joué en compétition",                              value: 1 },
      { label: "Quelques tournois amicaux entre amis",                    value: 2.5 },
      { label: "Tournois Open sans classement",                           value: 4 },
      { label: "Classé FFT : P100 ou équivalent débutant",                value: 5 },
      { label: "Classé FFT : P250, P500 — bon niveau régional",          value: 6.5 },
      { label: "Classé P1000 et plus / Niveau national ou international", value: 8 },
    ],
  },
  {
    dimension: "tactique",
    question: "Comment gérez-vous la tactique en match ?",
    options: [
      { label: "Je joue au hasard, sans stratégie précise",               value: 1 },
      { label: "Je commence à cibler les points faibles adverses",        value: 3 },
      { label: "Je construis des points et j'adapte mon jeu",             value: 5 },
      { label: "Je varie les directions, le rythme et les hauteurs",      value: 6.5 },
      { label: "Lecture du jeu, anticipation et prise de décision rapide",value: 8 },
    ],
  },
  {
    dimension: "equipe",
    question: "Comment fonctionne votre communication avec votre partenaire ?",
    options: [
      { label: "On joue chacun de notre côté",                             value: 1 },
      { label: "Quelques mots basiques pendant le match",                  value: 2.5 },
      { label: "On se parle entre les points pour s'encourager",           value: 4 },
      { label: "On a des automatismes et on se couvre mutuellement",       value: 6 },
      { label: "Vrai duo : appels, rotations, stratégie commune en temps réel", value: 8 },
    ],
  },
  {
    dimension: "defense",
    question: "Comment évaluez-vous votre défense ?",
    options: [
      { label: "Je perds la plupart des points sous pression",            value: 1 },
      { label: "Je renvoie parfois, mais souvent en erreur directe",      value: 2.5 },
      { label: "Je remets la balle en jeu régulièrement",                 value: 4 },
      { label: "Bonne défense, je récupère et je relance le point",       value: 6 },
      { label: "Défense élite : vitres, contres, relances offensives",    value: 8 },
    ],
  },
  {
    dimension: "regularite",
    question: "Quelle est votre régularité dans l'échange ?",
    options: [
      { label: "Beaucoup de fautes directes et doubles fautes",           value: 1 },
      { label: "Régulier sur les frappes simples, fautes sur les difficiles", value: 3 },
      { label: "Bon taux de première balle, peu de double fautes",        value: 5 },
      { label: "Très régulier même en situation de pression",             value: 6.5 },
      { label: "Constance exemplaire, fautes très rares en match",        value: 8 },
    ],
  },
  {
    dimension: "physique",
    question: "Quel est votre niveau physique et athlétique ?",
    options: [
      { label: "Je me fatigue vite, mes déplacements sont limités",       value: 1 },
      { label: "Correct, je tiens un match mais je souffle en fin",       value: 3 },
      { label: "Bon niveau général, je gère bien mes déplacements",       value: 5 },
      { label: "Excellent physique, je monte en puissance en fin de set", value: 7 },
      { label: "Athlète : vitesse, explosivité, endurance au top niveau", value: 8 },
    ],
  },
];

const LEVEL_DESCRIPTIONS = {
  1: { label: "Initiation", desc: "Vous découvrez le padel. Bienvenue dans ce sport fantastique !", emoji: "🌱" },
  2: { label: "Débutant",   desc: "Les bases commencent à prendre forme. Continuez à pratiquer régulièrement.", emoji: "🐣" },
  3: { label: "Débutant+",  desc: "Vous progressez bien. Travaillez sur votre régularité et les vitres.", emoji: "📈" },
  4: { label: "Intermédiaire", desc: "Joueur intermédiaire confirmé, à l'aise sur un court. Affinez votre tactique.", emoji: "🎯" },
  5: { label: "Intermédiaire+", desc: "Bon joueur de club avec une vraie identité de jeu. Prêt pour la compétition.", emoji: "⚡" },
  6: { label: "Avancé",     desc: "Joueur compétitif avec une technique solide et un bon sens tactique.", emoji: "🔥" },
  7: { label: "Expert",     desc: "Vous dominez la plupart des joueurs. Un potentiel de haut niveau.", emoji: "💎" },
  8: { label: "Élite",      desc: "Niveau national / professionnel. Vous êtes parmi les meilleurs.", emoji: "🏆" },
};

// ─── UTILS ─────────────────────────────────────────────────────────────────
function computeScore(answers) {
  let total = 0;
  for (const dim of DIMENSIONS) {
    const val = answers[dim.id] ?? 0;
    total += val * dim.weight;
  }
  return Math.round(total * 10) / 10;
}

function getRoundedLevel(score) {
  return Math.min(8, Math.max(1, Math.round(score)));
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  const pct = ((current) / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-2" style={{ color: "#94a3b8" }}>
        <span>Question {current} / {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ background: "#1e2d4a" }}>
        <div
          className="h-1.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #12a675, #0fd68e)" }}
        />
      </div>
    </div>
  );
}

function HomePage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#0f1628" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "#12a675" }} />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full blur-2xl opacity-10"
        style={{ background: "#0ea5e9" }} />

      <div className="relative z-10 text-center max-w-sm w-full">
        {/* Hub2Gether Logo */}
        <div className="mx-auto mb-6 flex items-center justify-center">
          <img
            src={LOGO_SRC}
            alt="Hub2Gether"
            className="h-16 w-auto rounded-2xl object-contain"
            style={{ maxWidth: "220px" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Padel icon mark */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ background: "linear-gradient(135deg, #12a675 0%, #0fd68e 100%)", boxShadow: "0 0 60px rgba(18,166,117,0.4)" }}>
          <span className="text-4xl">🎾</span>
        </div>

        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#12a675" }}>
          Padel Évaluation
        </p>
        <h1 className="text-4xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
          Quel est votre<br />
          <span style={{ color: "#12a675" }}>vrai niveau</span> ?
        </h1>
        <p className="text-base mb-10 leading-relaxed" style={{ color: "#94a3b8" }}>
          10 questions. 2 minutes. Un score précis de <strong style={{ color: "white" }}>1 à 8</strong> basé sur 10 dimensions de jeu.
        </p>

        {/* Stat pills */}
        <div className="flex gap-3 justify-center mb-10">
          {[["10", "Questions"], ["2 min", "Durée"], ["10", "Critères"]].map(([val, lbl]) => (
            <div key={lbl} className="flex-1 rounded-2xl py-3 px-2 text-center" style={{ background: "#162035", border: "1px solid #1e3050" }}>
              <div className="text-lg font-black text-white">{val}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>{lbl}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #12a675 0%, #0fd68e 100%)",
            boxShadow: "0 8px 32px rgba(18,166,117,0.45)"
          }}>
          Démarrer le test
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function QuizPage({ question, questionIndex, total, onAnswer, onBack, selectedValue }) {
  const dim = DIMENSIONS.find(d => d.id === question.dimension);
  const [hovered, setHovered] = useState(null);
  const canGoBack = questionIndex > 0;

  return (
    <div className="min-h-screen flex flex-col px-5 py-8 relative"
      style={{ background: "#0f1628" }}>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: dim?.color || "#12a675" }} />

      <div className="relative z-10 max-w-lg mx-auto w-full flex flex-col h-full">
        {/* Top bar: back button + logo */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95"
            style={{
              background: canGoBack ? "#162035" : "transparent",
              border: canGoBack ? "1px solid #1e3050" : "1px solid transparent",
              color: canGoBack ? "#94a3b8" : "#2d3f5a",
              cursor: canGoBack ? "pointer" : "default"
            }}>
            <ChevronLeft size={16} />
            <span className="text-xs font-semibold">Retour</span>
          </button>

          <img
            src={LOGO_SRC}
            alt="Hub2Gether"
            className="h-8 w-auto object-contain rounded-lg"
            style={{ maxWidth: "120px" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={questionIndex + 1} total={total} />
        </div>

        {/* Dimension badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${dim?.color}22`, border: `1px solid ${dim?.color}44` }}>
            {dim?.icon}
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: dim?.color }}>
            {dim?.label}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-white mb-8 leading-snug" style={{ fontFamily: "Georgia, serif" }}>
          {question.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => {
            const isSelected = selectedValue === opt.value;
            const isHov = hovered === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                onMouseEnter={() => setHovered(opt.value)}
                onMouseLeave={() => setHovered(null)}
                className="w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 group"
                style={{
                  background: isSelected ? `linear-gradient(135deg, #12a67522, #12a67508)` : isHov ? "#162035" : "#111827",
                  border: isSelected ? "1.5px solid #12a675" : isHov ? "1.5px solid #1e3050" : "1.5px solid #1a2540",
                  boxShadow: isSelected ? "0 0 20px rgba(18,166,117,0.15)" : "none",
                }}>
                <span className="text-sm leading-snug" style={{ color: isSelected ? "white" : "#cbd5e1" }}>
                  {opt.label}
                </span>
                {isSelected && (
                  <CheckCircle size={18} style={{ color: "#12a675", flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultPage({ score, answers, onRestart, onHome }) {
  const level = getRoundedLevel(score);
  const info = LEVEL_DESCRIPTIONS[level];
  const [copied, setCopied] = useState(false);

  function handleShare() {
    const text = `🎾 Mon niveau Padel : ${info.emoji} ${info.label} (Score ${score}/8)\nTeste ton niveau sur PadelEval !`;
    if (navigator.share) {
      navigator.share({ title: "Mon niveau Padel", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  // Arc progress (SVG)
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const pct = score / 8;
  const offset = circ - pct * circ;

  return (
    <div className="min-h-screen flex flex-col px-5 py-10 relative"
      style={{ background: "#0f1628" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "#12a675" }} />

      <div className="relative z-10 max-w-lg mx-auto w-full">
        {/* Logo top */}
        <div className="flex justify-center mb-6">
          <img
            src={LOGO_SRC}
            alt="Hub2Gether"
            className="h-10 w-auto object-contain rounded-xl"
            style={{ maxWidth: "150px" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        <p className="text-center text-sm font-semibold tracking-[0.3em] uppercase mb-8" style={{ color: "#12a675" }}>
          Votre Résultat
        </p>

        {/* Score circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r={radius} fill="none" stroke="#1e2d4a" strokeWidth="10" />
              <circle cx="65" cy="65" r={radius} fill="none" stroke="url(#grad)" strokeWidth="10"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.5s ease" }} />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#12a675" />
                  <stop offset="100%" stopColor="#0fd68e" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{score}</span>
              <span className="text-xs" style={{ color: "#64748b" }}>/8</span>
            </div>
          </div>
        </div>

        {/* Level */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">{info.emoji}</div>
          <h2 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
            Niveau {level}
          </h2>
          <p className="text-xl font-semibold mb-3" style={{ color: "#12a675" }}>{info.label}</p>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#94a3b8" }}>{info.desc}</p>
        </div>

        {/* Dimension breakdown */}
        <div className="rounded-3xl p-5 mb-6" style={{ background: "#111827", border: "1px solid #1e2d4a" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#475569" }}>
            Détail par dimension
          </p>
          <div className="flex flex-col gap-3">
            {DIMENSIONS.map((dim) => {
              const val = answers[dim.id] ?? 0;
              const pct = (val / 8) * 100;
              return (
                <div key={dim.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#94a3b8" }}>{dim.icon} {dim.label}</span>
                    <span className="font-bold" style={{ color: dim.color }}>{val}/8</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: "#1e2d4a" }}>
                    <div className="h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: dim.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons row 1: Share + Recommencer */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={handleShare}
            className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #12a675, #0fd68e)",
              boxShadow: "0 8px 24px rgba(18,166,117,0.35)",
              color: "white"
            }}>
            <Share2 size={16} />
            {copied ? "Copié !" : "Partager"}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
            style={{ background: "#162035", border: "1px solid #1e3050", color: "#94a3b8" }}>
            <RotateCcw size={16} />
            Recommencer
          </button>
        </div>

        {/* Button row 2: Accueil */}
        <button
          onClick={onHome}
          className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
          style={{ background: "#0f1628", border: "1px solid #1e2d4a", color: "#64748b" }}>
          <Home size={15} />
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | quiz | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  function handleStart() {
    setCurrentQ(0);
    setAnswers({});
    setScore(null);
    setScreen("quiz");
  }

  function handleHome() {
    setCurrentQ(0);
    setAnswers({});
    setScore(null);
    setScreen("home");
  }

  function handleBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  }

  function handleAnswer(value) {
    const dim = QUESTIONS[currentQ].dimension;
    const newAnswers = { ...answers, [dim]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ(currentQ + 1);
      } else {
        const s = computeScore(newAnswers);
        setScore(s);
        setScreen("result");
      }
    }, 350);
  }

  if (screen === "home") return <HomePage onStart={handleStart} />;
  if (screen === "quiz") return (
    <QuizPage
      question={QUESTIONS[currentQ]}
      questionIndex={currentQ}
      total={QUESTIONS.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
      selectedValue={answers[QUESTIONS[currentQ].dimension]}
    />
  );
  if (screen === "result") return (
    <ResultPage score={score} answers={answers} onRestart={handleStart} onHome={handleHome} />
  );
}
