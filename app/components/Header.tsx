"use client";

import { useState, useEffect } from "react";
import StudentFormModal from "./StudentFormModal";
import { getClassroomBySection } from "../actions/classroom.action";

interface HeaderProps {
  studentCount?: number;
  onReset?: () => void;
  onStartRandomizer?: () => void;
  section?: string;
}

function Header({ studentCount = 0, onReset, onStartRandomizer, section }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomId, setClassroomId] = useState<string | null>(null);

  useEffect(() => {
    if (section) {
      // Fetch classroom ID based on section using server action
      console.log("Section:", section);
      getClassroomBySection(section).then((result) => {
        if (result.success && result.data) {
          setClassroomId(result.data.id);
        }
      });
    }
  }, [section]);

  return (
    <>
      <header className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Classroom Randomizer</h1>
            <p className="text-sm text-gray-600 mt-1">Selecting randomly from {studentCount} students</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Reset Button */}
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset
            </button>

            {/* Start Randomizer Button */}
            <button
              onClick={onStartRandomizer}
              className="flex items-center gap-2 px-5 py-3 bg-teal-500 rounded-xl text-white font-medium hover:bg-teal-600 transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
              </svg>
              Start Randomizer
            </button>
          </div>
          <div>
            {/* Add Student Button */}
            {section && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3 bg-green-600 rounded-xl text-white font-medium hover:bg-green-700 transition-colors cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                Add Student
              </button>
            )}
          </div>
        </div>
      </header>

      <StudentFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classroomId={classroomId || ""} />
    </>
  );
}

export default Header;
