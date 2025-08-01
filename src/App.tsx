import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import client from './graphql/client';
import SearchProvider from './context/SearchContext';
import FavoritesProvider from './context/FavoritesContext';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <SearchProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Characters />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
              </Routes>
            </div>
          </Router>
        </FavoritesProvider>
      </SearchProvider>
    </ApolloProvider>
  );
}

export default App;
