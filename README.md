# Chat Language Tool 🔠

A premium, casual chat language transliteration engine designed for digital communication. This tool allows users to type in Romanized script (English letters) and instantly convert it into native scripts like Kannada, Hindi, Telugu, Tamil, and Malayalam.

## ✨ Key Features

- **Context-Aware Transliteration:** Optimized for casual spoken styles and informal chat (WhatsApp-like nuances).
- **Dual Conversion Engines:**
  - **Local Engine:** Optimized for maximum speed and offline-first performance.
  - **External AI (Gemini):** High-quality, context-aware translation using the `gemini-3-flash` model.
- **Multilingual Support:** Support for 5 major Indian languages.
- **Modern UI/UX:** A sleek, minimal design with premium typography and full mobile responsiveness.
- **Fast Interaction:** Support for `Meta + Enter` (Mac) or `Ctrl + Enter` (Win/Linux) to trigger translation.

## 🚀 Tech Stack

### Frontend (`/client`)
- **React 19**
- **TypeScript**
- **Vite**
- **Axios** (API Requests)
- **Vanilla CSS** (Custom Design System)

### Backend (`/api`)
- **Express**
- **Bun** (Runtime)
- **Google Generative AI SDK** (for External AI engine)
- **Cors**

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed on your machine.
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/language-transliteration.git
    cd language-transliteration
    ```

2.  **Environment Setup:**
    Create a `.env` file in the `api/` directory:
    ```bash
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Start the Backend:**
    ```bash
    cd api
    bun install
    bun dev
    ```

4.  **Start the Frontend:**
    In a new terminal window:
    ```bash
    cd client
    bun install
    bun dev
    ```

The application will be available at `http://localhost:5173`.

## 🎨 Design System

The application follows a minimal, "paper-like" aesthetic:
- **Font Face:** `Instrument Serif` (Headers) and `DM Mono` (Interface).
- **Colors:**
  - Background: `#f5f2ec` (Beige/Cream)
  - Accent: `#c17d3c` (Terracotta/Amber)
  - Text: `#1a1814` (Dark Charcoal)

## 📄 License
MIT License
