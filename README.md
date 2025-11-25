# Micro Frontend Project: Container App + Chart App

A complete micro frontend architecture with two applications:

- **container-app** - Host application (Port 5000)
- **chart-app** - Remote micro frontend with chart components (Port 5001)

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│       Container App (Host)              │
│         Port: 5000                      │
│                                         │
│  ├─ React 18 + TypeScript              │
│  ├─ Chakra UI v3                       │
│  └─ Module Federation (Host)           │
│                                         │
│      Dynamically Loads ↓               │
└─────────────────────────────────────────┘
                 │
                 │ HTTP
                 ↓
┌─────────────────────────────────────────┐
│       Chart App (Remote)                │
│         Port: 5001                      │
│                                         │
│  ├─ React 18 + TypeScript              │
│  ├─ Chakra UI v3                       │
│  ├─ Recharts                           │
│  └─ Module Federation (Remote)         │
│                                         │
│  Exposes:                               │
│  ├─ Dashboard                           │
│  ├─ BarChart                            │
│  ├─ LineChart                           │
│  └─ PieChart                            │
└─────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Start Chart App (Remote - Must start first!)

```bash
cd chart-app
npm run dev
```

The chart-app will run at `http://localhost:5001`

### 2. Start Container App (Host)

In a **new terminal**:

```bash
cd container-app
npm run dev
```

The container-app will run at `http://localhost:5000`

### 3. Open Browser

Navigate to `http://localhost:5000` to see the container app loading charts from the chart-app.

## 📦 Project Structure

```
micro-fe/
├── container-app/              # Host Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── provider.tsx
│   │   │   └── HostComponent.tsx
│   │   ├── types/
│   │   │   └── remote-modules.d.ts  # TypeScript types for remotes
│   │   ├── App.tsx             # Consumes chart-app components
│   │   └── main.tsx
│   ├── vite.config.ts          # Federation config (host)
│   ├── package.json
│   └── tsconfig.json
│
├── chart-app/                  # Remote Micro Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── provider.tsx
│   │   │   ├── BarChart.tsx    # Exposed
│   │   │   ├── LineChart.tsx   # Exposed
│   │   │   ├── PieChart.tsx    # Exposed
│   │   │   └── Dashboard.tsx   # Exposed
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts          # Federation config (remote)
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                   # This file
```

## 🎯 Features

### Container App (Host)

- ✅ Consumes chart components from chart-app
- ✅ Lazy loading with Suspense
- ✅ Loading states with Chakra UI
- ✅ Chakra UI v3 for styling
- ✅ TypeScript support for remote modules

### Chart App (Remote)

- ✅ Exports 4 chart components
- ✅ Built with Recharts library
- ✅ Styled with Chakra UI v3
- ✅ Can run standalone or as remote
- ✅ Full dashboard with analytics

## 🔧 Module Federation Configuration

### Container App (vite.config.ts)

```typescript
federation({
  name: "containerApp",
  remotes: {
    chartApp: "http://localhost:5001/assets/remoteEntry.js",
  },
  shared: ["react", "react-dom", "@chakra-ui/react"],
});
```

### Chart App (vite.config.ts)

```typescript
federation({
  name: "chartApp",
  filename: "remoteEntry.js",
  exposes: {
    "./BarChart": "./src/components/BarChart",
    "./LineChart": "./src/components/LineChart",
    "./PieChart": "./src/components/PieChart",
    "./Dashboard": "./src/components/Dashboard",
  },
  shared: ["react", "react-dom", "@chakra-ui/react"],
});
```

## 📊 Exposed Components

### Chart App Exposes:

1. **Dashboard** - Complete analytics dashboard with stats and charts
2. **BarChart** - Sales & revenue bar chart
3. **LineChart** - User growth line chart
4. **PieChart** - Traffic sources pie chart

### Usage in Container App:

