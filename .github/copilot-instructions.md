# GitHub Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is **NFT Clan Vaults** - a competitive React frontend for an Aptos NFT game where users mint NFTs, join themed clans (collections), stake their NFTs, and see collection activity update live. It feels like a competitive mobile game, not DeFi.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for bundling
- **TailwindCSS** for styling (dark neon theme, glassmorphism)
- **Framer Motion** for animations and micro-interactions
- **Zustand** for lightweight global state management
- **React Query** for data fetching and caching
- **React Hot Toast** for notifications
- **React Router** for navigation
- **Mock services** for APIs and WebSocket connections

## Code Style & Patterns

### Component Structure

- Use functional components with TypeScript
- Props interfaces should be defined inline or as separate types
- Use `React.FC` for component typing
- Export components as default exports

### State Management

- Use Zustand stores for global state (user, clans, NFTs, live feed)
- Use React Query hooks for server state
- Local component state with useState for UI-specific state

### Styling

- Use TailwindCSS utility classes exclusively
- Follow the neon arcade + premium fintech theme
- Background gradient: `#1a0033 → #000000`
- Primary color: `#9333ea` (neon purple)
- Accent color: `#ec4899` (neon pink)
- Success color: `#10b981`
- Gold (rare): `#fbbf24`

### Animations

- Use Framer Motion for all animations
- Import animation utilities from `src/utils/animations.ts`
- Follow the defined animation variants (SLIDE_UP_VARIANTS, FADE_VARIANTS, etc.)
- Use stagger animations for lists and grids

### Mock Data

- All data comes from mock services in `src/mocks/`
- APIs simulate network latency with setTimeout
- WebSocket events are generated automatically every 3-10 seconds
- Console.log all mock operations for debugging

### File Organization

```
src/
  components/
    cards/           # NFTCard, ClanCard
    common/          # Loading, Modal, Button
    charts/          # Recharts components
  hooks/             # React Query hooks
  mocks/             # Mock APIs and WebSocket
  pages/             # Route components
  store/             # Zustand stores
  types/             # TypeScript interfaces
  utils/             # Helper functions
```

## Game Context & Terminology

- **Clans** = NFT collections with themes (Cyber Dragons, Neon Ninjas, etc.)
- **Staking** = Locking NFTs to contribute to clan power
- **Momentum** = Clan activity status (hot 🔥, new ✨, value 💎, steady 📊)
- **Arena** = The overall game environment
- **Warriors** = Users/players
- **Vault** = User's NFT inventory and staking interface

## UI/UX Guidelines

- **Mobile-first** responsive design
- **Glassmorphism** cards with backdrop-blur and translucent backgrounds
- **Neon glows** on hover states and active elements
- **Count-up animations** for all numeric displays
- **Loading states** for every data fetch
- **Empty states** with friendly messaging
- **Error boundaries** with retry options
- **Accessibility** with focus states and ARIA labels

## Development Notes

- This is a **frontend-only** project with mock backends
- Focus on **visual polish** and **smooth interactions**
- Make it feel like a **premium mobile game**
- Add generous **console.log** statements for debugging
- Use **TypeScript strictly** - no `any` types
- **Responsive design** is critical
- **Performance** matters - optimize animations and renders

## Common Patterns

### Data Fetching

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ["resource"],
  queryFn: () => mockAPI.getResource(),
  staleTime: 30 * 1000,
});
```

### Animations

```typescript
<motion.div
  variants={SLIDE_UP_VARIANTS}
  initial="hidden"
  animate="visible"
  whileHover={{ y: -5 }}
>
```

### Error Handling

```typescript
if (error) {
  return <ErrorState onRetry={() => refetch()} />;
}
```

### Loading States

```typescript
if (isLoading) {
  return <Loading size="lg" text="Loading..." />;
}
```

Remember: This should feel like "This is so fun I forgot it's crypto."
