import React, { useEffect, useRef, useState } from 'react';
import baseImg from '../assets/safiya/base.webp';
import browLImg from '../assets/safiya/brow-l.webp';
import browRImg from '../assets/safiya/brow-r.webp';
import eyeClosedLImg from '../assets/safiya/eye-closed-l.webp';
import eyeClosedRImg from '../assets/safiya/eye-closed-r.webp';
import eyeHalfLImg from '../assets/safiya/eye-half-l.webp';
import eyeHalfRImg from '../assets/safiya/eye-half-r.webp';
import eyeHappyLImg from '../assets/safiya/eye-happy-l.webp';
import eyeHappyRImg from '../assets/safiya/eye-happy-r.webp';
import mouthNeutralImg from '../assets/safiya/mouth-neutral.webp';
import mouthSmileImg from '../assets/safiya/mouth-smile.webp';
import mouthHappyImg from '../assets/safiya/mouth-happy.webp';
import mouthSmallImg from '../assets/safiya/mouth-small.webp';
import mouthSulkImg from '../assets/safiya/mouth-sulk.webp';
import mouthTalkImg from '../assets/safiya/mouth-talk.webp';
import mouthSurprisedImg from '../assets/safiya/mouth-surprised.webp';

export type SafiyaMood = 'sahaja' | 'senyum' | 'senang' | 'ngambek' | 'manja';
type MouthShape = 'neutral' | 'smile' | 'happy' | 'small' | 'sulk' | 'talk' | 'surprised';
type EyeShape = 'open' | 'half' | 'closed' | 'happy';

const MOUTHS: Record<MouthShape, string> = {
  neutral: mouthNeutralImg,
  smile: mouthSmileImg,
  happy: mouthHappyImg,
  small: mouthSmallImg,
  sulk: mouthSulkImg,
  talk: mouthTalkImg,
  surprised: mouthSurprisedImg,
};

interface MoodPose {
  mouth: MouthShape;
  eyes: EyeShape;
  /** translateY in % of the avatar, rotation in degrees */
  browL: { y: number; r: number };
  browR: { y: number; r: number };
  blush: number;
  tilt: number;
  wink?: boolean;
}

const POSES: Record<SafiyaMood, MoodPose> = {
  sahaja: { mouth: 'neutral', eyes: 'open', browL: { y: 0, r: 0 }, browR: { y: 0, r: 0 }, blush: 0, tilt: 0 },
  senyum: { mouth: 'smile', eyes: 'open', browL: { y: -1.2, r: -1 }, browR: { y: -1.2, r: 1 }, blush: 0.25, tilt: 2 },
  senang: { mouth: 'happy', eyes: 'happy', browL: { y: -3, r: -3 }, browR: { y: -3, r: 3 }, blush: 0.45, tilt: -3 },
  ngambek: { mouth: 'sulk', eyes: 'half', browL: { y: 1.4, r: 12 }, browR: { y: 1.4, r: -12 }, blush: 0.35, tilt: -6 },
  manja: { mouth: 'small', eyes: 'happy', browL: { y: -2, r: -9 }, browR: { y: -2, r: 9 }, blush: 0.65, tilt: 7, wink: true },
};

// Feature anchors in % of the square avatar image
const BROW_L_ORIGIN = '28.3% 30.4%';
const BROW_R_ORIGIN = '72.3% 30.7%';

const IDLE_SEQUENCE: SafiyaMood[] = ['senyum', 'manja', 'senyum', 'senang', 'ngambek', 'senyum', 'manja'];
const TALK_SHAPES: MouthShape[] = ['talk', 'small', 'surprised', 'neutral', 'talk', 'smile'];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

interface SafiyaAvatarProps {
  /** Animate the mouth as if Safiya is speaking (e.g. while a reply is being written) */
  talking?: boolean;
  /** Force a specific expression; when omitted Safiya changes mood on her own */
  mood?: SafiyaMood;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const SafiyaAvatar: React.FC<SafiyaAvatarProps> = ({ talking = false, mood: forcedMood, className = '' }) => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const breatheRef = useRef<HTMLDivElement>(null);
  const [idleMood, setIdleMood] = useState<SafiyaMood>('sahaja');
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState<null | 'half' | 'closed'>(null);
  const [winking, setWinking] = useState(false);
  const [talkShape, setTalkShape] = useState<MouthShape>('talk');
  const wasTalking = useRef(false);

  // Breathing: slow rise and fall of the whole figure
  useEffect(() => {
    const el = breatheRef.current;
    if (!el || reduceMotion || typeof el.animate !== 'function') return;
    const anim = el.animate(
      [
        { transform: 'translateY(0%) scale(1.06)' },
        { transform: 'translateY(-1.2%) scale(1.085)' },
        { transform: 'translateY(0%) scale(1.06)' },
      ],
      { duration: 4200, iterations: Infinity, easing: 'ease-in-out' }
    );
    return () => anim.cancel();
  }, [reduceMotion]);

