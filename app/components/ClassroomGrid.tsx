import Image from "next/image";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  urlPhoto: string | null;
  classroomId: string;
}

interface ClassroomGridProps {
  students: Student[];
  selectedId?: string | null;
  isRandomizing?: boolean;
}

function ClassroomGrid({ students, selectedId = null, isRandomizing = false }: ClassroomGridProps) {
  const studentCount = students.length;

  // If no students, show empty state
  if (studentCount === 0) {
    return (
      <div className="p-8 bg-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No students in this classroom yet.</p>
          <p className="text-gray-400 text-sm mt-2">Add students using the "Add Student" button above.</p>
        </div>
      </div>
    );
  }

  const studentsWithSelection = students.map((student) => ({
    ...student,
    isSelected: selectedId === student.id,
    displayName: `${student.firstName} ${student.lastName.charAt(0)}.`,
    avatar: student.urlPhoto || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
  }));

  // Split students evenly between two columns (left gets extra if odd)
  const halfCount = Math.ceil(studentCount / 2);
  const leftGroup = studentsWithSelection.slice(0, halfCount);
  const rightGroup = studentsWithSelection.slice(halfCount);

  const skinColor = "#F5D0B0";

  // Only show raised hand when not randomizing (final selection)
  const showRaisedHand = !isRandomizing;

  const renderStudent = (student: (typeof studentsWithSelection)[0]) => (
    <div
      key={student.id}
      className={`flex flex-col items-center p-1 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer ${
        student.isSelected ? "drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]" : ""
      }`}
    >
      <div className="relative flex flex-col items-center">
        <img
          src={student.avatar}
          alt={student.displayName}
          width={72}
          height={72}
          className="rounded-full border-4 border-white shadow-md object-cover z-10"
        />
        <svg width="100" height="50" viewBox="-5 0 110 55" className="-mt-4 z-20" style={{ overflow: "visible" }}>
          <ellipse cx="12" cy="28" rx="8" ry="18" fill={skinColor} transform="rotate(-15 12 28)" />
          {student.isSelected && showRaisedHand ? (
            <>
              <ellipse cx="95" cy="5" rx="7" ry="16" fill={skinColor} transform="rotate(-10 95 5)" />
              <ellipse cx="100" cy="-15" rx="6" ry="14" fill={skinColor} transform="rotate(5 100 -15)" />
              <ellipse cx="102" cy="-32" rx="7" ry="6" fill={skinColor} />
              <ellipse cx="96" cy="-38" rx="2" ry="5" fill={skinColor} />
              <ellipse cx="100" cy="-40" rx="2" ry="6" fill={skinColor} />
              <ellipse cx="104" cy="-40" rx="2" ry="6" fill={skinColor} />
              <ellipse cx="108" cy="-38" rx="2" ry="5" fill={skinColor} />
              <ellipse cx="93" cy="-32" rx="2" ry="4" fill={skinColor} transform="rotate(-30 93 -32)" />
            </>
          ) : (
            <ellipse cx="88" cy="28" rx="8" ry="18" fill={skinColor} transform="rotate(15 88 28)" />
          )}
          <path
            d="M 20 5 Q 10 15 15 45 Q 20 55 50 55 Q 80 55 85 45 Q 90 15 80 5 Q 65 10 50 10 Q 35 10 20 5 Z"
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
          <path d="M 38 5 L 32 20 L 42 18 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <path d="M 62 5 L 68 20 L 58 18 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="50" y1="18" x2="50" y2="50" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="50" cy="25" r="2" fill="#1F2937" />
          <circle cx="50" cy="35" r="2" fill="#1F2937" />
          <circle cx="50" cy="45" r="2" fill="#1F2937" />
        </svg>
        <div className="w-28 h-6 bg-slate-200 rounded-xl -mt-2 shadow-sm border border-slate-300"></div>
      </div>
      <div
        className={`mt-1 px-3 py-0.5 rounded-full text-xs font-medium ${
          student.isSelected ? "bg-teal-400 text-white" : "bg-white text-gray-700 shadow-sm"
        }`}
      >
        {student.displayName}
      </div>
    </div>
  );

  return (
    <div className="p-2 bg-slate-100 min-h-screen">
      {/* 2 outer columns with gap between them */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column - dynamic grid */}
        <div className="grid grid-cols-5 gap-1">{leftGroup.map(renderStudent)}</div>

        {/* Right column - dynamic grid */}
        <div className="grid grid-cols-5 gap-1">{rightGroup.map(renderStudent)}</div>
      </div>
    </div>
  );
}

export default ClassroomGrid;
