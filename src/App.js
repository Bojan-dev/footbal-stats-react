import { Route, Routes } from 'react-router-dom';

import './App.css';

import 'react-calendar/dist/Calendar.css';

import Navigation from './components/navigation/Navigation';
import HomeBody from './pages/HomeBody';
import Fixtures from './pages/Fixtures';
import SingleFixture from './pages/SingleFixture';
import NotFound from './pages/NotFound';
import FixedLiveResults from './components/livefixtures/FixedLiveResults';

function App() {
  return (
    <>
      <Navigation />
      <FixedLiveResults />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/fixtures/:fixtureId" element={<SingleFixture />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
