"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import ClassroomGrid from "@/app/components/ClassroomGrid";
import Header from "@/app/components/Header";
import WinnerModal from "@/app/components/WinnerModal";
import StudentFormModal from "@/app/components/StudentFormModal";
import { getStudentsByClassroom } from "@/app/actions/student.action";
import { getClassroomBySection } from "@/app/actions/classroom.action";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  urlPhoto: string | null;
  classroomId: string;
}

function Page() {
  const params = useParams();
  const section = params.slug as string;

  const [students, setStudents] = useState<Student[]>([]);
  const [classroomId, setClassroomId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const classroomResult = await getClassroomBySection(section);
    if (classroomResult.success && classroomResult.data) {
      setClassroomId(classroomResult.data.id);
      const studentsResult = await getStudentsByClassroom(classroomResult.data.id);
      if (studentsResult.success && studentsResult.data) {
        setStudents(studentsResult.data);
      }
    }
    setIsLoading(false);
  }, [section]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const selectedStudent = useMemo(() => {
    if (selectedId === null) return null;
    const student = students.find((s) => s.id === selectedId);
    if (!student) return null;
    return {
      name: `${student.firstName} ${student.lastName}`,
      avatar: student.urlPhoto || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    };
  }, [selectedId, students]);

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setShowWinner(false);
  }, []);

  const handleStartRandomizer = useCallback(() => {
    if (isRandomizing || students.length === 0) return;

    setShowWinner(false);
    setIsRandomizing(true);

    // Animate through random students for effect
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * students.length);
      setSelectedId(students[randomIndex].id);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        // Final random selection
        const finalIndex = Math.floor(Math.random() * students.length);
        setSelectedId(students[finalIndex].id);
        setIsRandomizing(false);
        // Show winner modal after a brief delay
        setTimeout(() => setShowWinner(true), 300);
      }
    }, 200);
  }, [isRandomizing, students]);

  const handleCloseWinner = useCallback(() => {
    setShowWinner(false);
  }, []);

  const handleStudentClick = useCallback(
    (studentId: string) => {
      // Don't allow editing during randomization
      if (isRandomizing) return;

      setEditingStudentId(studentId);
      setIsModalOpen(true);
    },
    [isRandomizing]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingStudentId(null);
  }, []);

  return (
    <div>
      <Header
        studentCount={students.length}
        onReset={handleReset}
        onStartRandomizer={handleStartRandomizer}
        section={section}
        onStudentAdded={fetchData}
      />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading students...</p>
          </div>
        </div>
      ) : (
        <ClassroomGrid
          students={students}
          selectedId={selectedId}
          isRandomizing={isRandomizing}
          onStudentClick={handleStudentClick}
        />
      )}

      {selectedStudent && (
        <WinnerModal
          name={selectedStudent.name}
          avatar={selectedStudent.avatar}
          isVisible={showWinner}
          onClose={handleCloseWinner}
        />
      )}

      {classroomId && (
        <StudentFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          classroomId={classroomId}
          onStudentAdded={fetchData}
          studentId={editingStudentId}
        />
      )}
    </div>
  );
}

export default Page;
