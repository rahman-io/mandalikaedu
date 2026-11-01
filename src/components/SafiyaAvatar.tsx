import React, { useEffect, useRef, useState } from 'react';
import sahajaImg from '../assets/safiya/sahaja.webp';
import tersenyumImg from '../assets/safiya/tersenyum.webp';
import ngambekImg from '../assets/safiya/ngambek.webp';
import senangImg from '../assets/safiya/senang.webp';
import berkedipImg from '../assets/safiya/berkedip.webp';
import manjaImg from '../assets/safiya/manja.webp';
import rileksImg from '../assets/safiya/rileks.webp';
import terkejutImg from '../assets/safiya/terkejut.webp';
import sedihImg from '../assets/safiya/sedih.webp';
import berpikirImg from '../assets/safiya/berpikir.webp';
import maluImg from '../assets/safiya/malu.webp';
import marahImg from '../assets/safiya/marah.webp';
import tertawaImg from '../assets/safiya/tertawa.webp';
import mengantukImg from '../assets/safiya/mengantuk.webp';
import khawatirImg from '../assets/safiya/khawatir.webp';
import banggaImg from '../assets/safiya/bangga.webp';
import penasaranImg from '../assets/safiya/penasaran.webp';
import bicaraImg from '../assets/safiya/bicara.webp';
import sakitImg from '../assets/safiya/sakit.webp';
import kagumImg from '../assets/safiya/kagum.webp';

export type SafiyaExpression =
  | 'sahaja' | 'tersenyum' | 'ngambek' | 'senang' | 'berkedip'
  | 'manja' | 'rileks' | 'terkejut' | 'sedih' | 'berpikir'
  | 'malu' | 'marah' | 'tertawa' | 'mengantuk' | 'khawatir'
  | 'bangga' | 'penasaran' | 'bicara' | 'sakit' | 'kagum';

const FRAMES: Record<SafiyaExpression, string> = {
  sahaja: sahajaImg,
  tersenyum: tersenyumImg,
  ngambek: ngambekImg,
  senang: senangImg,
  berkedip: berkedipImg,
  manja: manjaImg,
  rileks: rileksImg,
  terkejut: terkejutImg,
  sedih: sedihImg,
  berpikir: berpikirImg,
  malu: maluImg,
  marah: marahImg,
  tertawa: tertawaImg,
  mengantuk: mengantukImg,
  khawatir: khawatirImg,
  bangga: banggaImg,
  penasaran: penasaranImg,
  bicara: bicaraImg,
  sakit: sakitImg,
  kagum: kagumImg,
};
const ALL = Object.keys(FRAMES) as SafiyaExpression[];

// All frames are aligned to the same face; gentle tilt without lifting bottom edges
const TILT: Partial<Record<SafiyaExpression, number>> = { manja: -6, bangga: -3, berpikir: -2 };

// Expressions with a calm closed mouth can blink using dedicated berkedip frame
const CAN_BLINK: SafiyaExpression[] = ['sahaja', 'tersenyum', 'malu', 'khawatir', 'sedih'];

// Friendly moods shown on her own while idle
const IDLE_SEQUENCE: SafiyaExpression[] = [
  'tersenyum', 'penasaran', 'senang', 'manja', 'berpikir', 'tersenyum',
  'malu', 'kagum', 'bangga', 'tersenyum', 'tertawa', 'penasaran', 'terkejut', 'mengantuk',
];

// Lip movement while speaking
const TALK_FRAMES: SafiyaExpression[] = ['bicara', 'sahaja', 'bicara', 'kagum', 'bicara', 'tersenyum'];

