"use client";

import { useState, useCallback, useMemo } from "react";
import ClassroomGrid from "@/app/components/ClassroomGrid";
import Header from "@/app/components/Header";
import WinnerModal from "@/app/components/WinnerModal";

function Page() {
  const studentCount = 50;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [showWinner, setShowWinner] = useState(false);

  const selectedStudent = useMemo(() => {
    if (selectedId === null) return null;
    const names = [
      "Emma W.",
      "Liam J.",
      "Noah M.",
      "Olivia P.",
      "Ava R.",
      "Elijah B.",
      "James D.",
      "William T.",
      "Lucas H.",
      "Mia S.",
      "Benjamin K.",
      "Henry L.",
      "Amelia V.",
      "Harper G.",
      "Evelyn C.",
      "Alexander M.",
      "Sofia R.",
      "Jackson P.",
      "Isabella T.",
      "Mason L.",
    ];
    const index = selectedId - 1;
    return {
      name: names[index % names.length] || `Student ${selectedId}`,
      avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    };
  }, [selectedId]);

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setShowWinner(false);
  }, []);

  const handleStartRandomizer = useCallback(() => {
    if (isRandomizing) return;

    setShowWinner(false);
    setIsRandomizing(true);

    // Animate through random students for effect
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomId = Math.floor(Math.random() * studentCount) + 1;
      setSelectedId(randomId);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        // Final random selection
        const finalId = Math.floor(Math.random() * studentCount) + 1;
        setSelectedId(finalId);
        setIsRandomizing(false);
        // Show winner modal after a brief delay
        setTimeout(() => setShowWinner(true), 300);
      }
    }, 200);
  }, [isRandomizing, studentCount]);

  const handleCloseWinner = useCallback(() => {
    setShowWinner(false);
  }, []);

  return (
    <div>
      <Header studentCount={studentCount} onReset={handleReset} onStartRandomizer={handleStartRandomizer} />
      <ClassroomGrid studentCount={studentCount} selectedId={selectedId} isRandomizing={isRandomizing} />
      {selectedStudent && (
        <WinnerModal
          name={selectedStudent.name}
          avatar={selectedStudent.avatar}
          isVisible={showWinner}
          onClose={handleCloseWinner}
        />
      )}
    </div>
  );
}

export default Page;
