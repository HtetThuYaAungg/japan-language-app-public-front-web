"use client";

import { useState, useRef, useEffect } from "react";
import { RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface FlashCard {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const flashcards: FlashCard[] = [
  {
    id: 1,
    question: "What does 'こんにちは' mean?",
    options: ["Good morning", "Hello", "Goodbye", "Thank you"],
    correctAnswer: 1,
    explanation:
      "こんにちは (konnichiwa) is used as a general greeting meaning 'Hello'",
  },
  {
    id: 2,
    question: "How do you say 'Thank you' in Japanese?",
    options: ["すみません", "ありがとう", "さようなら", "おはよう"],
    correctAnswer: 1,
    explanation: "ありがとう (arigatou) means 'Thank you'",
  },
  {
    id: 3,
    question: "What is the Japanese word for 'School'?",
    options: ["家族", "友達", "学校", "元気"],
    correctAnswer: 2,
    explanation: "学校 (gakkou) means 'School'",
  },
  {
    id: 4,
    question: "Which greeting is used in the morning?",
    options: ["こんにちは", "おはよう", "こんばんは", "さようなら"],
    correctAnswer: 1,
    explanation: "おはよう (ohayou) means 'Good morning'",
  },
  {
    id: 5,
    question: "What does '友達' mean?",
    options: ["Family", "Friend", "Teacher", "Student"],
    correctAnswer: 1,
    explanation: "友達 (tomodachi) means 'Friend'",
  },
  {
    id: 6,
    question: "How do you say 'Excuse me' in Japanese?",
    options: ["ありがとう", "すみません", "はじめまして", "元気"],
    correctAnswer: 1,
    explanation: "すみません (sumimasen) means 'Excuse me' or 'I'm sorry'",
  },
  {
    id: 7,
    question: "What does '家族' mean?",
    options: ["House", "Family", "Friend", "School"],
    correctAnswer: 1,
    explanation: "家族 (kazoku) means 'Family'",
  },
  {
    id: 8,
    question: "Which phrase means 'Nice to meet you'?",
    options: ["はじめまして", "さようなら", "ありがとう", "すみません"],
    correctAnswer: 0,
    explanation: "はじめまして (hajimemashite) means 'Nice to meet you'",
  },
];

export default function FlashCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const currentCard = flashcards[currentIndex];
  const isCorrect = selectedAnswer === currentCard.correctAnswer;

  const handleStart = (clientX: number) => {
    if (isAnimating || !showResult) return;

    console.log("Swipe started at:", clientX);
    startX.current = clientX;
    currentX.current = clientX;
    isDragging.current = true;
    setIsSwiping(true);

    // Reset any existing transform to ensure clean start
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
      // Keep the flip but reset swipe transforms
      cardRef.current.style.transform =
        "rotateY(180deg) translateX(0px) rotate(0deg)";
      cardRef.current.style.opacity = "1";

      // Force reflow to ensure the transition is reset
      void cardRef.current.offsetWidth;
      cardRef.current.style.transition = "all 400ms ease";
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || isAnimating || !showResult) return;

    currentX.current = clientX;
    const deltaX = currentX.current - startX.current;

    console.log("Swipe move:", deltaX, "isCorrect:", isCorrect);

    // Allow movement in any direction initially for better UX
    if (cardRef.current) {
      const rotation = deltaX * 0.1;
      // Since card is flipped (rotateY 180deg), we need to invert the translateX
      // to make swipe direction match card movement direction
      const adjustedDeltaX = -deltaX; // Invert because of the Y flip
      cardRef.current.style.transform = `rotateY(180deg) translateX(${adjustedDeltaX}px) rotate(${-rotation}deg)`;
      cardRef.current.style.opacity = "1";
    }
  };

  const handleEnd = () => {
    if (!isDragging.current || isAnimating || !showResult) return;

    const deltaX = currentX.current - startX.current;
    const threshold = 80;

    console.log("Swipe end:", deltaX, "isCorrect:", isCorrect);

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? "right" : "left";

      // Only allow swipe in correct direction
      if (
        (isCorrect && direction === "right") ||
        (!isCorrect && direction === "left")
      ) {
        console.log("Valid swipe direction:", direction);
        handleSwipe(direction);
      } else {
        console.log("Invalid swipe direction:", direction);
        // Snap back if wrong direction with animation
        if (cardRef.current) {
          cardRef.current.style.transition = "all 300ms ease";
          cardRef.current.style.transform =
            "rotateY(180deg) translateX(0px) rotate(0deg)";
          cardRef.current.style.opacity = "1";
          setIsSwiping(false);
        }
      }
    } else {
      // Snap back with animation
      if (cardRef.current) {
        cardRef.current.style.transition = "all 300ms ease";
        cardRef.current.style.transform =
          "rotateY(180deg) translateX(0px) rotate(0deg)";
        cardRef.current.style.opacity = "1";
        setIsSwiping(false);
      }
    }

    isDragging.current = false;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setIsFlipped(true);

    setTimeout(() => {
      setShowResult(true);
      if (answerIndex === currentCard.correctAnswer) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setWrongCount((prev) => prev + 1);
      }
    }, 1000);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating || !showResult) return;

    setIsAnimating(true);
    setSwipeDirection(direction);
    setIsSwiping(true);

    if (cardRef.current) {
      // Since card is flipped (rotateY 180deg), we need to invert the translateX
      // to make swipe direction match card movement direction
      const translateX = direction === "right" ? "-100vw" : "100vw"; // Inverted because of Y flip
      const rotation = direction === "right" ? "-30deg" : "30deg"; // Inverted because of Y flip

      cardRef.current.style.transition = "all 400ms ease";
      cardRef.current.style.transform = `rotateY(180deg) translateX(${translateX}) rotate(${rotation}deg)`;
      cardRef.current.style.opacity = "1";
    }

    setTimeout(() => {
      nextCard();
      setIsAnimating(false);
      setSwipeDirection(null);
      setIsSwiping(false);
    }, 400);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFlipped(false);

    if (cardRef.current) {
      cardRef.current.style.transform =
        "rotateY(0deg) translateX(0px) rotate(0deg)";
      cardRef.current.style.opacity = "1";
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnimating(false);
    setSwipeDirection(null);
    setIsFlipped(false);
    setIsSwiping(false);

    if (cardRef.current) {
      cardRef.current.style.transform =
        "rotateY(0deg) translateX(0px) rotate(0deg)";
      cardRef.current.style.opacity = "1";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => handleEnd();

    if (showResult) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showResult, isCorrect]);

  return (
    <div className="bg-background items-center flex flex-col">
      {/* Score Display */}
      <div className="flex gap-8 mb-8">
        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className=" font-z06-walone-bold text-success">
            {correctCount}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-full">
          <XCircle className="w-5 h-5 text-destructive" />
          <span className="font-semibold text-destructive">{wrongCount}</span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative w-full max-w-sm h-96 mb-4 perspective-1000">
        <Card
          ref={cardRef}
          className={`absolute border-background rounded-2xl inset-0 transition-all duration-1000 ease-in-out select-none ${
            showResult ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          } ${isSwiping ? "hover:shadow-2xl" : ""}`}
          style={{
            touchAction: "none",
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            opacity: 1,
          }}
          onMouseDown={showResult ? (e) => handleStart(e.clientX) : undefined}
          onTouchStart={
            showResult ? (e) => handleStart(e.touches[0].clientX) : undefined
          }
        >
          {/* Front of card - Question */}
          <CardContent
            className={`h-full flex flex-col items-center justify-center p-6 text-center absolute inset-0 ${
              isFlipped ? "invisible" : "visible"
            }`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="space-y-6 w-full">
              <div className="text-xl font-z06-walone-bold text-gray mb-6">
                {currentCard.question}
              </div>
              <div className="grid grid-cols-1 gap-3 w-full">
                {currentCard.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`p-4 text-left justify-start h-auto whitespace-normal ${
                      selectedAnswer === index
                        ? "bg-active/10 border-active"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className=" font-z06-walone-bold mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>

          {/* Back of card - Result */}
          <CardContent
            className={`h-full flex flex-col items-center justify-center p-6 text-center absolute inset-0 ${
              isFlipped ? "visible" : "invisible"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {showResult && (
              <div className="space-y-6 w-full">
                <div
                  className={`text-3xl font-bold mb-4 ${
                    isCorrect ? "text-success" : " text-destructive"
                  }`}
                >
                  {isCorrect ? "✓ CORRECT!" : "✗ WRONG!"}
                </div>

                <div className="space-y-3">
                  <div className="text-lg font-z06-walone-bold text-foreground">
                    Correct Answer:{" "}
                    {String.fromCharCode(65 + currentCard.correctAnswer)}.{" "}
                    {currentCard.options[currentCard.correctAnswer]}
                  </div>

                  {selectedAnswer !== null &&
                    selectedAnswer !== currentCard.correctAnswer && (
                      <div className="text-md text-destructive">
                        Your Answer: {String.fromCharCode(65 + selectedAnswer)}.{" "}
                        {currentCard.options[selectedAnswer]}
                      </div>
                    )}

                  {currentCard.explanation && (
                    <div className="text-sm text-gray mt-4 p-3 bg-background rounded-lg">
                      {currentCard.explanation}
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray mt-6">
                  {isCorrect ? (
                    <span className="text-success">
                      Swipe right to continue →
                    </span>
                  ) : (
                    <span className=" text-destructive">
                      ← Swipe left to continue
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Swipe Indicators */}
        {swipeDirection === "right" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-success/70 text-white px-6 py-3 rounded-full text-lg animate-in zoom-in duration-200">
              NEXT CARD!
            </div>
          </div>
        )}
        {swipeDirection === "left" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className=" bg-destructive/70 text-white px-6 py-3 rounded-full text-lg animate-in zoom-in duration-200">
              NEXT CARD!
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-gray mb-6 max-w-md">
        {!showResult ? (
          <p className="text-sm">
            Choose the correct answer from the options above
          </p>
        ) : (
          <p className="text-sm">
            {isCorrect ? (
              <>
                Swipe{" "}
                <span className="text-success font-z06-walone-bold">right</span>{" "}
                to continue or use the button
              </>
            ) : (
              <>
                Swipe <span className="text-destructive">left</span> to continue
                or use the button
              </>
            )}
          </p>
        )}
        <p className="text-xs mt-1 opacity-75">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {showResult && (
          <>
            {isCorrect ? (
              <Button
                variant="outline"
                onClick={() => handleSwipe("right")}
                disabled={isAnimating}
                className={`${
                  !isCorrect
                    ? "opacity-50 cursor-not-allowed"
                    : "text-success hover:text-green-600"
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Continue
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => handleSwipe("left")}
                disabled={isAnimating }
                className={`${
                  isCorrect
                    ? "opacity-50 cursor-not-allowed"
                    : " text-destructive hover:text-red-600"
                }`}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Continue
              </Button>
            )}
          </>
        )}
        <Button variant="outline" onClick={reset} disabled={isAnimating}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
