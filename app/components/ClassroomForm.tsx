"use client";

import { useState } from "react";
import Link from "next/link";
import { createClassroom } from "../actions/classroom.action";

interface ClassroomFormProps {
	onSubmit?: (data: { grade: number; section: string }) => void;
}

export default function ClassroomForm({ onSubmit }: ClassroomFormProps) {
	const [grade, setGrade] = useState("");
	const [section, setSection] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (grade && section) {
			setIsLoading(true);
			setMessage(null);

			const result = await createClassroom({ grade: parseInt(grade), section });

			if (result.success) {
				setMessage({
					type: "success",
					text: "Classroom created successfully!",
				});
				setGrade("");
				setSection("");
				onSubmit?.({ grade: parseInt(grade), section });
			} else {
				setMessage({
					type: "error",
					text: result.error || "Failed to create classroom",
				});
			}

			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto p-6">
			<form
				onSubmit={handleSubmit}
				className="space-y-6"
			>
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
					<label
						htmlFor="grade"
						className="block text-sm font-medium text-gray-700"
					>
						Grade
					</label>
					<input
						id="grade"
						type="number"
						value={grade}
						onChange={(e) => setGrade(e.target.value)}
						placeholder="Enter grade (e.g., 7)"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
						required
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="section"
						className="block text-sm font-medium text-gray-700"
					>
						Section
					</label>
					<input
						id="section"
						type="text"
						value={section}
						onChange={(e) => setSection(e.target.value)}
						placeholder="Enter section (e.g., A)"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
						required
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none cursor-pointer"
				>
					{isLoading ? "Submitting..." : "Submit"}
				</button>

				<Link
					href="/classroom"
					className="block w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
				>
					View Classrooms
				</Link>
			</form>
		</div>
	);
}
