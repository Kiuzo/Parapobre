# Parapobre

<div align="center">
  <img src="public/images/landing.png" alt="ParaPobre Banner" width="100%"/>
  
  ### Modern Movie Streaming Dashboard & Discovery Platform
  
  [![Next.js](https://img.shields.io/badge/Next.js-13+-%23000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18+-%2361DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-%2338B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
  [![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)]()
</div>

---

## � Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Parapobre** is a cutting-edge movie discovery client built for the modern web. It leverages the power of the **TMDB API** to provide real-time trending content, comprehensive movie details, and an immersive playback interface. Designed with performance and aesthetics in mind, it offers a seamless "Netflix-like" experience directly in the browser.

### Key Benefits

- **⚡ Zero Latency Navigation**: Instant page transitions powered by Next.js routing.
- **🎨 Premium UI/UX**: Cinematic dark mode interface with glassmorphism effects.
- **� Fully Responsive**: Optimized for desktops, tablets, and mobile devices.
- **🔒 Privacy Focused**: No user tracking or external analytics.

---

## Tech Stack

<div align="center">
  
| Core Framework | Styling & UI | Logic & Data |
|:--------------:|:------------:|:------------:|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | ![React Hooks](https://img.shields.io/badge/React_Hooks-61DAFB?style=for-the-badge&logo=react&logoColor=black) |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![FontAwesome](https://img.shields.io/badge/FontAwesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white) | ![TMDB API](https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedb&logoColor=white) |

</div>

---

## Key Features

### 🎬 Discovery & Playback
<table>
<tr>
<th width="30%">Feature</th>
<th width="70%">Description</th>
</tr>
<tr>
<td><strong>🔥 Trending Now</strong></td>
<td>Real-time feed of the most popular movies worldwide.</td>
</tr>
<tr>
<td><strong>🔍 Smart Search</strong></td>
<td>Instant search for movies, actors, and genres with debounced input.</td>
</tr>
<tr>
<td><strong>▶️ Multi-Source Player</strong></td>
<td>Watch official trailers or find streaming providers (YouTube, Pobreflix, Smartflix).</td>
</tr>
<tr>
<td><strong>📱 Responsive Layout</strong></td>
<td>Adaptive grid system that looks great on 4k screens or mobile phones.</td>
</tr>
</table>

### 👤 User Library
<table>
<tr>
<th width="30%">Feature</th>
<th width="70%">Description</th>
</tr>
<tr>
<td><strong>❤️ Favorites System</strong></td>
<td>One-click save to your personal library (Local Storage persistence).</td>
</tr>
<tr>
<td><strong>�️ Genre Filtering</strong></td>
<td>Quickly filter content by categories like Action, Horror, Comedy, etc.</td>
</tr>
<tr>
<td><strong>ℹ️ Rich Metadata</strong></td>
<td>Detailed views with ratings, runtime, release year, and synopsis.</td>
</tr>
</table>

---

## Screenshots

<div align="center">
  <img src="public/images/catalog.png" alt="Catalog View" width="100%" style="border-radius: 10px; margin-bottom: 20px;"/>
  <p><em>Browse an extensive catalog of trending movies with real-time search.</em></p>
  
  <br/>
  
  <img src="public/images/player.png" alt="Player View" width="100%" style="border-radius: 10px;"/>
  <p><em>Immersive player interface with trailer integration and streaming sources.</em></p>
</div>

---

## Installation

### System Requirements

| Component | Minimum Requirement |
|:-----------|:-----------------|
| Node.js | Version 18.0 or higher |
| Package Manager | NPM or Yarn |
| API Key | TMDB Account (Free) |

### Setup Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kiuzo/Parapobre.git
   cd Parapobre
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`

---


## License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

<div align="center">
  <p><strong>© 2025 Parapobre Project</strong></p>
  <p>by <a href="https://github.com/Kiuzo">Kiuzo</a></p>
  
  <br>
  
  <table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/kiuzo">
        <img src="https://github.com/kiuzo.png" width="100px;" alt="Kiuzo"/><br>
        <sub>
          <b>Kiuzo</b>
        </sub>
      </a>
      <br>
      <sub>Full Stack Developer</sub>
    </td>
  </tr>
</table>
  
</div>
