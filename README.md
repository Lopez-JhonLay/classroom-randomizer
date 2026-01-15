# 🎲 Classroom Randomizer

A Next.js application for randomly selecting students from classrooms. Perfect for teachers who want to fairly choose students for questions, presentations, or activities.

## ✨ Features

- **Classroom Management**: Create and organize classrooms by grade and section
- **Student Profiles**: Add students with names and optional profile photos
- **Random Selection**: Animated randomizer that selects students with visual feedback
- **Winner Display**: Celebratory confetti animation when a student is selected
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Database Persistence**: All data stored securely in PostgreSQL via Prisma

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (or Neon serverless Postgres)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd classroom-randomizer
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a `.env` file in the root directory:

```env
DATABASE_URL="your-postgresql-connection-string"
```

4. Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
classroom-randomizer/
├── app/
│   ├── actions/              # Server actions for data operations
│   │   ├── classroom.action.ts
│   │   └── student.action.ts
│   ├── classroom/            # Classroom pages
│   │   └── [slug]/          # Dynamic classroom view
│   ├── components/           # React components
│   │   ├── ClassroomForm.tsx
│   │   ├── ClassroomGrid.tsx
│   │   ├── Header.tsx
│   │   ├── StudentFormModal.tsx
│   │   └── WinnerModal.tsx
│   └── generated/prisma/     # Generated Prisma client
├── lib/
│   └── prisma.ts            # Prisma client configuration
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## 🗄️ Database Schema

The application uses two main models:

**Classroom**

- `id`: Unique identifier
- `grade`: Grade level (integer)
- `section`: Section name (unique)
- `students`: Related students

**Student**

- `id`: Unique identifier
- `firstName`: Student's first name
- `lastName`: Student's last name
- `urlPhoto`: Optional profile photo URL
- `classroomId`: Reference to classroom
- `classroom`: Related classroom

## 🎯 Usage

1. **Create a Classroom**: Enter grade and section on the home page
2. **Add Students**: Click "Add Student" in the classroom view to add students
3. **Random Selection**: Click the randomizer button to select a random student
4. **View Winner**: See the selected student with a celebratory animation
5. **Reset**: Click reset to clear the selection and start again

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4
- **UI Effects**: react-confetti
- **React**: React 19

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Prisma

The Prisma client is generated to `app/generated/prisma/`. To regenerate after schema changes:

```bash
npx prisma generate
npx prisma db push
```

### Database

This project uses PostgreSQL. Update the `DATABASE_URL` in your `.env` file with your database connection string.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is private and not licensed for public use.

## 🙏 Acknowledgments

Built with Next.js, Prisma, and Tailwind CSS for modern classroom management.