// React to what is being said in the chat
const REACTIONS: Array<[RegExp, SafiyaExpression]> = [
  [/\b(bodoh|goblok|jelek|payah|nyebelin|anjing|bego)\b/i, 'marah'],
  [/\b(kesal|kesel|marah|sebel|bete)\b/i, 'ngambek'],
  [/\b(ngeri|seram|serem|jijik|sakit|aduh)\b/i, 'sakit'],
  [/\b(takut|cemas|khawatir|gagal|ditolak|bingung)\b/i, 'khawatir'],
  [/\b(sedih|kecewa|nangis|menyesal)\b|^maaf/i, 'sedih'],
  [/\b(ngantuk|capek|capai|lelah|begadang)\b/i, 'mengantuk'],
  [/\b(cantik|manis|imut|lucu|sayang)\b/i, 'malu'],
  [/\b(terima ?kasih|makasih|thanks|thank you)\b/i, 'malu'],
  [/\b(hebat|keren|pintar|mantap|bagus)\b/i, 'bangga'],
  [/\b(haha|wkwk|hehe|lucu banget)\b/i, 'tertawa'],
  [/\b(wow|serius|beneran|hah|mahal)\b|!{2,}/i, 'terkejut'],
  [/\b(gratis|rp 0|beasiswa penuh|fully funded|lulus|diterima)\b/i, 'kagum'],
  [/\b(selamat|yeay|asik|asyik|senang)\b/i, 'senang'],
];

