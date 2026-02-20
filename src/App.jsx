import { useState } from "react";
import { ChevronRight, ChevronLeft, Share2, RotateCcw, CheckCircle, Home, Zap, ClipboardList } from "lucide-react";

const LOGO_SRC = "/LOGO_HUB2GETHER.jpg";

// ─── DIMENSIONS ────────────────────────────────────────────────────────────
const DIMENSIONS = [
  { id: "raquette",    label: "Expérience Raquette",    weight: 0.04,  icon: "🎾", color: "#f59e0b" },
  { id: "niveau",      label: "Niveau Général",          weight: 0.09,  icon: "⭐", color: "#8b5cf6" },
  { id: "vitres",      label: "Utilisation des Vitres",  weight: 0.09,  icon: "🪟", color: "#06b6d4" },
  { id: "techniques",  label: "Techniques de Frappe",    weight: 0.10,  icon: "💥", color: "#f43f5e" },
  { id: "competition", label: "Compétition / FFT",       weight: 0.10,  icon: "🏆", color: "#12a675" },
  { id: "tactique",    label: "Sens Tactique",           weight: 0.07,  icon: "🧠", color: "#a78bfa" },
  { id: "equipe",      label: "Jeu en Équipe",           weight: 0.07,  icon: "🤝", color: "#34d399" },
  { id: "defense",     label: "Défense",                 weight: 0.09,  icon: "🛡️", color: "#fb923c" },
  { id: "regularite",  label: "Régularité",              weight: 0.08,  icon: "📈", color: "#60a5fa" },
  { id: "physique",    label: "Physique",                weight: 0.07,  icon: "⚡", color: "#facc15" },
  { id: "service",     label: "Service",                 weight: 0.06,  icon: "🎯", color: "#e879f9" },
  { id: "mental",      label: "Mental / Gestion du stress", weight: 0.05, icon: "🧘", color: "#f97316" },
  { id: "lecture",     label: "Lecture du jeu",          weight: 0.05,  icon: "👁️", color: "#22d3ee" },
  { id: "placement",   label: "Placement sur le court",  weight: 0.07,  icon: "📍", color: "#4ade80" },
  { id: "smash",       label: "Smash & Bandeja",         weight: 0.03,  icon: "🔨", color: "#fb7185" },
];

// ─── TEST EXPRESS (5 questions) ─────────────────────────────────────────────
const EXPRESS_QUESTIONS = [
  {
    dimension: "niveau",
    question: "Comment évaluez-vous votre niveau général de padel ?",
    options: [
      { label: "Débutant complet, j'apprends les bases",               value: 1 },
      { label: "Débutant intermédiaire, quelques échanges réguliers",  value: 2.5 },
      { label: "Intermédiaire, à l'aise en partie",                    value: 4 },
      { label: "Bon joueur de club, technique en progression",         value: 5.5 },
      { label: "Joueur compétitif, maîtrise la plupart des coups",    value: 7 },
      { label: "Très haut niveau, proche du professionnel",            value: 8 },
    ],
  },
  {
    dimension: "techniques",
    question: "Quelles techniques de frappe maîtrisez-vous ?",
    options: [
      { label: "Coup droit et revers de base uniquement",                    value: 1 },
      { label: "Je travaille le lob et le smash",                            value: 2.5 },
      { label: "Lob, smash, volée — à l'aise en échanges",                  value: 4 },
      { label: "Bandeja, vibora, bonne gestion de la volée",                 value: 6 },
      { label: "Tous les coups maîtrisés avec intention tactique",           value: 7.5 },
      { label: "Expert : spin, chiquita, kick, variation permanente",        value: 8 },
    ],
  },
  {
    dimension: "competition",
    question: "Participez-vous à des compétitions ou avez-vous un classement FFT ?",
    options: [
      { label: "Jamais joué en compétition",                              value: 1 },
      { label: "Quelques tournois amicaux entre amis",                    value: 2.5 },
      { label: "Tournois Open sans classement",                           value: 4 },
      { label: "Classé FFT : P100 ou équivalent débutant",               value: 5 },
      { label: "Classé FFT : P250, P500 — bon niveau régional",          value: 6.5 },
      { label: "Classé P1000+ / Niveau national ou international",        value: 8 },
    ],
  },
  {
    dimension: "defense",
    question: "Comment évaluez-vous votre défense ?",
    options: [
      { label: "Je perds la plupart des points sous pression",          value: 1 },
      { label: "Je renvoie parfois, souvent en erreur directe",         value: 2.5 },
      { label: "Je remets la balle en jeu régulièrement",               value: 4 },
      { label: "Bonne défense, je récupère et relance le point",        value: 6 },
      { label: "Défense élite : vitres, contres, relances offensives",  value: 8 },
    ],
  },
  {
    dimension: "physique",
    question: "Quel est votre niveau physique et athlétique ?",
    options: [
      { label: "Je me fatigue vite, déplacements limités",              value: 1 },
      { label: "Correct, je tiens un match mais je souffle en fin",     value: 3 },
      { label: "Bon niveau général, bonne gestion des déplacements",    value: 5 },
      { label: "Excellent physique, je monte en puissance en fin de set",value: 7 },
      { label: "Athlète : vitesse, explosivité, endurance au top",      value: 8 },
    ],
  },
];

