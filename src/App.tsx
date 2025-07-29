import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Characters from './pages/Characters';
import client from './graphql/client';
import SearchProvider from './context/SearchContext';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <SearchProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Characters />} />
              <Route path="/characters" element={<Characters />} />
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </ApolloProvider>
  );
}

export default App;
