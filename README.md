# AI-Powered Study Companion 🧠📚

A modern, highly responsive React application designed to natively map your entire academic lifecycle. From granular topic notes and deadline-driven task scheduling, to an integrated simulated AI Study Assistant, this platform provides an all-in-one ecosystem for active learning and seamless automated revision.

## 🚀 Key Features

- **Subject & Topic Architecture:** Hierarchically structure your courses. Add multi-line study notes directly to topics and track their progress (`not-started`, `in-progress`, `completed`) in real-time.
- **Advanced Task Management:** A robust To-Do framework supporting custom priorities (High/Med/Low) and hard chronological deadlines.
  - *Multi-Filter Engine:* Simultaneously funnel tasks via keyword search, exact Subject mapping, and Status (Pending/Completed/Overdue).
  - *Dynamic Sorting:* Re-organize tasks on-the-fly alphabetically, or strictly by Deadline proximity and Priority weighting.
- **Automated Revision Planner:** Marking a study task as "Completed" instantly registers a shadow replica in the Revision Planner schedule, actively pacing custom spaced-repetition exactly 3 days in the future.
- **AI Multi-Mode Assistant:** A beautifully structured (mock) AI pipeline capable of parsing broad subjects and generating contextual structural matrices:
  - *Summaries:* Yields academic definitions, bulleted key points, and scenario examples.
  - *Practice Questions:* Discovers 5 chronologically scaled (Easy/Medium/Hard) questions to test recall.
  - *Flashcards:* Creates dynamic CSS-grid UI functional study cards mapped via discrete Q/A matrices.
- **Dynamic Analytics Dashboard:** Visualizes your study lifecycle in real time cleanly mapped using `recharts` to produce Subject Bar Charts and Status Distribution Pie Charts alongside core metric widgets.
- **Persistent LocalStorage Caching:** You will never lose your data! The engine hooks cleanly into your browser's persistent `localStorage`, tracking updates and preventing data loss down to the keystroke.

## 🛠️ Technology Stack

- **Framework:** React 19+ (Vite)
- **Routing:** React Router v7
- **Styling:** Custom native Responsive CSS (Light/Dark mode dynamic syncing)
- **Data Visualization:** Recharts
- **State Management:** Advanced React Context API

## 📥 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tusharcode007/rst-AI-Powered-Study-Companion-.git
   cd rst-AI-Powered-Study-Companion-
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
4. **Access the application locally at:** `http://localhost:5173/`
