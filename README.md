# Technical Test by Cristian Leandro Perez Pelaez
- Date: 25 July 2025
- Company: **[Blossom](https://www.blossom.net/)**

# Demo
- Deploy in CloudFlare: **[https://technical-challenge-blossom.pages.dev/](https://technical-challenge-blossom.pages.dev/)**

# Captues
- ## Desktop:

![GIFT DEMO DESKTOP](https://i.ibb.co/p6DJNm9t/DEMO-DESKTOP.gif)
![Image desktop 1](https://i.ibb.co/CK67DXkQ/DESKTOP-1.jpg)
![Image desktop 2](https://i.ibb.co/svKmBPF8/DESKTOP-2.jpg)
---

- ## Mobile:
![GIFT DEMO DESKTOP](https://i.ibb.co/G4PJ6pLK/DEMO-MOBILE.gif)
![Image mobile 1](https://i.ibb.co/v6vXPpxq/MOBILE-1.jpg)
![Image mobile 2](https://i.ibb.co/YFzT99vN/MOBILE-2.jpg)
![Image mobile 3](https://i.ibb.co/HftDnXyV/MOBILE-3.jpg)
![Image mobile 3](https://i.ibb.co/9HnwPDy8/MOBILE-4.jpg)

---
# Rick and Morty Character Explorer

A modern React application that allows users to explore characters from the Rick and Morty universe using the Rick and Morty API. Built with TypeScript, GraphQL, and Tailwind CSS.

## 📋 Project Information

- **Author**: Cristian Leandro Perez Pelaez
- **Project**: Technical Challenge Blossom
- **Date**: July 29, 2025
- **Challenge**: Frontend Developer Position

## 🚀 Features

- **Character Exploration**: Browse and search through all Rick and Morty characters
- **Advanced Filtering**: Filter characters by status, species, gender, and more
- **Favorites System**: Save your favorite characters with local storage persistence
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Real-time Search**: Debounced search with instant results
- **Character Details**: Detailed view with character information and episodes
- **GraphQL Integration**: Efficient data fetching with Apollo Client

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### Data & State Management
- **Apollo Client** - GraphQL client for data fetching
- **GraphQL** - Query language for APIs
- **Context API** - State management for favorites and search
- **Local Storage** - Persistent favorites storage

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Testing utilities for React components
- **Jest DOM** - Custom DOM element matchers
- **JSDOM** - DOM implementation for Node.js

### Code Quality
- **ESLint** - JavaScript/TypeScript linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CharacterDetailPanel/
│   ├── Sidebar/
│   │   └── components/
│   ├── LoadingSpinner.tsx
│   └── __tests__/       # Component tests
├── context/             # React Context providers
│   ├── FavoritesContext.tsx
│   ├── SearchContext.tsx
│   └── __tests__/
├── graphql/             # GraphQL configuration
│   ├── client.ts
│   ├── queries.ts
│   └── types.ts
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts
│   ├── useFavorites.ts
│   ├── useGraphQL.ts
│   └── __tests__/
├── pages/               # Main application pages
│   ├── Characters.tsx
│   ├── CharacterDetail.tsx
│   ├── Home.tsx
│   └── __tests__/
└── test/               # Test configuration
    └── setup.ts
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/clpp-dev/technical-challenge-blossom.git
   cd technical-challenge-blossom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing
```bash
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI (if vitest/ui is installed)
```

## 🧪 Testing

This project includes comprehensive testing with **Vitest** and **React Testing Library**.

### Test Coverage
- **Components**: All major components tested
- **Hooks**: Custom hooks with mocked dependencies
- **Context**: State management and localStorage integration
- **Pages**: Route handling and navigation
- **Integration**: Component interactions and user flows

### Running Tests
```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run with coverage
npx vitest run --coverage
```

### Test Structure
Tests are organized in `__tests__` folders within each module:
- Unit tests for individual components and hooks
- Integration tests for context providers
- Mocked external dependencies (React Router, Apollo Client)
- LocalStorage and API interaction testing

## 🎨 Features Overview

### Character Search & Filtering
- Real-time search with 500ms debounce
- Filter by status (Alive, Dead, Unknown)
- Filter by species, gender, and type
- Responsive mobile-friendly filters

### Favorites Management
- Add/remove characters from favorites
- Persistent storage using localStorage
- Visual indicators for favorited characters
- Error handling for storage issues

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Modern card-based layout

### Performance Optimizations
- Lazy loading of character images
- Debounced search queries
- Efficient GraphQL queries
- Memoized components and contexts

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `vitest.config.ts` - Test configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules and settings

## 🌐 API Integration

This project uses the [Rick and Morty API](https://rickandmortyapi.com/documentation/) via GraphQL:
- Character data fetching
- Search and filtering capabilities
- Episode information
- Location details

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created as a technical challenge and is for demonstration purposes.

## 🙏 Acknowledgments

- **Rick and Morty API** - For providing the excellent free API
- **Blossom** - For the technical challenge opportunity
- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool
- **Tailwind CSS** - For the utility-first CSS framework

---


