import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import client from './graphql/client';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
