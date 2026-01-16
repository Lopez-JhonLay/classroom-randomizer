"use client";

import { useState, useEffect } from "react";
import { createStudent, updateStudent, getStudentById, deleteStudent } from "../actions/student.action";

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroomId: string;
  onStudentAdded?: () => void;
  studentId?: string | null;
}

export default function StudentFormModal({
  isOpen,
  onClose,
  classroomId,
  onStudentAdded,
  studentId,
}: StudentFormModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isEditMode = !!studentId;

  useEffect(() => {
    if (isOpen && studentId) {
      // Load student data when editing
      const loadStudent = async () => {
        setIsLoading(true);
        const result = await getStudentById(studentId);
        if (result.success && result.data) {
          setFirstName(result.data.firstName);
          setLastName(result.data.lastName);
          setPhoto(result.data.urlPhoto || "");
        } else {
          setMessage({ type: "error", text: result.error || "Failed to load student" });
        }
        setIsLoading(false);
      };
      loadStudent();
    } else if (isOpen) {
      // Reset form when adding new student
      setFirstName("");
      setLastName("");
      setPhoto("");
      setMessage(null);
    }
  }, [isOpen, studentId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    let result;
    if (isEditMode && studentId) {
      result = await updateStudent(studentId, {
        firstName,
        lastName,
        urlPhoto: photo || undefined,
      });
    } else {
      result = await createStudent({
        firstName,
        lastName,
        urlPhoto: photo || undefined,
        classroomId,
      });
    }

    if (result.success) {
      setMessage({
        type: "success",
        text: isEditMode ? "Student updated successfully!" : "Student added successfully!",
      });
      setFirstName("");
      setLastName("");
      setPhoto("");
      // Call the callback to refresh the student list
      if (onStudentAdded) {
        onStudentAdded();
      }
      // Close modal after a brief delay
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } else {
      setMessage({
        type: "error",
        text: result.error || (isEditMode ? "Failed to update student" : "Failed to add student"),
      });
    }

    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!studentId) return;

    const confirmed = window.confirm("Are you sure you want to delete this student? This action cannot be undone.");
    if (!confirmed) return;

    setIsLoading(true);
    setMessage(null);

    const result = await deleteStudent(studentId);

    if (result.success) {
      setMessage({ type: "success", text: "Student deleted successfully!" });
      // Call the callback to refresh the student list
      if (onStudentAdded) {
        onStudentAdded();
      }
      // Close modal after a brief delay
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to delete student" });
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? "Edit Student" : "Add New Student"}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              id="photo"
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Enter photo URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div className="flex gap-3 pt-4">
            {isEditMode ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-200"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none cursor-pointer"
            >
              {isLoading ? (isEditMode ? "Updating..." : "Adding...") : isEditMode ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
