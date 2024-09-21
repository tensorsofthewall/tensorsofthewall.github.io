// app/components/projects.tsx
import React from 'react';
import NavLayout from './navlayout';

const projectsData = [
  {
    title: 'VidTune',
    description: 'Generative AI app for creating custom music for videos using Google Gemini and Facebook MusicGen.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Python'],
    githubLink: 'https://github.com/tensorsofthewall/vidtune',
    liveDemo: 'https://vidtune.hf.space',
  },
  {
    title: 'BetterSearch',
    description: 'AI-powered search tool leveraging local LLMs for enhanced file searching and content indexing.',
    techStack: ['Python', 'LLM', 'RAG'],
    githubLink: 'https://github.com/tensorsofthewall/bettersearch',
    liveDemo: '', // Leave blank if no live demo available
  },
];

// const Projects = () => {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 sm:items-start justify-center z-10">
//         <h1 className="text-3xl sm:text-5xl">Projects</h1>
//         <ul className="grid grid-cols-1 gap-8">
//           {projectsData.map((project, index) => (
//             <li
//               key={index}
//               className="bg-gray-800 p-6 rounded-lg"
//             >
//               <h2 className="text-2xl sm:text-3xl">{project.title}</h2>
//               <p className="text-lg sm:text-xl">{project.description}</p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {project.techStack.map((tech, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-700 rounded-lg px-2 py-1 text-sm sm:text-base"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {project.githubLink && (
//                   <a
//                     href={project.githubLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 rounded-lg px-2 py-1 text-sm sm:text-base"
//                   >
//                     GitHub
//                   </a>
//                 )}
//                 {project.liveDemo && (
//                   <a
//                     href={project.liveDemo}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-700 rounded-lg px-2 py-1 text-sm sm:text-base"
//                   >
//                     Live Demo
//                   </a>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };


const Projects = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-500">
          Hello, World!
        </h1>
      </div>
    );
  };


export default () => {
    return (
    <NavLayout>
        <Projects />
    </NavLayout>
    )
};