```typescript
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("chartApp/Dashboard"));
const BarChart = lazy(() => import("chartApp/BarChart"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
      <BarChart />
    </Suspense>
  );
}
```

## 🛠️ Development Commands

### Container App

```bash
cd container-app

npm run dev      # Start dev server (port 5000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Chart App

```bash
cd chart-app

npm run dev      # Start dev server (port 5001)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Technologies Used

### Both Apps

- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool
- **Chakra UI v3** - Component library
- **Module Federation** - Micro frontend architecture

### Chart App Specific

- **Recharts 2.13** - Chart library
- Responsive charts with Chakra UI styling

## 🔄 How It Works

1. **Chart App starts** on port 5001 and exposes components via Module Federation
2. **Container App starts** on port 5000 and configures chart-app as a remote
3. **At runtime**, container-app dynamically loads chart components from chart-app
4. **Shared dependencies** (React, React-DOM, Chakra UI) are loaded only once
5. **Both apps** can be developed and deployed independently

## 📝 Important Notes

### Development Order

⚠️ **Always start chart-app BEFORE container-app**

- Chart-app must be running for container-app to load remote components
- If chart-app is not running, you'll see loading states in container-app

### Shared Dependencies

Both apps share:

- `react` and `react-dom` - Ensures single React instance
- `@chakra-ui/react` - Prevents duplicate Chakra UI instances

### TypeScript Support

The container-app has TypeScript declarations for remote modules in:
`src/types/remote-modules.d.ts`

## 🚢 Production Deployment

### 1. Build Both Apps

```bash
# Build chart-app first
cd chart-app
npm run build

# Build container-app
cd ../container-app
npm run build
```

### 2. Deploy Chart App

Deploy `chart-app/dist` to a CDN or static host (e.g., Vercel, Netlify)

### 3. Update Container App Config

Update `container-app/vite.config.ts` with production URL:

```typescript
remotes: {
  chartApp: "https://your-chart-app.com/assets/remoteEntry.js";
}
```

### 4. Deploy Container App

Deploy `container-app/dist` to your hosting provider

## 🐛 Troubleshooting

### Container app shows "Loading..." forever

- **Solution**: Make sure chart-app is running on port 5001
- Check: `http://localhost:5001/assets/remoteEntry.js` should be accessible

### Module not found errors

- **Solution**: Verify the remote URL in container-app's `vite.config.ts`
- Ensure exposed module names match import paths

### TypeScript errors

- **Solution**: Check `remote-modules.d.ts` for type declarations
- Restart TypeScript server: Cmd+Shift+P → "TypeScript: Restart TS Server"

### Port already in use

- **Chart App**: Edit port in `chart-app/vite.config.ts`
- **Container App**: Edit port in `container-app/vite.config.ts`
- Update remote URL in container-app if chart-app port changes

### Chakra UI style conflicts

- Both apps share Chakra UI to prevent duplicate styles
- Ensure both apps use the same Chakra UI version

## 📚 Learn More

- [Vite Module Federation Plugin](https://github.com/originjs/vite-plugin-federation)
- [Chakra UI Documentation](https://www.chakra-ui.com/)
- [Recharts Documentation](https://recharts.org/)
- [Module Federation Concepts](https://webpack.js.org/concepts/module-federation/)

## ✨ What's Next?

### Extend Chart App

- Add more chart types (Area, Scatter, Radar)
- Add real-time data updates
- Add chart customization options

### Extend Container App

- Add more remote micro frontends
- Add routing between different sections
- Add authentication/authorization

### Add More Micro Frontends

Create additional micro frontends following the same pattern:

- User management app
- Settings app
- Notification app
- etc.

## 🎉 Success!

You now have a working micro frontend architecture with:

- ✅ Independent development
- ✅ Independent deployment
- ✅ Shared dependencies
- ✅ Runtime integration
- ✅ Type safety

Start both apps and see the magic of micro frontends! 🚀