const EXPRESS_WEIGHTS = {
  niveau: 0.30, techniques: 0.25, competition: 0.20, defense: 0.15, physique: 0.10,
};

// ─── TEST DÉTAILLÉ (15 questions) ──────────────────────────────────────────
const DETAILED_QUESTIONS = [
  {
    dimension: "raquette",
    question: "Depuis combien de temps pratiquez-vous le padel ou un sport de raquette ?",
    options: [
      { label: "Moins de 6 mois",    value: 1 },
      { label: "6 mois à 1 an",      value: 2.5 },
      { label: "1 à 2 ans",          value: 4 },
      { label: "2 à 5 ans",          value: 6 },
      { label: "5 ans et plus",      value: 8 },
    ],
  },
  {
    dimension: "niveau",
    question: "Comment évaluez-vous votre niveau général de padel ?",
    options: [
      { label: "Débutant complet, j'apprends les bases",               value: 1 },
      { label: "Débutant intermédiaire, quelques échanges réguliers",  value: 2.5 },
      { label: "Intermédiaire, à l'aise en partie",                    value: 4 },
      { label: "Bon joueur de club, technique en progression",         value: 5.5 },
      { label: "Joueur compétitif, maîtrise la plupart des coups",    value: 7 },
      { label: "Très haut niveau, proche du professionnel",            value: 8 },
    ],
  },
  {
    dimension: "vitres",
    question: "Comment utilisez-vous les vitres dans votre jeu ?",
    options: [
      { label: "Je ne les utilise pas, elles me font peur",                        value: 1 },
      { label: "Je les évite mais je sais que c'est important",                    value: 2 },
      { label: "J'utilise la vitre arrière de manière basique",                    value: 3.5 },
      { label: "J'exploite la vitre arrière et parfois les latérales",             value: 5 },
      { label: "J'utilise toutes les vitres pour construire le point",             value: 6.5 },
      { label: "Bandeja, víbora, chiquita sur vitre… c'est ma signature",          value: 8 },
    ],
  },
  {
    dimension: "techniques",
    question: "Quelles techniques de frappe maîtrisez-vous ?",
    options: [
      { label: "Coup droit et revers de base uniquement",                    value: 1 },
      { label: "Je travaille le lob et le smash",                            value: 2.5 },
      { label: "Lob, smash, volée — à l'aise en échanges",                  value: 4 },
      { label: "Bandeja, vibora, bonne gestion de la volée",                 value: 6 },
      { label: "Tous les coups maîtrisés avec intention tactique",           value: 7.5 },
      { label: "Expert : spin, chiquita, kick, variation permanente",        value: 8 },
    ],
  },
  {
    dimension: "smash",
    question: "Comment évaluez-vous votre smash et votre bandeja ?",
    options: [
      { label: "Je ne maîtrise pas encore le smash",                         value: 1 },
      { label: "Smash basique, souvent en faute ou peu efficace",            value: 2.5 },
      { label: "Smash régulier, bandeja en cours d'apprentissage",           value: 4 },
      { label: "Bonne bandeja, smash puissant et dirigé",                    value: 6 },
      { label: "Vibora, bandeja et smash au choix selon la situation",       value: 8 },
    ],
  },
  {
    dimension: "service",
    question: "Comment qualifieriez-vous votre service ?",
    options: [
      { label: "Beaucoup de doubles fautes, service peu contrôlé",           value: 1 },
      { label: "Service régulier mais sans variation ni intention",           value: 3 },
      { label: "Je varie la direction et la vitesse selon l'adversaire",     value: 5 },
      { label: "Service avec effet, je crée des situations favorables",      value: 6.5 },
      { label: "Service arme : slice, kick, plat — toujours avec intention", value: 8 },
    ],
  },
  {
    dimension: "competition",
    question: "Participez-vous à des compétitions ou avez-vous un classement FFT ?",
    options: [
      { label: "Jamais joué en compétition",                              value: 1 },
      { label: "Quelques tournois amicaux entre amis",                    value: 2.5 },
      { label: "Tournois Open sans classement",                           value: 4 },
      { label: "Classé FFT : P100 ou équivalent débutant",               value: 5 },
      { label: "Classé FFT : P250, P500 — bon niveau régional",          value: 6.5 },
      { label: "Classé P1000+ / Niveau national ou international",        value: 8 },
    ],
  },
  {
    dimension: "tactique",
    question: "Comment gérez-vous la tactique en match ?",
    options: [
      { label: "Je joue au hasard, sans stratégie précise",                value: 1 },
      { label: "Je commence à cibler les points faibles adverses",         value: 3 },
      { label: "Je construis des points et j'adapte mon jeu",              value: 5 },
      { label: "Je varie les directions, le rythme et les hauteurs",       value: 6.5 },
      { label: "Lecture du jeu, anticipation et décision rapide",          value: 8 },
    ],
  },
  {
    dimension: "lecture",
    question: "Comment anticipez-vous le jeu adverse ?",
    options: [
      { label: "Je réagis aux situations sans anticiper",                   value: 1 },
      { label: "J'anticipe parfois les frappes évidentes",                  value: 3 },
      { label: "Je lis correctement le jeu dans la majorité des échanges",  value: 5 },
      { label: "J'anticipe les intentions adverses et je me replace vite",  value: 6.5 },
      { label: "Lecture permanente : position, corps, raquette — rien ne m'échappe", value: 8 },
    ],
  },
  {
    dimension: "placement",
    question: "Comment gérez-vous votre placement sur le court ?",
    options: [
      { label: "Je ne me déplace pas toujours au bon endroit",             value: 1 },
      { label: "Placement basique, je couvre mon couloir",                  value: 3 },
      { label: "Bon placement, je couvre bien avec mon partenaire",         value: 5 },
      { label: "Placement très bien, rotations fluides avec mon partenaire",value: 6.5 },
      { label: "Placement expert : je crée des espaces et contrôle le court", value: 8 },
    ],
  },
  {
    dimension: "equipe",
    question: "Comment fonctionne votre communication avec votre partenaire ?",
    options: [
      { label: "On joue chacun de notre côté",                                  value: 1 },
      { label: "Quelques mots basiques pendant le match",                        value: 2.5 },
      { label: "On se parle entre les points pour s'encourager",                 value: 4 },
      { label: "On a des automatismes et on se couvre mutuellement",             value: 6 },
      { label: "Vrai duo : appels, rotations, stratégie commune en temps réel",  value: 8 },
    ],
  },
  {
    dimension: "defense",
    question: "Comment évaluez-vous votre défense ?",
    options: [
      { label: "Je perds la plupart des points sous pression",          value: 1 },
      { label: "Je renvoie parfois, souvent en erreur directe",         value: 2.5 },
      { label: "Je remets la balle en jeu régulièrement",               value: 4 },
      { label: "Bonne défense, je récupère et relance le point",        value: 6 },
      { label: "Défense élite : vitres, contres, relances offensives",  value: 8 },
    ],
  },
  {
    dimension: "mental",
    question: "Comment gérez-vous la pression et les moments difficiles en match ?",
    options: [
      { label: "Je me fais souvent dépasser mentalement",               value: 1 },
      { label: "Je perds mes moyens sur les points importants",         value: 3 },
      { label: "Globalement stable, quelques baisses de concentration", value: 5 },
      { label: "Solide mentalement, je performe sur les moments clés",  value: 6.5 },
      { label: "Mental d'acier : plus c'est serré, plus je suis fort",  value: 8 },
    ],
  },
  {
    dimension: "regularite",
    question: "Quelle est votre régularité dans l'échange ?",
    options: [
      { label: "Beaucoup de fautes directes et doubles fautes",               value: 1 },
      { label: "Régulier sur les frappes simples, fautes sur les difficiles", value: 3 },
      { label: "Bon taux de première balle, peu de double fautes",            value: 5 },
      { label: "Très régulier même en situation de pression",                 value: 6.5 },
      { label: "Constance exemplaire, fautes très rares en match",            value: 8 },
    ],
  },
  {
    dimension: "physique",
    question: "Quel est votre niveau physique et athlétique ?",
    options: [
      { label: "Je me fatigue vite, déplacements limités",               value: 1 },
      { label: "Correct, je tiens un match mais je souffle en fin",      value: 3 },
      { label: "Bon niveau général, bonne gestion des déplacements",     value: 5 },
      { label: "Excellent physique, je monte en puissance en fin de set",value: 7 },
      { label: "Athlète : vitesse, explosivité, endurance au top",       value: 8 },
    ],
  },
];

