"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { riasecQuestions, riasecProfiles } from "@/data/riasec";
import type { RiasecDimension, RiasecProfile } from "@/types/riasec";
import Button from "@/components/ui/Button";

type Phase = "idle" | "quiz" | "result";

interface Answer {
  questionIndex: number;
  chosenDimension: RiasecDimension;
}

function getResult(scores: Record<RiasecDimension, number>): RiasecProfile {
  const sorted = (Object.entries(scores) as [RiasecDimension, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  return riasecProfiles[sorted[0][0]];
}

export default function RiasecQuiz() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<RiasecDimension, number>>({
    R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
  });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<RiasecProfile | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setCurrentQuestion(0);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setAnswers([]);
    setResult(null);
  }, []);

  const handleAnswer = useCallback(
    (dimension: RiasecDimension) => {
      setAnimating(true);

      const newScores = { ...scores, [dimension]: scores[dimension] + 1 };
      setScores(newScores);
      setAnswers([...answers, { questionIndex: currentQuestion, chosenDimension: dimension }]);

      setTimeout(() => {
        if (currentQuestion + 1 >= riasecQuestions.length) {
          const profile = getResult(newScores);
          setResult(profile);
          setPhase("result");
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
        setAnimating(false);
      }, 300);
    },
    [scores, answers, currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentQuestion === 0) {
      setPhase("idle");
      return;
    }
    const lastAnswer = answers[answers.length - 1];
    setScores({
      ...scores,
      [lastAnswer.chosenDimension]: scores[lastAnswer.chosenDimension] - 1,
    });
    setAnswers(answers.slice(0, -1));
    setCurrentQuestion(currentQuestion - 1);
  }, [currentQuestion, answers, scores]);

  const handleRestart = useCallback(() => {
    handleStart();
  }, [handleStart]);

  // --- IDLE PHASE ---
  if (phase === "idle") {
    return (
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-gold p-8 md:p-10 text-center">
            <div className="text-4xl mb-4">🧭</div>
            <h2 className="font-serif text-2xl md:text-3xl text-navy-deep mb-4">
              Quelle formation est faite pour toi ?
            </h2>
            <p className="text-gray-mid mb-8 max-w-lg mx-auto">
              Réponds à 12 questions simples pour découvrir ton profil et la formation en alternance qui te correspond. Pas de bonne ou mauvaise réponse.
            </p>
            <Button onClick={handleStart} variant="gold" className="text-lg px-8 py-4">
              C&apos;est parti !
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // --- QUIZ PHASE ---
  if (phase === "quiz") {
    const question = riasecQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / riasecQuestions.length) * 100;

    return (
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-mid font-medium">
                  Question {currentQuestion + 1} / {riasecQuestions.length}
                </span>
                <span className="text-sm text-gold font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>
              <div
                className="h-2 bg-gray-100 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={currentQuestion + 1}
                aria-valuemin={0}
                aria-valuemax={riasecQuestions.length}
              >
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="font-serif text-xl md:text-2xl text-navy-deep text-center mb-2">
              Qu&apos;est-ce qui te parle le plus ?
            </h3>
            <p className="text-gray-mid text-center text-sm mb-8">
              Choisis l&apos;activité qui t&apos;attire le plus
            </p>

            {/* Options */}
            <div
              className={`flex flex-col gap-4 transition-opacity duration-200 ${
                animating ? "opacity-0" : "opacity-100"
              }`}
            >
              <button
                type="button"
                onClick={() => handleAnswer(question.optionA.dimension)}
                disabled={animating}
                className="w-full text-left p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-gold hover:bg-gold/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 group"
              >
                <span className="text-navy-deep font-medium text-lg group-hover:text-gold transition-colors">
                  {question.optionA.text}
                </span>
              </button>

              <div className="text-center text-gray-mid text-sm font-medium">ou</div>

              <button
                type="button"
                onClick={() => handleAnswer(question.optionB.dimension)}
                disabled={animating}
                className="w-full text-left p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-gold hover:bg-gold/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 group"
              >
                <span className="text-navy-deep font-medium text-lg group-hover:text-gold transition-colors">
                  {question.optionB.text}
                </span>
              </button>
            </div>

            {/* Back button */}
            <button
              type="button"
              onClick={handleBack}
              className="mt-6 text-gray-mid hover:text-navy-deep text-sm font-medium transition-colors flex items-center gap-1 mx-auto"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {currentQuestion === 0 ? "Quitter" : "Précédent"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --- RESULT PHASE ---
  if (phase === "result" && result) {
    return (
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 text-center" aria-live="polite">
            {/* Celebration */}
            <div className="text-5xl mb-4">{result.emoji}</div>

            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
              Ton profil
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy-deep mb-4">
              {result.name}
            </h2>
            <p className="text-gray-mid max-w-lg mx-auto mb-6 leading-relaxed">
              {result.description}
            </p>

            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-cream rounded-full text-sm font-medium text-navy-deep"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Formation recommendation */}
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-6 mb-8">
              <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
                Notre recommandation
              </p>
              <h3 className="font-serif text-2xl text-navy-deep mb-2">
                {result.formationName}
              </h3>
              <Link
                href={`/formations/${result.recommendedFormation}`}
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors mt-2"
              >
                Découvrir cette formation
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Restart */}
            <button
              type="button"
              onClick={handleRestart}
              className="text-gray-mid hover:text-navy-deep text-sm font-medium transition-colors"
            >
              Refaire le test
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
