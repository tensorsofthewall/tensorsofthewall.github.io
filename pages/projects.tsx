// app/components/projects.tsx
import React from 'react';

const projectsData = [
  {
    title: 'VidTune',
    description: 'Generative AI app for creating custom music for videos using Google Gemini and Facebook MusicGen.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Python'],
    githubLink: 'https://github.com/tensorsofthewall/vidtune',
    liveDemo: {
      type: 'iframe',
      src: 'https://sandeshb-vidtune-gradio.hf.space',
    },
  },
  {
    title: 'BetterSearch',
    description: 'AI-powered search tool leveraging local LLMs for enhanced file searching and content indexing.',
    techStack: ['Python', 'LLM', 'RAG'],
    githubLink: 'https://github.com/tensorsofthewall/bettersearch',
    liveDemo: null, // Leave blank if no live demo available
  },
];

const Projects = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start justify-center z-10">
        <h1 className="text-3xl sm:text-5xl">Projects</h1>
        <ul className="grid grid-cols-1 gap-8">
          {projectsData.map((project, index) => (
            <li
              key={index}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl sm:text-3xl">{project.title}</h2>
              <p className="text-lg sm:text-xl">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 rounded-lg px-2 py-1 text-sm sm:text-base"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 rounded-lg px-2 py-1 text-sm sm:text-base"
                  >
                    GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <div>
                    { project.liveDemo.type == 'iframe' ? (
                      <iframe src={project.liveDemo.src} style={{border:0}} width="850"
                      height="450" />
                    ) : project.liveDemo.type == 'video' ? (
                      <video width="320" height="240" controls preload="none">
                        <source src={project.liveDemo.src} type="video/mp4" />
                      </video>
                    ) : null }
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default () => {
    return (
      <Projects />
    )
};