// ─── LEVEL DESCRIPTIONS ────────────────────────────────────────────────────
const LEVEL_DESCRIPTIONS = {
  1: { label: "Initiation",     desc: "Vous découvrez le padel. Bienvenue dans ce sport fantastique !", emoji: "🌱" },
  2: { label: "Débutant",       desc: "Les bases commencent à prendre forme. Pratiquez régulièrement.", emoji: "🐣" },
  3: { label: "Débutant+",      desc: "Vous progressez bien. Travaillez votre régularité et les vitres.", emoji: "📈" },
  4: { label: "Intermédiaire",  desc: "À l'aise sur un court. Affinez votre tactique et votre placement.", emoji: "🎯" },
  5: { label: "Intermédiaire+", desc: "Bon joueur de club avec une vraie identité de jeu. Prêt pour la compétition.", emoji: "⚡" },
  6: { label: "Avancé",         desc: "Joueur compétitif avec une technique solide et un bon sens tactique.", emoji: "🔥" },
  7: { label: "Expert",         desc: "Vous dominez la plupart des joueurs. Un potentiel de haut niveau.", emoji: "💎" },
  8: { label: "Élite",          desc: "Niveau national / professionnel. Vous êtes parmi les meilleurs.", emoji: "🏆" },
};

// ─── UTILS ─────────────────────────────────────────────────────────────────
function computeScore(answers, mode) {
  let total = 0;
  if (mode === "express") {
    for (const [dim, w] of Object.entries(EXPRESS_WEIGHTS)) total += (answers[dim] ?? 0) * w;
  } else {
    for (const dim of DIMENSIONS) total += (answers[dim.id] ?? 0) * dim.weight;
  }
  return Math.round(total * 10) / 10;
}

