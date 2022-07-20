import { Route, Routes } from 'react-router-dom';

import './App.css';

import 'react-calendar/dist/Calendar.css';

import Navigation from './components/navigation/Navigation';
import HomeBody from './pages/HomeBody';
import Fixtures from './pages/Fixtures';
import SingleFixture from './pages/SingleFixture';
import NotFound from './pages/NotFound';
import FixedLiveResults from './components/livefixtures/FixedLiveResults';
import SingleFixtureStats from './components/fixture/SingleFixtureStats';
import SingleFixtureLineups from './components/fixture/SingleFixtureLineups';
import SingleFixtureHeadToHead from './components/fixture/SingleFixtureHeadToHead';
import SingleFixtureNews from './components/fixture/SingleFixtureNews';
import SingleFixtureLeagueTable from './components/fixture/SingleFixtureLeagueTable';

function App() {
  return (
    <>
      <Navigation />
      <FixedLiveResults />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/fixtures" element={<Fixtures />} />

        <Route path="/fixtures/:fixtureId/*" element={<SingleFixture />}>
          <Route path="stats" element={<SingleFixtureStats />}></Route>
          <Route path="lineups" element={<SingleFixtureLineups />}></Route>
          <Route
            path="headtohead"
            element={<SingleFixtureHeadToHead />}
          ></Route>
          <Route path="news" element={<SingleFixtureNews />}></Route>
          <Route
            path="leaguetable"
            element={<SingleFixtureLeagueTable />}
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
