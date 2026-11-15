import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Eye, Wand2, Hash } from 'lucide-react';

interface BirthdayPuzzleProps {
  imageSrc: string;
  isSolved: boolean;
  onSolvedChange: (solved: boolean) => void;
}

const GRID_SIZE = 5;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE; // 25 tiles

export const BirthdayPuzzle: React.FC<BirthdayPuzzleProps> = ({
  imageSrc,
  isSolved,
  onSolvedChange,
}) => {
  // board[slotIndex] = pieceIndex (0 to 24)
  const [board, setBoard] = useState<number[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [draggedSlot, setDraggedSlot] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);
  const [showPeekModal, setShowPeekModal] = useState(false);

  // Generate scrambled board
  const scrambleBoard = useCallback(() => {
    // Start with solved array
    const solved = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    const shuffled = [...solved];

    // Perform random swaps so it's guaranteed solvable and nicely mixed
    for (let i = 0; i < 40; i++) {
      const idxA = Math.floor(Math.random() * TOTAL_TILES);
      const idxB = Math.floor(Math.random() * TOTAL_TILES);
      if (idxA !== idxB) {
        const temp = shuffled[idxA];
        shuffled[idxA] = shuffled[idxB];
        shuffled[idxB] = temp;
      }
    }

    // Ensure it's not accidentally solved
    if (shuffled.every((val, idx) => val === idx)) {
      const temp = shuffled[0];
      shuffled[0] = shuffled[1];
      shuffled[1] = temp;
    }

    setBoard(shuffled);
    setSelectedSlot(null);
    setMoves(0);
    onSolvedChange(false);
  }, [onSolvedChange]);

  // Initial scramble on mount
  useEffect(() => {
    scrambleBoard();
  }, [scrambleBoard]);

  // Check if solved
  const checkWinCondition = (currentBoard: number[]) => {
    const solved = currentBoard.every((val, idx) => val === idx);
    if (solved) {
      onSolvedChange(true);
      // Trigger festive confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#DA70D6', '#FFD700', '#FFB6C1', '#87CEFA'],
      });
    }
    return solved;
  };

  // Swap two slots
  const swapSlots = (slotA: number, slotB: number) => {
    if (slotA === slotB) return;

    setBoard((prev) => {
      const next = [...prev];
      const temp = next[slotA];
      next[slotA] = next[slotB];
      next[slotB] = temp;

      checkWinCondition(next);
      return next;
    });

    setMoves((m) => m + 1);
    setSelectedSlot(null);
  };

  // Click handler
  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedSlot === null) {
      setSelectedSlot(index);
    } else if (selectedSlot === index) {
      setSelectedSlot(null); // deselect
    } else {
      swapSlots(selectedSlot, index);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (index: number) => {
    if (isSolved) return;
    setDraggedSlot(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (isSolved || draggedSlot === null) return;
    swapSlots(draggedSlot, index);
    setDraggedSlot(null);
  };

  // Instant solve helper
  const handleAutoSolve = () => {
    const solved = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    setBoard(solved);
    setSelectedSlot(null);
    onSolvedChange(true);
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#DA70D6', '#FFD700', '#FFB6C1', '#87CEFA'],
    });
  };

  // Count correct pieces
  const correctCount = board.reduce((acc, pieceIdx, slotIdx) => (pieceIdx === slotIdx ? acc + 1 : acc), 0);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[340px]">
      {/* Header Badge & Stats */}
      <div className="w-full flex items-center justify-between mb-2.5 px-1 text-xs">
        <span className="font-mono font-semibold text-pink-700 bg-pink-100/90 px-3 py-1 rounded-full border border-pink-200">
          5×5 Photo Puzzle
        </span>
        <span className="font-mono text-slate-500">
          Moves: <strong className="text-pink-600">{moves}</strong>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-3 px-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
          <span>{isSolved ? '🎉 Completed!' : 'Progress:'}</span>
          <span className="font-bold text-pink-600">{correctCount} / 25 Pieces Placed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-pink-100 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 transition-all duration-300"
            style={{ width: `${(correctCount / TOTAL_TILES) * 100}%` }}
          />
        </div>
      </div>

      {/* 5x5 Puzzle Board Container (Aspect 9:16, Moderate Size ~290px-310px wide) */}
      <div
        className={`relative w-[280px] sm:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden p-1 bg-white shadow-2xl border-4 transition-all duration-500 ${
          isSolved
            ? 'border-emerald-400 ring-4 ring-emerald-200 shadow-emerald-200/50'
            : 'border-pink-200/90 shadow-pink-100/60'
        }`}
      >
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-[1.5px] bg-slate-200 rounded-xl overflow-hidden">
          {board.map((pieceIdx, slotIdx) => {
            const isCorrect = pieceIdx === slotIdx;
            const isSelected = selectedSlot === slotIdx;

            // Compute background slice position for this piece
            const row = Math.floor(pieceIdx / GRID_SIZE);
            const col = pieceIdx % GRID_SIZE;
            const posX = col * 25; // 0%, 25%, 50%, 75%, 100%
            const posY = row * 25;

            return (
              <div
                key={slotIdx}
                onClick={() => handleTileClick(slotIdx)}
                draggable={!isSolved}
                onDragStart={() => handleDragStart(slotIdx)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(slotIdx)}
                className={`relative w-full h-full cursor-pointer transition-transform duration-150 ${
                  isSelected
                    ? 'ring-2 ring-pink-500 scale-105 z-20 shadow-md'
                    : 'hover:opacity-90'
                } ${isCorrect && !isSolved ? 'border-b-2 border-r-2 border-emerald-400/40' : ''}`}
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: '500% 500%',
                  backgroundPosition: `${posX}% ${posY}%`,
                }}
              >
                {/* Number hint badge */}
                {showNumbers && (
                  <span className="absolute top-0.5 left-0.5 px-1 rounded text-[9px] font-mono font-bold bg-black/60 text-white backdrop-blur-xs pointer-events-none">
                    {pieceIdx + 1}
                  </span>
                )}

                {/* Subtle correct indicator */}
                {isCorrect && !isSolved && (
                  <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white shadow-xs pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Solved celebration overlay */}
        {isSolved && (
          <div className="absolute inset-0 z-30 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-center animate-fadeIn pointer-events-none">
            <span className="text-xl font-bold font-serif text-yellow-300 drop-shadow-md">
              ✨ Complete! ✨
            </span>
            <span className="text-xs font-mono text-pink-100">
              Solved in {moves} moves
            </span>
          </div>
        )}
      </div>

      {/* Control Buttons Bar */}
      <div className="w-full mt-3.5 flex items-center justify-between gap-1.5 px-1">
        {/* Toggle Numbers */}
        <button
          onClick={() => setShowNumbers((prev) => !prev)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-all ${
            showNumbers
              ? 'bg-pink-100 text-pink-700 border-pink-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Toggle Number Hints"
        >
          <Hash className="w-3.5 h-3.5" />
          <span>{showNumbers ? 'Numbers On' : 'Numbers'}</span>
        </button>

        {/* Peek Image Modal */}
        <button
          onClick={() => setShowPeekModal(true)}
          className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
          title="Peek original photo"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Peek</span>
        </button>

        {/* Shuffle */}
        <button
          onClick={scrambleBoard}
          className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
          title="Shuffle pieces"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Shuffle</span>
        </button>

        {/* Auto Solve */}
        <button
          onClick={handleAutoSolve}
          className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-xs hover:scale-105 active:scale-95 transition-all"
          title="Auto solve puzzle"
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-100" />
          <span>Solve</span>
        </button>
      </div>

      <p className="mt-2 text-[11px] text-slate-400 font-sans text-center">
        💡 Tap a tile, then tap another to swap • Or drag & drop
      </p>

      {/* Peek Modal */}
      {showPeekModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowPeekModal(false)}
        >
          <div
            className="relative bg-white p-4 rounded-3xl shadow-2xl max-w-xs text-center border-2 border-pink-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-serif text-base font-bold text-slate-800 mb-2">
              Original Birthday Picture
            </h4>
            <div className="w-[220px] aspect-[9/16] mx-auto rounded-xl overflow-hidden shadow-inner border border-pink-100">
              <img
                src={imageSrc}
                alt="Original Sabdha Birthday portrait"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <button
              onClick={() => setShowPeekModal(false)}
              className="mt-3 px-5 py-1.5 rounded-full bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