const reactionFor = (text: string, fallback: SafiyaExpression): SafiyaExpression => {
  for (const [re, expr] of REACTIONS) if (re.test(text)) return expr;
  return fallback;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface SafiyaAvatarProps {
  /** Lips move while a reply is being written */
  talking?: boolean;
  /** Latest chat message; Safiya reacts to its content */
  lastMessage?: { id: string; sender: 'ai' | 'user'; text: string };
  /** Force one expression; when omitted Safiya changes expression on her own */
  expression?: SafiyaExpression;
  className?: string;
}

export const SafiyaAvatar: React.FC<SafiyaAvatarProps> = ({ talking = false, lastMessage, expression, className = '' }) => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const [idle, setIdle] = useState<SafiyaExpression>('sahaja');
  const [reaction, setReaction] = useState<SafiyaExpression | null>(null);
  const [talkFrame, setTalkFrame] = useState<SafiyaExpression | null>(null);
  const [hovered, setHovered] = useState(false);
  const [blinkFrame, setBlinkFrame] = useState<SafiyaExpression | null>(null);
  const breatheRef = useRef<HTMLDivElement>(null);
  const seenMessage = useRef(lastMessage?.id);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const queueTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reactionEnds = useRef(0);
  const react = (expr: SafiyaExpression, ms: number) => {
    clearTimeout(reactionTimer.current);
    setReaction(expr);
    reactionEnds.current = Date.now() + ms;
    reactionTimer.current = setTimeout(() => setReaction(null), ms);
  };
  // Show a reaction after the one currently on screen has finished
  const reactAfter = (expr: SafiyaExpression, ms: number) => {
    clearTimeout(queueTimer.current);
    const wait = Math.max(0, reactionEnds.current - Date.now());
    queueTimer.current = setTimeout(() => react(expr, ms), wait);
  };
  useEffect(() => () => { clearTimeout(reactionTimer.current); clearTimeout(queueTimer.current); }, []);

  // Breathing: gentle anchored expansion from bottom, never pulling the base upward
  useEffect(() => {
    const el = breatheRef.current;
    if (!el || reduceMotion || typeof el.animate !== 'function') return;
    const anim = el.animate(
      [
        { transform: 'translateY(2.2%) scale(1.16)' },
        { transform: 'translateY(0.8%) scale(1.19)' },
        { transform: 'translateY(2.2%) scale(1.16)' },
      ],
      { duration: 4200, iterations: Infinity, easing: 'ease-in-out' }
    );
    return () => anim.cancel();
  }, [reduceMotion]);

  // Natural human blinking: ~88% of blinks close both eyes (rileks) quickly (140ms),
  // while ~12% are rare playful 1-eye winks (berkedip, 280ms).
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const schedule = () => {
      if (cancelled) return;
      timers.push(setTimeout(() => {
        // Natural human: mostly both eyes closed ('rileks'), rarely 1-eye wink ('berkedip')
        const isWink = Math.random() < 0.12;
        const targetFrame: SafiyaExpression = isWink ? 'berkedip' : 'rileks';
        const duration = isWink ? 280 : 140;

        setBlinkFrame(targetFrame);
        timers.push(setTimeout(() => {
          setBlinkFrame(null);
          // Rapid natural double-blink for 2-eye blinks (~18% of the time)
          if (!isWink && Math.random() < 0.18) {
            timers.push(setTimeout(() => {
              setBlinkFrame('rileks');
              timers.push(setTimeout(() => {
                setBlinkFrame(null);
                schedule();
              }, 130));
            }, 140));
          } else {
            schedule();
          }
        }, duration));
      }, rand(2600, 5200)));
    };
    schedule();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  // Idle expressions: mostly calm, now and then something playful
  useEffect(() => {
    if (expression || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let step = Math.floor(Math.random() * IDLE_SEQUENCE.length);
    const rest = () => {
      setIdle('sahaja');
      timer = setTimeout(express, rand(4000, 7000));
    };
    const express = () => {
      const next = IDLE_SEQUENCE[step++ % IDLE_SEQUENCE.length];
      setIdle(next);
      timer = setTimeout(rest, rand(2200, 3200));
    };
    timer = setTimeout(express, rand(2500, 4000));
    return () => clearTimeout(timer);
  }, [expression, reduceMotion]);

  // Speaking: think for a moment, then lips move
  useEffect(() => {
    if (!talking) { setTalkFrame(null); return; }
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;
    setTalkFrame('berpikir');
    const tick = () => {
      setTalkFrame(TALK_FRAMES[i++ % TALK_FRAMES.length]);
      timer = setTimeout(tick, rand(150, 240));
    };
    timer = setTimeout(tick, 650);
    return () => clearTimeout(timer);
  }, [talking]);

  // React to new chat messages
  useEffect(() => {
    if (!lastMessage || lastMessage.id === seenMessage.current) return;
    seenMessage.current = lastMessage.id;
    if (lastMessage.sender === 'user') {
      react(reactionFor(lastMessage.text, 'penasaran'), 1100);
    } else {
      reactAfter(reactionFor(lastMessage.text, Math.random() < 0.5 ? 'senang' : 'tersenyum'), 2400);
    }
  }, [lastMessage]);

  const base: SafiyaExpression =
    expression ?? reaction ?? talkFrame ?? (hovered ? 'manja' : idle);
  // Use rileks (both eyes) for natural blinks, berkedip for rare winks
  const shown: SafiyaExpression = blinkFrame && CAN_BLINK.includes(base) ? blinkFrame : base;
  const tilt = reduceMotion ? 0 : TILT[shown] ?? 0;
  const isBlinkFrame = Boolean(blinkFrame) || shown === 'berkedip' || shown === 'rileks';
  const fast = talkFrame !== null && !reaction && !expression;
  // Blinking uses instant transition (0ms) to prevent semi-transparent white flash
  const fade = isBlinkFrame ? 0 : fast ? 110 : 260;

  // Track previous frame for crossfade (except during blinks where instant frame replacement is crisp)
  const lastShown = useRef<SafiyaExpression>(shown);
  const under = useRef<SafiyaExpression>(shown);
  if (lastShown.current !== shown) {
    if (!isBlinkFrame) {
      under.current = lastShown.current;
    }
    lastShown.current = shown;
  }

  return (
    <div
      role="img"
      aria-label={`Mandu AI (${shown})`}
      className={`relative w-full h-full overflow-hidden rounded-full bg-gradient-to-b from-sky-50 via-white to-blue-50/40 ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        ref={breatheRef}
        className="absolute inset-0"
        style={{ transformOrigin: '50% 90%', transform: 'translateY(2.2%) scale(1.16)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformOrigin: '50% 65%',
            transform: `rotate(${tilt}deg)`,
            transition: 'transform 400ms cubic-bezier(0.34, 1.4, 0.64, 1)',
          }}
        >
          {ALL.map((name) => (
            <img
              key={name}
              src={FRAMES[name]}
              alt=""
              draggable={false}
              decoding="async"
              className="absolute inset-0 w-full h-full select-none pointer-events-none"
              style={{
                opacity: name === shown ? 1 : name === under.current && !isBlinkFrame ? 1 : 0,
                transition: name === shown ? (fade === 0 ? 'none' : `opacity ${fade}ms ease-out`) : 'none',
                zIndex: name === shown ? 3 : name === under.current ? 2 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
