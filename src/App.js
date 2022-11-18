import { Route, Routes } from 'react-router-dom';

import './App.css';

import 'react-calendar/dist/Calendar.css';

import Navigation from './components/navigation/Navigation';
import HomeBody from './pages/HomeBody';
import Fixtures from './pages/Fixtures';
import SingleFixture from './pages/SingleFixture';
import NotFound from './pages/NotFound';
import FixedLiveResults from './components/livefixtures/FixedLiveResults';
import SingleFixtureStats from './components/fixture/stats/SingleFixtureStats';
import SingleFixtureLineups from './components/fixture/lineup/SingleFixtureLineups';
import SingleFixtureHeadToHead from './components/fixture/headtohead/SingleFixtureHeadToHead';
import SingleFixtureNews from './components/fixture/SingleFixtureNews';
import SingleFixtureLeagueTable from './components/fixture/leaguetable/SingleFixtureLeagueTable';
import LeagueTableForm from './components/fixture/leaguetable/LeagueTableForm';
import LeagueTableScorersTable from './components/fixture/leaguetable/ScorersTable';

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
          <Route path="leaguetable/*" element={<SingleFixtureLeagueTable />}>
            <Route
              path="table"
              element={
                <LeagueTableForm
                  page={'table'}
                  columns={['P', 'W', 'D', 'L', 'G', 'GD', 'PTS']}
                />
              }
            ></Route>
            <Route
              path="form"
              element={
                <LeagueTableForm
                  page={'form'}
                  columns={['P', 'W', 'D', 'L', 'G', 'PTS', 'FORM']}
                />
              }
            ></Route>
            <Route
              path="scorers"
              element={<LeagueTableScorersTable page={'scorers'} />}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
