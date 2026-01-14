"use client";

import ClassroomForm from "./components/ClassroomForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Classroom Information</h1>
        <ClassroomForm onSubmit={(data) => console.log("Form submitted:", data)} />
      </div>
    </main>
  );
}
