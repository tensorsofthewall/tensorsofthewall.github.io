# TensorsOfTheWall

Source code for [**TensorsOfTheWall**](https://www.tensorsofthewall.com), a personal website and blog built with NextJS.  
It highlights research, projects, publications, and blog posts focused on AI, computer vision, and software engineering.

---

## ✨ Features

- ⚡ **Next.js App Router** – Modern file-based routing and layouts
- 🧠 **TypeScript** – Type-safe, scalable codebase
- 🎨 **Tailwind CSS** – Utility-first styling
- 📄 **Dynamic Content** – Blog posts (from Notion), projects & publications (from JSON)
- 🔍 **SEO Optimized** – Metadata, Open Graph, Twitter cards, sitemap
- 📱 **Responsive Design** – Mobile-first, accessible across devices
- 🎞️ **Smooth Animations** – Built using [Motion for React](https://motion.dev/)
- 💬 **Comment System** – Blog posts integrate Giscus
- ♿ **Accessibility** – Semantic HTML and accessible navigation

---

## 🚀 Getting Started
> Navigate into the [`tensorsofthewall`](./tensorsofthewall/) folder before running the following commands.  
> *(Nix/Devenv setup coming soon.)*
### 1. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Development

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

### 4. Start Production Server

```bash
pnpm start
# or
npm start
# or
yarn start
```

---

## 🗂️ Project Structure

```
tensorsofthewall/
├── app/                  # App router pages and layouts
├── components/           # Reusable React components
├── lib/                  # Data fetching and utility functions
├── public/               # Static assets (images, icons, etc.)
├── styles/               # Global and component styles
├── tailwind.config.ts    # Tailwind CSS config
├── next.config.ts        # Next.js config
├── package.json
└── README.md
```

---

## 📡 Data Sources

- **Blog Posts**: Fetched from Notion via [`lib/notion`](./tensorsofthewall/lib/notion.ts).
- **Projects & Publications**: Loaded from JSON in [`public/data/resume_json.json`](./tensorsofthewall/public/data/resume_json.json).

---

## 🌐 SEO & Social

- Page-level metadata and Open Graph tags.
- Auto-generated sitemap (static + dynamic routes).
- Social media links and preview images supported.

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

This project adapts and improves the Notion renderer from  
[Samuel Kraft's NextJS Example Blog](https://github.com/samuelkraft/notion-blog-nextjs).

---

## 👤 Author

**Sandesh Bharadwaj**  
[https://www.tensorsofthewall.com](https://www.tensorsofthewall.com)

---