# Testing Configuration

Este proyecto está configurado con **Vitest** y **React Testing Library** para realizar testing unitario y de integración.

## Estructura de Tests

Los tests se encuentran organizados en carpetas `__tests__` dentro de cada módulo:

```
src/
├── components/
│   └── __tests__/
│       ├── LoadingSpinner.test.tsx
│       ├── CharacterCard.test.tsx
│       ├── CharacterDetailPanel.test.tsx
│       └── Sidebar.test.tsx
├── hooks/
│   └── __tests__/
│       ├── useFavorites.test.tsx
│       ├── useDebounce.test.tsx
│       └── useGraphQL.test.tsx
├── context/
│   └── __tests__/
│       └── FavoritesContext.test.tsx
├── pages/
│   └── __tests__/
│       └── Home.test.tsx
└── test/
    └── setup.ts
```

## Comandos de Testing

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm test
```

### Ejecutar tests una sola vez
```bash
npm run test:run
```

### Ejecutar tests con interfaz UI (si está instalado)
```bash
npm run test:ui
```

## Configuración

### Archivos de configuración:
- `vitest.config.ts` - Configuración principal de Vitest
- `src/test/setup.ts` - Configuración inicial de los tests (incluye @testing-library/jest-dom)

### Dependencias instaladas:
- `vitest` - Framework de testing
- `@testing-library/react` - Utilidades para testing de componentes React
- `@testing-library/jest-dom` - Matchers adicionales para DOM
- `@testing-library/user-event` - Simulación de eventos de usuario
- `jsdom` - Entorno DOM para Node.js

## Patrones de Testing

### 1. Testing de Componentes
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### 2. Testing de Hooks
```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current).toBe(expectedValue)
  })
})
```

### 3. Testing con Context
```typescript
const wrapper = ({ children }: { children: ReactNode }) => (
  <MyContext.Provider value={mockValue}>
    {children}
  </MyContext.Provider>
)

const { result } = renderHook(() => useMyHook(), { wrapper })
```

### 4. Mocking
```typescript
import { vi } from 'vitest'

// Mock de módulos
vi.mock('../module', () => ({
  myFunction: vi.fn()
}))

// Mock de hooks de React Router
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})
```

## Ejemplos de Tests Incluidos

### Componentes
- **LoadingSpinner**: Testing de renderizado y clases CSS
- **CharacterCard**: Testing de props, eventos de click, estados de favoritos
- **CharacterDetailPanel**: Testing de estados vacíos y con datos
- **Sidebar**: Testing de integración con contextos

### Hooks
- **useFavorites**: Testing de manejo de contexto y errores
- **useDebounce**: Testing de funcionalidad de debounce con timers
- **useGraphQL**: Testing de hooks de Apollo Client

### Context
- **FavoritesContext**: Testing completo de provider, localStorage, y todas las funciones

### Pages
- **Home**: Testing de redirección automática

## Buenas Prácticas

1. **Describe blocks**: Agrupa tests relacionados
2. **Clear test names**: Nombres descriptivos de lo que se está probando
3. **Arrange-Act-Assert**: Estructura clara en cada test
4. **Mock external dependencies**: Aisla la unidad bajo prueba
5. **Test user behavior**: Enfócate en cómo interactúa el usuario
6. **Clean up**: Usa `beforeEach` y `afterEach` para limpiar entre tests

## Coverage

Para verificar el coverage de tests:
```bash
npx vitest run --coverage
```

## Debugging Tests

Para debuggear tests en VS Code:
1. Coloca breakpoints en tu código
2. Usa la extensión "Vitest" de VS Code
3. O ejecuta tests con el debugger de Node.js

## Extensiones Recomendadas para VS Code

- **Vitest** - Integración con VS Code
- **Jest Snippets** - Snippets útiles para testing
- **Error Lens** - Muestra errores inline
