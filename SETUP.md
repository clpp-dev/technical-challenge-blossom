# Technical Challenge Blossom

This project has been configured with React Router DOM for routing and Apollo Client for GraphQL queries.

## 🚀 Features Added

- **React Router DOM**: Complete routing setup with navigation
- **Apollo Client**: GraphQL client with caching and error handling
- **TypeScript**: Full type safety for GraphQL operations
- **Custom Hooks**: Reusable hooks for GraphQL operations

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Navigation component with routing links
│   └── Navigation.css       # Navigation styles
├── pages/
│   ├── Home.tsx            # Home page component
│   ├── About.tsx           # About page component
│   └── Users.tsx           # Users page with GraphQL example
├── graphql/
│   ├── client.ts           # Apollo Client configuration
│   ├── queries.ts          # GraphQL queries, mutations, and subscriptions
│   └── types.ts            # TypeScript interfaces for GraphQL types
├── hooks/
│   └── useGraphQL.ts       # Custom hooks for GraphQL operations
└── App.tsx                 # Main app component with routing setup
```

## 🛠️ Configuration Required

### GraphQL Endpoint

Update the GraphQL endpoint in `src/graphql/client.ts`:

```typescript
const httpLink = createHttpLink({
  uri: 'YOUR_GRAPHQL_ENDPOINT_HERE', // Replace with your actual endpoint
});
```

### Authentication (Optional)

If you need authentication, uncomment and configure the auth link in `src/graphql/client.ts`:

```typescript
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Then use: authLink.concat(httpLink)
```

## 📝 Usage Examples

### Using React Router

```tsx
import { Link, useNavigate } from 'react-router-dom';

// Navigation with Link
<Link to="/users">Users</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/about');
```

### Using GraphQL with Apollo Client

```tsx
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, CREATE_USER } from '../graphql/queries';

// Query example
const { loading, error, data } = useQuery(GET_USERS);

// Mutation example
const [createUser] = useMutation(CREATE_USER);
```

### Using Custom Hooks

```tsx
import { useGetUsers, useCreateUser } from '../hooks/useGraphQL';

// In your component
const { loading, error, data } = useGetUsers();
const [createUser] = useCreateUser();
```

## 🏃‍♂️ Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Packages Installed

- `react-router-dom`: Routing library for React
- `@apollo/client`: GraphQL client with caching
- `graphql`: GraphQL query language
- `@types/react-router-dom`: TypeScript types for React Router

## 🔧 Available Routes

- `/` - Home page
- `/about` - About page  
- `/users` - Users page with GraphQL example

## 📚 GraphQL Schema Example

The project includes example GraphQL operations for a User entity. Update `src/graphql/queries.ts` and `src/graphql/types.ts` to match your actual GraphQL schema.

## 🎯 Next Steps

1. Replace the example GraphQL endpoint with your actual server URL
2. Update the GraphQL schema and types to match your API
3. Add authentication if required
4. Customize the UI and add more pages as needed
5. Add error boundaries and loading states
6. Configure environment variables for different environments