function getRoundedLevel(score) {
  return Math.min(8, Math.max(1, Math.round(score)));
}

// ─── RACKET SVG ────────────────────────────────────────────────────────────
function PadelRacket({ size = 320, opacity = 0.13 }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 200 300" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      {/* Handle */}
      <rect x="88" y="210" width="24" height="75" rx="12" fill="#12a675" />
      <rect x="92" y="215" width="16" height="65" rx="8" fill="#0fd68e" opacity="0.4" />
      {/* Grip wrap lines */}
      <line x1="88" y1="230" x2="112" y2="230" stroke="#0a7a55" strokeWidth="2" />
      <line x1="88" y1="245" x2="112" y2="245" stroke="#0a7a55" strokeWidth="2" />
      <line x1="88" y1="260" x2="112" y2="260" stroke="#0a7a55" strokeWidth="2" />
      {/* Neck */}
      <path d="M88 210 Q85 190 80 175 Q100 180 100 180 Q100 180 120 175 Q115 190 112 210Z"
        fill="#12a675" />
      {/* Head frame */}
      <ellipse cx="100" cy="110" rx="72" ry="78" fill="#1a3a2a" stroke="#12a675" strokeWidth="6" />
      <ellipse cx="100" cy="110" rx="64" ry="70" fill="#0f2a1a" stroke="#0fd68e" strokeWidth="2" opacity="0.5" />
      {/* Holes pattern */}
      {[
        [100,60],[80,60],[120,60],[62,75],[138,75],[55,95],[145,95],[52,115],
        [148,115],[55,135],[145,135],[62,155],[138,155],[80,168],[120,168],[100,172],
        [70,90],[100,90],[130,90],[70,115],[100,115],[130,115],[70,140],[100,140],[130,140],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#12a675" opacity="0.6" />
      ))}
      {/* Shine */}
      <ellipse cx="78" cy="75" rx="12" ry="18" fill="white" opacity="0.06" transform="rotate(-15 78 75)" />
      {/* Brand stripe */}
      <rect x="36" y="105" width="128" height="10" rx="5" fill="#12a675" opacity="0.25" />
    </svg>
  );
}