  // Natural blinking: half → closed → half → open, sometimes twice
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const blinkOnce = (delay: number, then?: () => void) => {
      timers.push(setTimeout(() => setBlink('half'), delay));
      timers.push(setTimeout(() => setBlink('closed'), delay + 55));
      timers.push(setTimeout(() => setBlink('half'), delay + 145));
      timers.push(setTimeout(() => { setBlink(null); then?.(); }, delay + 205));
    };
    const schedule = () => {
      if (cancelled) return;
      const wait = rand(2200, 5200);
      const double = Math.random() < 0.2;
      blinkOnce(wait, double ? () => blinkOnce(140, schedule) : schedule);
    };
    schedule();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  // Idle mood changes: mostly calm (sahaja), now and then smile, happy, coy or sulky
  useEffect(() => {
    if (forcedMood || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let step = Math.floor(Math.random() * IDLE_SEQUENCE.length);
    const rest = () => {
      setIdleMood('sahaja');
      timer = setTimeout(express, rand(4500, 7500));
    };
    const express = () => {
      const next = IDLE_SEQUENCE[step % IDLE_SEQUENCE.length];
      step += 1;
      setIdleMood(next);
      timer = setTimeout(rest, next === 'ngambek' ? rand(1800, 2400) : rand(2400, 3300));
    };
    timer = setTimeout(express, rand(2500, 4000));
    return () => clearTimeout(timer);
  }, [forcedMood, reduceMotion]);

  // Lip movement while talking; a happy face when the reply is done
  useEffect(() => {
    if (talking) {
      wasTalking.current = true;
      let timer: ReturnType<typeof setTimeout>;
      const tick = () => {
        setTalkShape(TALK_SHAPES[Math.floor(Math.random() * TALK_SHAPES.length)]);
        timer = setTimeout(tick, rand(90, 170));
      };
      tick();
      return () => clearTimeout(timer);
    }
    if (wasTalking.current) {
      wasTalking.current = false;
      setIdleMood('senang');
      const timer = setTimeout(() => setIdleMood('sahaja'), 2200);
      return () => clearTimeout(timer);
    }
  }, [talking]);

  const mood: SafiyaMood = forcedMood ?? (hovered ? 'manja' : talking ? 'sahaja' : idleMood);
  const pose = POSES[mood];

  // A playful wink when she is being manja
  useEffect(() => {
    if (!pose.wink) { setWinking(false); return; }
    const t1 = setTimeout(() => setWinking(true), 350);
    const t2 = setTimeout(() => setWinking(false), 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pose.wink, mood]);

  const mouth: MouthShape = talking ? talkShape : pose.mouth;
  const eyes: EyeShape = blink ?? pose.eyes;
  const eyeFor = (side: 'l' | 'r'): EyeShape => (side === 'r' && winking && !blink ? 'closed' : eyes);

  const eyeLayers: Record<Exclude<EyeShape, 'open'>, { l: string; r: string }> = {
    closed: { l: eyeClosedLImg, r: eyeClosedRImg },
    half: { l: eyeHalfLImg, r: eyeHalfRImg },
    happy: { l: eyeHappyLImg, r: eyeHappyRImg },
  };

  const layer = 'absolute inset-0 w-full h-full select-none pointer-events-none';

  return (
    <div
      role="img"
      aria-label="Safiya AI"
      className={`relative w-full h-full overflow-hidden rounded-full bg-white ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Breathing wrapper */}
      <div ref={breatheRef} className="absolute inset-0" style={{ transformOrigin: '50% 100%', transform: 'scale(1.06)' }}>
        {/* Head tilt per mood */}
        <div
          className="absolute inset-0"
          style={{
            transformOrigin: '50% 92%',
            transform: `rotate(${reduceMotion ? 0 : pose.tilt}deg)`,
            transition: `transform 600ms ${SPRING}`,
          }}
        >
          <img src={baseImg} alt="" draggable={false} className={layer} />

          {/* Cheek blush */}
          <div
            className={layer}
            style={{
              opacity: pose.blush,
              transition: 'opacity 350ms ease-out',
              background:
                'radial-gradient(circle at 25% 64%, rgba(244,114,150,0.55) 0, rgba(244,114,150,0) 13%), radial-gradient(circle at 75.7% 64%, rgba(244,114,150,0.55) 0, rgba(244,114,150,0) 13%)',
            }}
          />

          {/* Eyes (open eyes live in the base image) */}
          {(['l', 'r'] as const).map((side) =>
            (Object.keys(eyeLayers) as Array<keyof typeof eyeLayers>).map((shape) => (
              <img
                key={`${side}-${shape}`}
                src={eyeLayers[shape][side]}
                alt=""
                draggable={false}
                className={layer}
                style={{ opacity: eyeFor(side) === shape ? 1 : 0 }}
              />
            ))
          )}

          {/* Brows */}
          <img
            src={browLImg}
            alt=""
            draggable={false}
            className={layer}
            style={{
              transformOrigin: BROW_L_ORIGIN,
              transform: `translateY(${pose.browL.y}%) rotate(${pose.browL.r}deg)`,
              transition: `transform 450ms ${SPRING}`,
            }}
          />
          <img
            src={browRImg}
            alt=""
            draggable={false}
            className={layer}
            style={{
              transformOrigin: BROW_R_ORIGIN,
              transform: `translateY(${pose.browR.y}%) rotate(${pose.browR.r}deg)`,
              transition: `transform 450ms ${SPRING}`,
            }}
          />

          {/* Mouth */}
          {(Object.keys(MOUTHS) as MouthShape[]).map((shape) => (
            <img
              key={shape}
              src={MOUTHS[shape]}
              alt=""
              draggable={false}
              className={layer}
              style={{ opacity: mouth === shape ? 1 : 0, transition: talking ? 'none' : 'opacity 140ms ease-out' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
