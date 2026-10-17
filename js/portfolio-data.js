/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION OBJECT - HARSHAL SONSARE
 * ==============================================================================
 * 
 * ARCHITECTURAL RULE:
 * Under no circumstances should personal details, skill tags, or project items
 * be hardcoded into the HTML markup. All dynamic data is managed exclusively here.
 * 
 * Instructions:
 * 1. Update personal details, bio, and social links in `personalInfo`.
 * 2. Add or modify skills in the `skills` category arrays.
 * 3. Add or update your engineering projects in `projects`.
 * 4. Record work history and research milestones in `experience` and `education`.
 * 5. Configure contact form recipient and email in `contact`.
 * ==============================================================================
 */

const portfolioData = {
  // ----------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION & TELEMETRY
  // ----------------------------------------------------------------------------
  personalInfo: {
    name: "Harshal Sonsare",
    title: "Robotics & Artificial Intelligence Engineer",
    badge: "Embodied Intelligence & Autonomous Systems",
    subBadge: "ROS 2 // EMBODIED AI",
    location: "Pune / Bengaluru, India",
    tagline: "Architecting autonomous systems at the intersection of real-time control, embodied AI, and edge robotics.",
    shortBio: "Robotics and AI Engineer focused on developing intelligent physical systems. Specialized in autonomous navigation, real-time ROS 2 architectures, computer vision pipelines, and deep reinforcement learning for robotic perception and manipulation. Bridging rigorous mathematical control theory with high-performance embedded compute.",
    avatar: {
      initials: "HS",
      label: "Autonomous Systems Lab"
    },
    architectureStack: "ROS 2 Humble • NVIDIA Jetson • PyTorch",
    systemClock: "500 Hz RT Control",
    resumeUrl: "#", // Replace with your resume PDF path or Google Drive link
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com",
        icon: "github",
        handle: "github.com/harshalsonsare"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon: "linkedin",
        handle: "linkedin.com/in/harshalsonsare"
      },
      {
        platform: "Email",
        url: "mailto:harshal.sonsare@example.com",
        icon: "email",
        handle: "harshal.sonsare@example.com"
      }
    ],
    // High-impact telemetry stats displayed in the hero HUD
    telemetryStats: [
      {
        id: "stat-nodes",
        value: "25+",
        label: "ROS 2 Nodes Deployed",
        meta: "Real-time DDS Pub/Sub"
      },
      {
        id: "stat-control",
        value: "< 5ms",
        label: "Control Loop Latency",
        meta: "Deterministic MPC & PID"
      },
      {
        id: "stat-sim",
        value: "500+",
        label: "Simulation Hours",
        meta: "Gazebo & Isaac Sim"
      },
      {
        id: "stat-hw",
        value: "6+",
        label: "Hardware Platforms",
        meta: "AMR, Manipulators, Jetson"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // 2. ENGINEERING PHILOSOPHY PILLARS
  // ----------------------------------------------------------------------------
  philosophyPillars: [
    {
      title: "Deterministic Control",
      description: "Real-time state estimation, kinematic solvers, and low-latency MPC loops ensuring stable physical interactions.",
      icon: "control"
    },
    {
      title: "Embodied Perception",
      description: "Multi-modal sensor fusion fusing LiDAR, stereoscopic depth cameras, and IMUs for resilient spatial understanding.",
      icon: "perception"
    },
    {
      title: "Edge Acceleration",
      description: "Zero-copy shared memory IPC and TensorRT deep learning optimization targeting NVIDIA Jetson and ARM platforms.",
      icon: "chip"
    }
  ],

  // ----------------------------------------------------------------------------
  // 3. TECHNICAL COMPETENCY MATRIX (SKILLS)
  // ----------------------------------------------------------------------------
  skills: {
    categories: [
      {
        id: "robotics-autonomy",
        name: "Robotics & Autonomy",
        icon: "cpu-chip",
        description: "Kinematics, dynamics, path planning, and distributed robot middleware.",
        items: [
          { name: "ROS / ROS 2 (Humble/Iron)", level: "Expert", proficiency: 95 },
          { name: "Nav2 & SLAM (Cartographer/RTAB)", level: "Advanced", proficiency: 90 },
          { name: "MoveIt 2 & Kinematics", level: "Advanced", proficiency: 88 },
          { name: "Gazebo & Isaac Sim", level: "Advanced", proficiency: 85 },
          { name: "Model Predictive Control (MPC)", level: "Proficient", proficiency: 82 },
          { name: "Sensor Fusion (EKF / UKF)", level: "Advanced", proficiency: 88 },
          { name: "Trajectory Optimization", level: "Proficient", proficiency: 80 }
        ]
      },
      {
        id: "ai-vision",
        name: "AI & Computer Vision",
        icon: "eye",
        description: "Neural network architectures, visual odometry, and edge inference.",
        items: [
          { name: "PyTorch & Deep Learning", level: "Advanced", proficiency: 92 },
          { name: "OpenCV & Point Cloud (Open3D)", level: "Advanced", proficiency: 90 },
          { name: "YOLOv8 / Object Detection", level: "Expert", proficiency: 94 },
          { name: "Visual SLAM & Optical Flow", level: "Proficient", proficiency: 84 },
          { name: "Reinforcement Learning (PPO/SAC)", level: "Proficient", proficiency: 80 },
          { name: "TensorRT & ONNX Optimization", level: "Advanced", proficiency: 86 },
          { name: "Semantic Segmentation", level: "Proficient", proficiency: 82 }
        ]
      },
      {
        id: "embedded-hardware",
        name: "Embedded Systems & Hardware",
        icon: "microchip",
        description: "Edge computing architectures, actuators, sensors, and low-level protocols.",
        items: [
          { name: "NVIDIA Jetson (Orin / Xavier)", level: "Expert", proficiency: 92 },
          { name: "STM32 & ARM Cortex-M", level: "Advanced", proficiency: 85 },
          { name: "CAN Bus, I2C, SPI & UART", level: "Advanced", proficiency: 90 },
          { name: "LiDAR & Intel RealSense", level: "Expert", proficiency: 94 },
          { name: "Motor Drivers & BLDC Control", level: "Proficient", proficiency: 82 },
          { name: "FreeRTOS & Real-Time OS", level: "Proficient", proficiency: 80 },
          { name: "PCB Design (KiCad basics)", level: "Familiar", proficiency: 70 }
        ]
      },
      {
        id: "languages-toolchain",
        name: "Languages & Toolchain",
        icon: "code-bracket",
        description: "Core programming languages, containerization, and build systems.",
        items: [
          { name: "Modern C++ (14 / 17 / 20)", level: "Expert", proficiency: 95 },
          { name: "Python (NumPy, SciPy, Numba)", level: "Expert", proficiency: 95 },
          { name: "Linux / Ubuntu & Shell Scripting", level: "Expert", proficiency: 92 },
          { name: "Docker & Containerization", level: "Advanced", proficiency: 88 },
          { name: "CMake & Colcon Build", level: "Expert", proficiency: 90 },
          { name: "Git, GitHub Actions & CI/CD", level: "Advanced", proficiency: 86 },
          { name: "MATLAB & Simulink", level: "Proficient", proficiency: 80 }
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // 4. PROJECTS SHOWCASE (DYNAMICALLY RENDERED)
  // ----------------------------------------------------------------------------
  // Fields:
  // - id: unique string
  // - title: project headline
  // - tagline: brief hook
  // - category: filter tag ('robotics' | 'ai-vision' | 'embedded' | 'control')
  // - description: comprehensive technical breakdown
  // - highlights: bullet points of notable engineering achievements
  // - techStack: array of badges
  // - githubLink: code repository link
  // - liveDemo: live site or video demonstration link
  // - mediaPlaceholder: visual representation metadata
  // - featured: boolean to emphasize in showcase
  // ----------------------------------------------------------------------------
  projects: [
    {
      id: "project-amr-slam",
      title: "Autonomous Mobile Robot (AMR) 3D Navigation & SLAM",
      tagline: "Full-stack ROS 2 navigation stack with LiDAR-Visual inertial odometry in dynamic warehouse environments.",
      category: "robotics",
      featured: true,
      description: "Architected a custom autonomous mobile robot running ROS 2 Humble. Integrated 2D/3D LiDAR with dual Intel RealSense D435i depth cameras through an Extended Kalman Filter (EKF) sensor fusion pipeline. Implemented Nav2 dynamic costmaps and TEB Local Planner for proactive obstacle avoidance around dynamic pedestrians and forklifts.",
      highlights: [
        "Achieved sub-3cm localization accuracy under aggressive dynamic lighting transitions.",
        "Integrated Cartographer SLAM with custom loop-closure heuristics for 10,000+ sq ft facilities.",
        "Engineered deterministic safety interlock node executing at 100 Hz on hardware micro-controller via CAN."
      ],
      techStack: ["ROS 2 Humble", "C++20", "Nav2", "Cartographer", "LiDAR", "Intel RealSense", "Docker"],
      githubLink: "https://github.com/harshalsonsare",
      liveDemo: "https://youtube.com",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
        badge: "AMR // NAV2",
        accentColor: "#00F0FF"
      },
      mediaPlaceholder: {
        type: "blueprint",
        badge: "AMR // NAV2",
        accentColor: "#00F0FF",
        pattern: "grid-mesh"
      }
    },
    {
      id: "project-manipulator-rl",
      title: "Deep RL for 6-DOF Robotic Arm Manipulation",
      tagline: "Sim-to-Real policy transfer for dynamic pick-and-place with vision-guided reinforcement learning.",
      category: "ai-vision",
      featured: true,
      description: "Trained an end-to-end Deep Reinforcement Learning (PPO/SAC) policy inside NVIDIA Isaac Sim to execute dynamic grasping of randomized, occluded objects. Leveraged domain randomization (lighting, friction, camera poses) to achieve seamless zero-shot Sim-to-Real transfer on physical 6-DOF robotic manipulator.",
      highlights: [
        "Zero-shot transfer achieved 92.4% physical grasping success rate across 50 novel household geometries.",
        "Optimized inference runtime down to 8.2ms using TensorRT on an edge NVIDIA Jetson AGX Orin.",
        "Implemented collision-free trajectory smoothing with MoveIt 2 Cartesian trajectory controllers."
      ],
      techStack: ["PyTorch", "Isaac Sim", "MoveIt 2", "Python", "TensorRT", "CUDA", "ROS 2"],
      githubLink: "https://github.com/harshalsonsare",
      liveDemo: "https://youtube.com",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
        badge: "MANIPULATOR // RL",
        accentColor: "#8B5CF6"
      },
      mediaPlaceholder: {
        type: "neural",
        badge: "MANIPULATOR // RL",
        accentColor: "#8B5CF6",
        pattern: "synapse-flow"
      }
    },
    {
      id: "project-edge-vision-odometry",
      title: "Edge-AI Visual Inertial Odometry & Defect Inspection",
      tagline: "Real-time edge perception system operating at 60 FPS on power-constrained embedded platforms.",
      category: "ai-vision",
      featured: true,
      description: "Designed a multi-threaded C++ edge computer vision system deployed on NVIDIA Jetson Orin Nano. Combines optical flow visual odometry with YOLOv8 fine-tuned for high-speed automated surface defect detection in automated production lines.",
      highlights: [
        "Sustained 60 FPS inference pipeline with zero frame drops using GStreamer and DeepStream SDK.",
        "Constructed custom CUDA kernel for low-latency image undistortion and Bayer demosaicing.",
        "Integrated zero-copy shared memory IPC for instantaneous IPC transmission to ROS 2 control nodes."
      ],
      techStack: ["Modern C++", "OpenCV", "TensorRT", "Jetson Orin", "DeepStream", "CUDA", "GStreamer"],
      githubLink: "https://github.com/harshalsonsare",
      liveDemo: "https://youtube.com",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
        badge: "EDGE AI // 60 FPS",
        accentColor: "#10B981"
      },
      mediaPlaceholder: {
        type: "vision",
        badge: "EDGE AI // 60 FPS",
        accentColor: "#10B981",
        pattern: "hud-telemetry"
      }
    },
    {
      id: "project-quadruped-mpc",
      title: "Quadruped Dynamic Locomotion & Convex MPC Controller",
      tagline: "Convex Model Predictive Control for agile terrain traversal and disturbance rejection on legged robots.",
      category: "control",
      featured: false,
      description: "Formulated a Convex Model Predictive Controller (MPC) combined with Whole-Body Impulse Control (WBC) for a 12-DOF quadruped robot. Solves quadratic programs in real-time at 500 Hz to generate optimal ground reaction forces across uneven surfaces, gravel, and stairs.",
      highlights: [
        "Real-time QP solver (OSQP) integration with execution latency under 1.8 milliseconds.",
        "Validated dynamic push-recovery resisting horizontal external impulses up to 25 N·s.",
        "Validated full kinematic simulations in Gazebo Fortress prior to hardware testbed integration."
      ],
      techStack: ["C++17", "Eigen3", "OSQP", "Gazebo", "State Estimation", "CANopen", "Linux RT-Preempt"],
      githubLink: "https://github.com/harshalsonsare",
      liveDemo: "https://youtube.com",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
        badge: "LEGGED // 500 Hz MPC",
        accentColor: "#F59E0B"
      },
      mediaPlaceholder: {
        type: "kinematics",
        badge: "LEGGED // 500 Hz MPC",
        accentColor: "#F59E0B",
        pattern: "kinematic-links"
      }
    },
    {
      id: "project-drone-autonomy",
      title: "GPS-Denied Aerial Autonomy & VIO Quadrotor Stack",
      tagline: "Autonomous indoor drone navigation leveraging stereo visual odometry and 3D octree mapping.",
      category: "robotics",
      featured: false,
      description: "Engineered an autonomous micro-aerial vehicle (MAV) navigation architecture tailored for GPS-denied environments like collapsed mines and warehouses. Uses PX4 Autopilot offboard mode coupled with PX4-ROS 2 bridges and Fast-Planner trajectory optimization.",
      highlights: [
        "Real-time 3D OctoMap volumetric occupancy generation on companion Raspberry Pi Compute Module 4.",
        "Implemented minimum snap trajectory generation with reactive obstacle avoidance in tight corridors.",
        "Safe return-to-home autonomous behavior upon optical sensor degradation."
      ],
      techStack: ["PX4 Autopilot", "ROS 2", "Fast-Planner", "OctoMap", "MAVROS", "Python/C++"],
      githubLink: "https://github.com/harshalsonsare",
      liveDemo: "https://youtube.com",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80",
        badge: "MAV // OFFBOARD",
        accentColor: "#38BDF8"
      },
      mediaPlaceholder: {
        type: "aerial",
        badge: "MAV // OFFBOARD",
        accentColor: "#38BDF8",
        pattern: "radar-sweep"
      }
    },
    {
      id: "project-ros2-hardware-bridge",
      title: "High-Throughput ROS 2 Hardware Abstraction & CAN Bridge",
      tagline: "Deterministic low-jitter embedded communication firmware for brushless motor drive arrays.",
      category: "embedded",
      featured: false,
      description: "Authored custom STM32 micro-ROS and CAN-FD bridge firmware interfacing multiple high-power brushless servo actuators with main high-level ROS 2 controller. Guarantees sub-millisecond jitter for closed-loop torque control.",
      highlights: [
        "Zero-allocation memory architecture ensuring zero RTOS priority inversion or heap fragmentation.",
        "Packaged custom ROS 2 ros2_control hardware interface plugin for seamless joint trajectory control.",
        "Comprehensive automated hardware-in-the-loop (HIL) test harness with automated CI validation."
      ],
      techStack: ["STM32", "micro-ROS", "ros2_control", "C++", "FreeRTOS", "CAN-FD", "Hardware-in-the-Loop"],
      githubLink: "https://github.com/harshalsonsare",
      liveDemo: "https://youtube.com",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1000&q=80",
        badge: "EMBEDDED // CAN-FD",
        accentColor: "#EC4899"
      },
      mediaPlaceholder: {
        type: "embedded",
        badge: "EMBEDDED // CAN-FD",
        accentColor: "#EC4899",
        pattern: "circuit-traces"
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. EXPERIENCE & RESEARCH TIMELINE
  // ----------------------------------------------------------------------------
  experience: [
    {
      role: "Robotics & Autonomous Systems Engineer",
      organization: "Advanced Robotics & Automation Systems",
      period: "2023 - Present",
      location: "Bengaluru, India",
      type: "Full-Time",
      description: "Spearheading development of next-generation autonomous industrial mobile robots (AMR) and manipulator integration.",
      contributions: [
        "Led migration of autonomous navigation stack from ROS 1 Noetic to ROS 2 Humble, reducing CPU utilization by 34% through zero-copy intra-process communications.",
        "Architected multi-sensor perception pipeline combining 3D LiDAR, stereoscopic depth, and IMU via UKF, improving localization stability in featureless corridors.",
        "Deployed fleets of 12+ AMRs across live industrial manufacturing facilities with 99.8% mission completion reliability.",
        "Mentored junior engineers in Modern C++ best practices, colcon workspace structuring, and clean unit testing."
      ],
      techUsed: ["ROS 2 Humble", "Modern C++", "Nav2", "LiDAR SLAM", "Docker", "Linux RT", "CANopen"]
    },
    {
      role: "AI & Robotics Research Fellow",
      organization: "Autonomous Systems & Intelligent Machines Lab",
      period: "2022 - 2023",
      location: "Pune, India",
      type: "Research",
      description: "Conducted applied research on deep reinforcement learning algorithms for contact-rich robotic manipulation tasks.",
      contributions: [
        "Formulated reward shaping curriculum for 6-DOF robotic manipulator to reliably insert connectors with sub-millimeter tolerances.",
        "Published findings on domain randomization techniques for sim-to-real transfer with physics-accurate simulators.",
        "Developed custom high-performance PyTorch bindings for real-time robotic joint controllers.",
        "Designed and 3D printed rapid modular end-effectors for experimental tactile sensor integration."
      ],
      techUsed: ["PyTorch", "Isaac Sim", "MoveIt 2", "Python", "Reinforcement Learning", "OpenCV"]
    },
    {
      role: "Embedded Systems & Control Systems Intern",
      organization: "Mechatronics & Embedded Innovations",
      period: "2021 - 2022",
      location: "Pune, India",
      type: "Internship",
      description: "Designed motor control firmware and digital sensor integration for autonomous ground testbeds.",
      contributions: [
        "Developed bare-metal C drivers for STM32 microcontrollers communicating via SPI and CAN with high-torque BLDC motor drivers.",
        "Implemented cascaded PID position and velocity controllers running synchronously at 1 kHz.",
        "Built automated telemetry dashboard using Python and WebSockets for real-time motor phase current visualization."
      ],
      techUsed: ["Embedded C", "STM32", "FreeRTOS", "CAN Bus", "PID Control", "KiCad", "Python"]
    }
  ],

  // ----------------------------------------------------------------------------
  // 6. EDUCATION & ACADEMIC CREDENTIALS
  // ----------------------------------------------------------------------------
  education: [
    {
      degree: "Bachelor of Technology (B.Tech) in Mechatronics & Robotics Engineering",
      institution: "Technological University",
      period: "2018 - 2022",
      location: "India",
      honors: "First Class with Distinction // Capstone Project of the Year",
      description: "Rigorous coursework in Classical & Modern Control Systems, Robot Kinematics & Dynamics, Machine Learning, Computer Vision, Digital Signal Processing, and Embedded Microcontrollers.",
      keyHighlights: [
        "Led University Autonomous Ground Vehicle team to Top 3 national placement in SAE Autonomous Design Challenge.",
        "Authored undergraduate thesis on 'Real-Time Edge Visual SLAM for Low-Cost Autonomous Explorers'."
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. CONTACT & COMMUNICATION CHANNELS
  // ----------------------------------------------------------------------------
  contact: {
    heading: "Initialize Communication",
    subheading: "Whether you're developing autonomous robots, edge AI platforms, or next-generation embodied intelligence systems, let's engineer something extraordinary together.",
    email: "harshal.sonsare@example.com",
    location: "Pune / Bengaluru, India",
    timeZone: "IST (UTC +5:30) // Global Remote Friendly",
    // Form submission endpoint (supports Formspree, Basin, Getform, or custom backend URL)
    // Leave blank ("") to trigger simulated instant telemetry feedback with mailto fallback
    formEndpoint: "",
    directSocials: [
      { name: "LinkedIn", url: "https://linkedin.com", label: "Connect professionally" },
      { name: "GitHub", url: "https://github.com", label: "Review source code & repositories" }
    ],
    quickNotice: "Available for full-time engineering roles, high-impact robotics consulting, and embodied AI collaborations."
  }
};

// Expose on global window object for standard browser scripts
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}

// Export for Node/CommonJS environments if ever imported into test runners
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