// ─── PROGRESS BAR ──────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1.5" style={{ color: "#94a3b8" }}>
        <span>Question {current} / {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ background: "#1e2d4a" }}>
        <div className="h-1.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #12a675, #0fd68e)" }} />
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────
function HomePage({ onStart }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: "#0f1628" }}>

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "#12a675" }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "#0ea5e9" }} />

      {/* Racket left */}
      <div className="absolute left-0 bottom-0 pointer-events-none"
        style={{ transform: "rotate(-25deg) translate(-30px, 40px)" }}>
        <PadelRacket size={340} opacity={0.15} />
      </div>

      {/* Racket right (mirrored, faint) */}
      <div className="absolute right-0 top-0 pointer-events-none"
        style={{ transform: "rotate(155deg) translate(-20px, 30px)" }}>
        <PadelRacket size={220} opacity={0.07} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl px-6">

        {/* Logo */}
        <img src={LOGO_SRC} alt="Hub2Gether"
          className="rounded-2xl object-contain mb-5 shadow-xl"
          style={{ height: "90px", maxWidth: "280px" }}
          onError={(e) => { e.target.style.display = "none"; }} />

        {/* Icon + title */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "linear-gradient(135deg, #12a675, #0fd68e)", boxShadow: "0 0 40px rgba(18,166,117,0.4)" }}>
          <span className="text-3xl">🎾</span>
        </div>

        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#12a675" }}>Padel Évaluation</p>

        <h1 className="text-4xl font-black text-white mb-3 leading-tight"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
          Quel est votre <span style={{ color: "#12a675" }}>vrai niveau</span> ?
        </h1>

        <p className="text-sm mb-6 leading-relaxed max-w-md" style={{ color: "#94a3b8" }}>
          Évaluez votre niveau de padel de <strong style={{ color: "white" }}>1 à 8</strong> en quelques questions, basé sur 10 dimensions de jeu.
        </p>

        {/* Stats */}
        <div className="flex gap-4 w-full max-w-sm mb-8">
          {[["🧪", "+50k", "tests réalisés"], ["🎯", "99%", "précision"], ["⚡", "2", "tests différents"]].map(([icon, val, lbl]) => (
            <div key={lbl} className="flex-1 rounded-2xl py-3 text-center"
              style={{ background: "#162035", border: "1px solid #1e3050" }}>
              <div className="text-lg mb-0.5">{icon}</div>
              <div className="text-base font-black text-white">{val}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Buttons side by side */}
        <div className="flex gap-4 w-full max-w-lg">
          {/* Test Express */}
          <button onClick={() => onStart("express")}
            className="flex-1 py-5 px-5 rounded-2xl text-white font-bold flex flex-col items-start gap-1 transition-all duration-300 active:scale-95"
            style={{ background: "linear-gradient(135deg, #12a675, #0fd68e)", boxShadow: "0 8px 28px rgba(18,166,117,0.4)" }}>
            <div className="flex items-center gap-2 text-lg font-black">
              <Zap size={18} /> Test Express
            </div>
            <div className="text-xs opacity-80">5 questions · ~1 minute</div>
            <ChevronRight size={18} className="self-end mt-1" />
          </button>

          {/* Test Détaillé */}
          <button onClick={() => onStart("detailed")}
            className="flex-1 py-5 px-5 rounded-2xl font-bold flex flex-col items-start gap-1 transition-all duration-300 active:scale-95"
            style={{ background: "#162035", border: "1.5px solid #1e3050", color: "white" }}>
            <div className="flex items-center gap-2 text-lg font-black">
              <ClipboardList size={18} /> Test Détaillé
            </div>
            <div className="text-xs" style={{ color: "#94a3b8" }}>15 questions · ~3 minutes</div>
            <ChevronRight size={18} className="self-end mt-1" style={{ color: "#12a675" }} />
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── QUIZ PAGE ─────────────────────────────────────────────────────────────
function QuizPage({ question, questionIndex, total, onAnswer, onBack, selectedValue, mode }) {
  const dim = DIMENSIONS.find(d => d.id === question.dimension);
  const [hovered, setHovered] = useState(null);
  const canGoBack = questionIndex > 0;
  const modeLabel = mode === "express" ? "Test Express" : "Test Détaillé";
  const modeColor = mode === "express" ? "#12a675" : "#8b5cf6";

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: "#0f1628" }}>

      {/* Ambient */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: dim?.color || "#12a675" }} />

      {/* Racket deco */}
      <div className="absolute left-0 bottom-0 pointer-events-none"
        style={{ transform: "rotate(-25deg) translate(-40px, 50px)" }}>
        <PadelRacket size={260} opacity={0.09} />
      </div>

      <div className="relative z-10 w-full max-w-xl px-6 flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} disabled={!canGoBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200"
            style={{
              background: canGoBack ? "#162035" : "transparent",
              border: canGoBack ? "1px solid #1e3050" : "1px solid transparent",
              color: canGoBack ? "#94a3b8" : "#2d3f5a",
              cursor: canGoBack ? "pointer" : "default"
            }}>
            <ChevronLeft size={15} />
            <span className="text-xs font-semibold">Retour</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: `${modeColor}22`, color: modeColor, border: `1px solid ${modeColor}44` }}>
              {modeLabel}
            </span>
            <img src={LOGO_SRC} alt="Hub2Gether" className="h-7 w-auto object-contain rounded-lg"
              style={{ maxWidth: "100px" }}
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <ProgressBar current={questionIndex + 1} total={total} />
        </div>

        {/* Dimension badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: `${dim?.color}22`, border: `1px solid ${dim?.color}44` }}>
            {dim?.icon}
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: dim?.color }}>
            {dim?.label}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-white mb-5 leading-snug"
          style={{ fontFamily: "Georgia, serif" }}>
          {question.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt) => {
            const isSelected = selectedValue === opt.value;
            const isHov = hovered === opt.value;
            return (
              <button key={opt.value}
                onClick={() => onAnswer(opt.value)}
                onMouseEnter={() => setHovered(opt.value)}
                onMouseLeave={() => setHovered(null)}
                className="w-full text-left px-5 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-between gap-3"
                style={{
                  background: isSelected ? "linear-gradient(135deg, #12a67522, #12a67508)" : isHov ? "#162035" : "#111827",
                  border: isSelected ? "1.5px solid #12a675" : isHov ? "1.5px solid #1e3050" : "1.5px solid #1a2540",
                  boxShadow: isSelected ? "0 0 20px rgba(18,166,117,0.12)" : "none",
                }}>
                <span className="text-sm leading-snug" style={{ color: isSelected ? "white" : "#cbd5e1" }}>
                  {opt.label}
                </span>
                {isSelected && <CheckCircle size={17} style={{ color: "#12a675", flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── RESULT PAGE ───────────────────────────────────────────────────────────
function ResultPage({ score, answers, onRestart, onHome, mode }) {
  const level = getRoundedLevel(score);
  const info = LEVEL_DESCRIPTIONS[level];
  const [copied, setCopied] = useState(false);
  const modeLabel = mode === "express" ? "Test Express" : "Test Détaillé";
  const dims = mode === "express"
    ? DIMENSIONS.filter(d => Object.keys(EXPRESS_WEIGHTS).includes(d.id))
    : DIMENSIONS;

  function handleShare() {
    const text = `🎾 Mon niveau Padel (${modeLabel}) : ${info.emoji} ${info.label} (Score ${score}/8)\nTeste ton niveau sur Hub2Gether !`;
    if (navigator.share) navigator.share({ title: "Mon niveau Padel", text });
    else navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const radius = 48;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 8) * circ;

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: "#0f1628" }}>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "#12a675" }} />

      {/* Racket deco */}
      <div className="absolute left-0 bottom-0 pointer-events-none"
        style={{ transform: "rotate(-25deg) translate(-40px, 50px)" }}>
        <PadelRacket size={260} opacity={0.09} />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 flex gap-8 items-start">

        {/* LEFT: Score + level */}
        <div className="flex flex-col items-center" style={{ minWidth: "200px" }}>
          <img src={LOGO_SRC} alt="Hub2Gether"
            className="h-12 w-auto object-contain rounded-xl mb-4"
            style={{ maxWidth: "160px" }}
            onError={(e) => { e.target.style.display = "none"; }} />

          <span className="text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{ background: "#12a67522", color: "#12a675", border: "1px solid #12a67544" }}>
            {modeLabel}
          </span>

          {/* Circle */}
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e2d4a" strokeWidth="9" />
              <circle cx="60" cy="60" r={radius} fill="none" stroke="url(#grad)" strokeWidth="9"
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

          <div className="text-4xl mb-2">{info.emoji}</div>
          <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Niveau {level}</h2>
          <p className="text-base font-semibold mb-2" style={{ color: "#12a675" }}>{info.label}</p>
          <p className="text-xs leading-relaxed text-center mb-6" style={{ color: "#94a3b8" }}>{info.desc}</p>

          {/* Buttons */}
          <div className="flex gap-2 w-full mb-2">
            <button onClick={handleShare}
              className="flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, #12a675, #0fd68e)", color: "white", boxShadow: "0 6px 20px rgba(18,166,117,0.35)" }}>
              <Share2 size={13} /> {copied ? "Copié !" : "Partager"}
            </button>
            <button onClick={onRestart}
              className="flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              style={{ background: "#162035", border: "1px solid #1e3050", color: "#94a3b8" }}>
              <RotateCcw size={13} /> Refaire
            </button>
          </div>
          <button onClick={onHome}
            className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            style={{ background: "#0f1628", border: "1px solid #1e2d4a", color: "#64748b" }}>
            <Home size={13} /> Retour à l'accueil
          </button>
        </div>

        {/* RIGHT: Dimension breakdown */}
        <div className="flex-1 rounded-3xl p-5" style={{ background: "#111827", border: "1px solid #1e2d4a" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#475569" }}>
            Détail par dimension
          </p>
          <div className="flex flex-col gap-3">
            {dims.map((dim) => {
              const val = answers[dim.id] ?? 0;
              const pct = (val / 8) * 100;
              return (
                <div key={dim.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#94a3b8" }}>{dim.icon} {dim.label}</span>
                    <span className="font-bold" style={{ color: dim.color }}>{val}/8</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#1e2d4a" }}>
                    <div className="h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: dim.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = mode === "express" ? EXPRESS_QUESTIONS : DETAILED_QUESTIONS;

  function handleStart(selectedMode) {
    setMode(selectedMode);
    setCurrentQ(0);
    setAnswers({});
    setScore(null);
    setScreen("quiz");
  }

  function handleHome() {
    setScreen("home");
    setMode(null);
    setCurrentQ(0);
    setAnswers({});
    setScore(null);
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  }

  function handleAnswer(value) {
    const dim = questions[currentQ].dimension;
    const newAnswers = { ...answers, [dim]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setScore(computeScore(newAnswers, mode));
        setScreen("result");
      }
    }, 350);
  }

  if (screen === "home") return <HomePage onStart={handleStart} />;
  if (screen === "quiz") return (
    <QuizPage
      question={questions[currentQ]}
      questionIndex={currentQ}
      total={questions.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
      selectedValue={answers[questions[currentQ].dimension]}
      mode={mode}
    />
  );
  if (screen === "result") return (
    <ResultPage score={score} answers={answers} onRestart={() => handleStart(mode)} onHome={handleHome} mode={mode} />
  );
}
