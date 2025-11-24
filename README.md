<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Lumen Notes AI

An intelligent note-taking application powered by AI. Create, edit, and enhance your notes with multiple AI providers including Gemini, OpenAI, Anthropic, Ollama, and more.

## Features

- 🤖 **Multi-AI Provider Support** - Choose from Gemini, OpenAI, Anthropic, Ollama, Groq, or custom providers
- 📝 **Rich Text Editor** - Full markdown support with formatting toolbar
- 🎤 **Voice Mode** - Interact with AI using voice commands
- ⚡ **Slash Commands** - Quick AI actions with `/` commands
- 🌓 **Dark/Light Theme** - Comfortable viewing in any environment
- 💾 **Local Storage** - Your notes stay private on your device
- 🔄 **Real-time AI Assistance** - Get instant help while writing

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- API key for at least one AI provider (see [AI Provider Setup](#ai-provider-setup))

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd lumen-notes-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Run the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## AI Provider Setup

### Gemini (Google)

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local`: `GEMINI_API_KEY=your_key`
3. Select "Gemini" in AI Settings and choose your model

### OpenAI

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. In the app, go to AI Settings
3. Select "OpenAI" as provider
4. Enter your API key and choose a model (e.g., `gpt-4`, `gpt-3.5-turbo`)

### Anthropic (Claude)

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. In AI Settings, select "Anthropic"
3. Enter your API key and model name (e.g., `claude-3-opus-20240229`)

### Ollama (Local)

1. Install [Ollama](https://ollama.ai/) on your machine
2. Pull a model: `ollama pull llama2`
3. In AI Settings:
   - Select "Ollama" as provider
   - Set Base URL: `http://localhost:11434`
   - Enter model name (e.g., `llama2`)

### Groq

1. Get your API key from [Groq Console](https://console.groq.com/)
2. In AI Settings, select "Groq"
3. Enter your API key and model name (e.g., `mixtral-8x7b-32768`)

### Custom Provider

Configure any OpenAI-compatible API:
1. Select "Custom" in AI Settings
2. Enter your base URL
3. Add API key (if required)
4. Specify model name

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Self-Hosting Options

### Static Hosting (Vercel, Netlify, GitHub Pages)

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Set environment variables in your hosting dashboard

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:

```bash
docker build -t lumen-notes-ai .
docker run -p 3000:3000 lumen-notes-ai
```

### VPS/Server Deployment

1. Clone repository on your server
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Serve with nginx, Apache, or any static file server
5. Point server to the `dist/` directory

## Usage

### Creating Notes

1. Click the "+" button in the sidebar
2. Start typing in the editor
3. Notes auto-save to local storage

### AI Commands

Type `/` in the editor to open the command menu:
- `/improve` - Enhance your text
- `/summarize` - Create a summary
- `/expand` - Add more details
- `/fix` - Fix grammar and spelling

### Voice Mode

1. Click the microphone icon
2. Speak your query or command
3. AI responds with voice and text

### Exporting Notes

Use the toolbar options to:
- Download as Markdown
- Copy to clipboard
- Print notes

## Troubleshooting

### API Connection Issues

- Verify your API key is correct
- Check provider status pages
- For Ollama, ensure the service is running: `ollama serve`

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

Change the port in `vite.config.ts` or run:
```bash
npm run dev -- --port 3000
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

**View in AI Studio:** https://ai.studio/apps/drive/1MttTZBYk-JEI6JGa2lPTPIOlFUTDeQrp
