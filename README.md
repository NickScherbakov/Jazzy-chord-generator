# Jazzy Chord Generator

**Jazzy Chord Generator** is an interactive AI-powered musical tool designed specifically for jazz composers and musicians. It helps bridge the gap between automated generation and artistic intent using advanced modal analysis and voice-leading optimization.

### Key Features
*   **Chord Generation:** Creates complex jazz harmonies with specific functions (e.g., II-V-I), tensions (9, 11, 13), and professional voicing templates.
*   **AI Inspector:** Analyzes chord choices, provides the "why" behind every voicing, and suggests substitutions (like tritone subs).
*   **Real-time Visualization:** Offers multiple views to analyze your progression:
    *   **Tension Curves:** Visualizes the harmonic tension levels.
    *   **Guide Tone Paths:** Shows the movement of 3rds and 7ths.
    *   **Piano Roll:** A classic grid representation of notes.
*   **Melody Editor:** Draw guide notes to steer the harmonic engine, which automatically avoids collisions with your custom melody.
*   **Style & Mood Presets:** Supports a wide range of subgenres (Bebop, Cool Jazz, Bossa Nova, Neo-Soul, etc.) and emotional moods (Melancholic, Dreamy, Tense).

### Tech Stack
*   **React + TypeScript**
*   **Vite** for bundling
*   **Tailwind CSS** for a professional dark-themed UI
*   **Lucide React** for icons
*   **Gemini API (Google AI Studio)** for driving the harmonic engine

### User Experience
The interface features a central **Workspace** with a **Timeline** for managing chord sequences and an **Inspector** panel for fine-tuning individual chords or triggering AI optimizations.

---

## Run Locally

**Prerequisites:** Node.js

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure API Key:**
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. **Run the app:**
   ```bash
   npm run dev
   ```
