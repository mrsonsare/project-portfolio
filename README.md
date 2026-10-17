# Harshal Sonsare - Robotics & AI Engineer Portfolio

A clean, responsive, and futuristic portfolio website architected for Robotics and Artificial Intelligence engineering professionals.

## 🚀 Architectural Highlight: Strict Content Decoupling

Under no circumstances are personal details, skill taxonomy, or project items hardcoded into the HTML markup. All dynamic content is centralized in a single, heavily documented configuration object:

```
📁 js/portfolio-data.js
```

Editing `portfolio-data.js` automatically populates the entire user interface without touching any HTML or CSS files.

---

## 🛠️ Configuration Guide (`js/portfolio-data.js`)

Open `js/portfolio-data.js` in any text editor to customize:

### 1. Personal Information & Telemetry (`personalInfo`)
- **Name, Title, Tagline, & Short Bio**: Engineering introduction and background narrative.
- **Status Beacon**: `statusText` and `statusState` ('online' | 'busy' | 'away').
- **Social & Professional Profiles**: GitHub, LinkedIn, Email, Google Scholar.
- **HUD Metrics**: Real-time stats displayed on the hero card (e.g., ROS 2 nodes deployed, control loop latency, simulation hours).

### 2. Technical Skill Matrix (`skills`)
- Categorized into:
  - **Robotics & Autonomy** (ROS/ROS 2, MoveIt 2, Nav2, Gazebo, SLAM, MPC)
  - **AI & Computer Vision** (PyTorch, OpenCV, YOLOv8, Visual SLAM, RL, TensorRT)
  - **Embedded Systems & Hardware** (NVIDIA Jetson, STM32, CAN Bus, LiDAR, RealSense)
  - **Languages & Toolchain** (Modern C++, Python, Linux/Ubuntu, Docker, CMake)
- Each skill includes proficiency percentage and competence tier (`Expert`, `Advanced`, `Proficient`).

### 3. Project Showcase (`projects`)
Template array with intuitive fields:
```javascript
{
  id: "project-unique-id",
  title: "Project Title",
  tagline: "High-impact one-sentence technical hook.",
  category: "robotics", // 'robotics' | 'ai-vision' | 'control' | 'embedded'
  featured: true,
  description: "Detailed engineering narrative of the architecture...",
  highlights: [
    "Quantified achievement 1",
    "Quantified achievement 2"
  ],
  techStack: ["ROS 2 Humble", "C++20", "LiDAR", "Nav2"],
  githubLink: "https://github.com/your-username/repo",
  liveDemo: "https://youtube.com/watch?v=...",
  mediaPlaceholder: {
    type: "blueprint",
    badge: "AMR // NAV2",
    accentColor: "#00F0FF"
  }
}
```
*Note: If you clear the `projects` array, the showcase displays a sleek empty-state prompt with instructions.*

### 4. Career Progression (`experience` & `education`)
- Add career milestones, company names, role titles, date ranges, and bulleted technical contributions.

### 5. Communication Channels (`contact`)
- Configure direct contact email, location, timezone, and optional `formEndpoint` (e.g., [Formspree](https://formspree.io) or [Getform](https://getform.io) endpoint URL).

---

## 🎨 Design & Aesthetic Features

- **Theme**: Dark mode default with deep slate/charcoal background (`#0B0F19`) and electric cyan (`#00F0FF`), cobalt blue (`#3B82F6`), and cyber violet accents.
- **Kinematics & Neural Canvas**: Ambient, lightweight, 60 FPS particle graph that connects nodes and subtly interacts with cursor movement.
- **Interactive Competency Matrix**: Category filters and animated proficiency meter bars.
- **Accessible Project Modal**: Dialog with ARIA attributes, keyboard escape listener, and click-outside dismissal.
- **One-Click Email Copying**: Integrated clipboard copy button with feedback toast alert.
- **Mobile Responsive**: Fluid layout scaling smoothly from mobile (375px) to widescreen displays (1920px+).

---

## 💻 Local Development & Preview

Because this project uses vanilla HTML5, modern CSS, and JavaScript with zero build dependencies, you can run it immediately with any static file server:

### Option A: Python 3
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option B: Node.js (npx serve)
```bash
npx serve .
```

### Option C: Direct File
Simply double-click `index.html` to open it in Google Chrome, Firefox, Safari, or Microsoft Edge.

---

## 🚢 Deployment

Ready for instant deployment to free static hosting:
- **GitHub Pages**: Push this directory to a GitHub repository, go to **Settings > Pages**, and select the `main` branch.
- **Vercel / Netlify**: Connect repository or drag-and-drop the directory for immediate zero-config deployment.
