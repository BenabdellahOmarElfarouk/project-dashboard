# 🧩 Project Dashboard

A responsive and interactive project dashboard web application that allows users to browse, view details, and manage a collection of projects. Built with modern technologies including React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Getting Started

### Installation

  # 1. Clone the repository:

      git clone https://github.com/BenabdellahOmarElfarouk/project-dashboard.git
      cd project-dashboard

  #  2. Install Dependencies

      npm install

  #  3. Start the Development Server

      npm run dev

        ## Once the server is running, visit:
          🔗 http://localhost:5173


🔗 Live Demo

        👉 Live Demo: https://project-dashboard-seven.vercel.app

🛠️ Technologies Used

    React + TypeScript – Strongly typed component-based architecture.

    Vite – Lightning-fast dev server and build tool.

    Tailwind CSS – Utility-first CSS framework for responsive and modern design.

    Custom Hooks – Reusable logic for debounce and local storage.

    Local JSON Data – Simulated backend using static projects.json.



📁 Project Structure

                      project-dashboard/
                    ├── public/
                    ├── src/
                    │   ├── assets/
                    │   ├── components/
                    │   │   ├── ProjectCard.tsx
                    │   │   ├── ProjectCardSkeleton.tsx
                    │   │   ├── ProjectListItem.tsx
                    │   │   ├── ProjectModal.tsx
                    │   │   ├── SearchBar.tsx
                    │   │   └── Sidebar.tsx
                    │   ├── data/
                    │   │   └── projects.json
                    │   ├── hooks/
                    │   │   ├── useDebounce.ts
                    │   │   └── useLocalStorage.ts
                    │   ├── services/
                    │   │   └── projectService.ts
                    │   ├── types/
                    │   │   └── project.ts
                    │   ├── App.tsx
                    │   ├── index.css
                    │   ├── main.tsx
                    │   └── vite-env.d.ts
                    ├── .gitignore
                    ├── index.html
                    ├── package.json
                    ├── tsconfig.app.json
                    ├── tsconfig.json
                    ├── tsconfig.node.json
                    ├── vite.config.ts
                    └── README.md

📌 Notes

    ✅ Search with Debounce: The search bar uses a custom useDebounce hook to optimize performance by reducing the number of updates during fast typing.

    📂 Data Source: Project information is loaded from a local projects.json file for simplicity and mock backend simulation.

    🔍 Search & Filtering: Users can search projects by title using a responsive input component.

    🖼️ Image Fallback: A fallback image is displayed if the project image fails to load.

    💾 Collection Support: You can collect/un-collect projects using a button. State is managed dynamically using component props.

    🧠 Reusable Components: The app is split into logical and reusable components like ProjectCard, SearchBar, ProjectModal, etc.

    🎨 Responsive Design: Mobile-first and responsive layout using Tailwind CSS.

    🌀 Hover Interactions: Smooth hover effects on cards and modals using Tailwind transitions.

    ⚡ Performance-Optimized: Minimal and lazy-rendered components with clean state handling.

    🔧 Easily Extendable: Can be connected to a real API by updating projectService.ts and replacing the static JSON file.


📃 License

      This project is open source and available under the MIT License.
