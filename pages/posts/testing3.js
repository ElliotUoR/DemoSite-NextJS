import {useState} from 'react';
import { Counter } from '../../components/redux/Counter';

export default function App() {
  const [names, setNames] = useState(['Alice', 'Bob']);

  const handleClick = () => {
    // 👇️ push to end of state array
    setNames(current => [...current, 'Carl']);

    // 👇️ spread an array into the state array
    // setNames(current => [...current, ...['Carl', 'Delilah']]);

    // 👇️ push to beginning of state array
    // setNames(current => ['Zoey', ...current]);
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Push to state array</button>
      </div>

      {names.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element}</h2>
          </div>
        );
      })}
      <Counter></Counter>

    </div>
  );
}