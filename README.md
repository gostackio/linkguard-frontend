# LinkGuard Frontend

## 🚀 Never Lose Affiliate Revenue to Broken Links

LinkGuard monitors your affiliate links 24/7, alerts you when they break, and provides AI-powered replacement suggestions.

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool for fast development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Chart.js** - Data visualization
- **React Hot Toast** - Notifications

## Features

- ✅ Real-time link monitoring dashboard
- ✅ Bulk link upload via CSV
- ✅ Link health scoring system
- ✅ Revenue loss tracking
- ✅ Email & Slack notifications
- ✅ AI-powered replacement suggestions
- ✅ Detailed analytics and reporting
- ✅ Multi-tier subscription management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on port 8000

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gostackio/linkguard-frontend.git
cd linkguard-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

```
linkguard-frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts (Auth, etc.)
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## API Integration

The frontend connects to the LinkGuard backend API. Main endpoints:

- `/api/auth/*` - Authentication
- `/api/links/*` - Link management
- `/api/alerts/*` - Alert notifications
- `/api/analytics/*` - Dashboard analytics
- `/api/subscription/*` - Billing & subscriptions

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: `/api`)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy with default settings

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - GoStack Technologies

## Support

For issues and questions, please open a GitHub issue.

---

**Built with ❤️ by GoStack Technologies**

*Part of the Million-Dollar Micro-SaaS Challenge*
