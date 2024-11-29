import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectLaunches,
  setLaunches,
} from '@features/launch/store/launch.slice';
import { Link, Route, Routes } from 'react-router-dom';

import { useGetLaunchesQuery } from '../features/launch/launch.service';

function TestComponent() {
  const launches = useAppSelector(selectLaunches);

  console.log('TestComponent > ', launches);

  return (
    <div>
      <Link to="/">Click here to go back to root page.</Link>
      <button type="button">Click to trigger event</button>
    </div>
  );
}

function TestComponent2() {
  const launches = useAppSelector(selectLaunches);

  const dispatch = useAppDispatch();

  const { data } = useGetLaunchesQuery();

  function handleSetLaunches() {
    dispatch(
      setLaunches([
        { id: 1, name: 'Falcon 1' },
        { id: 2, name: 'Falcon 9' },
      ]),
    );
  }

  console.log('TestComponent 22222 > ', launches);

  return (
    <div>
      This is the generated root route.{' '}
      <Link to="/page-2">Click here for page 2.</Link>
      <button type="button" onClick={handleSetLaunches}>
        Set launches
      </button>
    </div>
  );
}

export function App() {
  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route element={<TestComponent2 />} path="/" />
        <Route element={<TestComponent />} path="/page-2" />
      </Routes>
    </div>
  );
}

export default App;
