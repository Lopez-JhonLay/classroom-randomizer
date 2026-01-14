import { getClassrooms } from "../actions/classroom.action";
import Link from "next/link";

async function Classroom() {
  const result = await getClassrooms();
  const classrooms = result.success && result.data ? result.data : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Classrooms</h1>

        {!result.success && (
          <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-lg mb-6">{result.error}</div>
        )}

        {classrooms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No classrooms found. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classrooms.map((classroom) => (
              <Link
                key={classroom.id}
                href={`/classroom/${classroom.section}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-blue-500 hover:border-blue-600 cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-medium mb-2">Grade</p>
                    <p className="text-4xl font-bold text-blue-600 mb-4">{classroom.grade}</p>
                    <p className="text-gray-600 text-sm font-medium mb-2">Section</p>
                    <p className="text-2xl font-semibold text-gray-800">{classroom.section}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Classroom;
