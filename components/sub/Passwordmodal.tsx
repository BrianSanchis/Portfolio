"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 300;

interface PasswordModalProps {
  href: string;
  onClose: () => void;
}

const PasswordModal = ({ href, onClose }: PasswordModalProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (locked && countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (locked && countdown === 0) {
      setLocked(false);
      setAttempts(0);
      setError("");
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [locked, countdown]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = useCallback(async () => {
    if (locked || input.length === 0) return;

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: input }),
      });

      if (res.ok) {
        setSuccess(true);
        setError("");
        setTimeout(() => {
          window.open(href, "_blank");
          onClose();
        }, 800);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setInput("");

        if (newAttempts >= MAX_ATTEMPTS) {
          setLocked(true);
          setCountdown(LOCKOUT_DURATION);
          setError(`Trop de tentatives. Réessayez dans ${formatCountdown(LOCKOUT_DURATION)}.`);
        } else {
          const remaining = MAX_ATTEMPTS - newAttempts;
          setError(`Code incorrect. ${remaining} tentative${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}.`);
        }
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    }
  }, [input, attempts, locked, href, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  const progressPercent = (input.length / 6) * 100;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative rounded-2xl p-8 flex flex-col items-center gap-5 w-[360px]"
        style={{
          background: "linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 60%, #16213e 100%)",
          border: "1px solid rgba(139, 92, 246, 0.4)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          animation: shake
            ? "shake 0.5s ease"
            : success
            ? "successPulse 0.4s ease"
            : "fadeInScale 0.25s ease",
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-300 transition-colors text-lg leading-none w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          ✕
        </button>

        {/* Icône + titre */}
        <div className="text-center">
          <div
            className="text-4xl mb-3 transition-all duration-300"
            style={{
              filter: success
                ? "grayscale(0)"
                : locked
                ? "grayscale(1) brightness(0.5)"
                : "none",
            }}
          >
            {success ? "✅" : locked ? "🔐" : "🔒"}
          </div>
          <h2 className="text-white font-semibold text-xl tracking-wide">
            {success ? "Accès accordé" : locked ? "Accès bloqué" : "Zone sécurisée"}
          </h2>
          <p className="text-gray-500 text-xs mt-1 font-mono tracking-widest uppercase">
            {success
              ? "Redirection en cours..."
              : locked
              ? `Débloqué dans ${formatCountdown(countdown)}`
              : "Authentification requise"}
          </p>
        </div>

        {/* Barre de progression */}
        {!locked && !success && (
          <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #a855f7, #06b6d4)",
                boxShadow: progressPercent > 0 ? "0 0 8px rgba(168,85,247,0.5)" : "none",
              }}
            />
          </div>
        )}

        {/* Compteur de points */}
        {!locked && !success && (
          <div className="flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-all duration-150"
                style={{
                  background:
                    i < input.length
                      ? "linear-gradient(135deg, #a855f7, #06b6d4)"
                      : "rgba(255,255,255,0.1)",
                  boxShadow:
                    i < input.length ? "0 0 8px rgba(168,85,247,0.7)" : "none",
                  transform: i < input.length ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>
        )}

        {/* Champ de saisie */}
        {!locked && !success && (
          <div className="w-full relative">
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={input}
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  setInput(e.target.value);
                  setError("");
                }
              }}
              onKeyDown={handleKeyDown}
              maxLength={6}
              placeholder="••••••"
              className="w-full px-4 py-3 rounded-xl text-white text-center text-lg tracking-[0.4em] font-mono outline-none transition-all duration-200 placeholder-gray-700"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: error
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(139,92,246,0.3)",
                boxShadow: error
                  ? "0 0 15px rgba(239,68,68,0.1)"
                  : "0 0 15px rgba(139,92,246,0.05)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <p className="text-red-400 text-xs text-center -mt-2 font-mono">{error}</p>
        )}

        {/* Indicateur tentatives */}
        {!locked && !success && attempts > 0 && (
          <div className="flex gap-2">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i < attempts ? "#ef4444" : "rgba(255,255,255,0.15)",
                  boxShadow: i < attempts ? "0 0 6px rgba(239,68,68,0.6)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Bouton valider */}
        {!locked && !success && (
          <button
            onClick={handleSubmit}
            disabled={input.length === 0}
            className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-200"
            style={{
              background:
                input.length > 0
                  ? "linear-gradient(135deg, #a855f7, #06b6d4)"
                  : "rgba(255,255,255,0.05)",
              color: input.length > 0 ? "white" : "rgba(255,255,255,0.2)",
              border: input.length > 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
              cursor: input.length > 0 ? "pointer" : "not-allowed",
              boxShadow: input.length > 0 ? "0 0 20px rgba(168,85,247,0.3)" : "none",
            }}
          >
            Déverrouiller
          </button>
        )}

        {/* Countdown visuel */}
        {locked && (
          <div
            className="text-5xl font-mono font-bold tabular-nums"
            style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {formatCountdown(countdown)}
          </div>
        )}

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-10px); }
            40% { transform: translateX(10px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
          }
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.93) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes successPulse {
            0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
            100% { box-shadow: 0 0 0 20px rgba(34,197,94,0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PasswordModal;