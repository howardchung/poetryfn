import './App.css';
import React, {useEffect, useState} from 'react';

function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function App() {
  const [deck, setDeck] = useState([]);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(90);
  const [card, setCard] = useState('');
  const [isTimerOn, setIsTimerOn] = useState(false);

  const reshuffle = () => {
    // Generate the deck
    // 8 images, 4096 by 2840, 10 by 5 cards each
    const deck = [];
    for (let i = 1; i < 9; i++) {
      for (let j = 0; j < 4096; j += 409) {
        for (let k = 0; k < 2840; k += 568) {
          deck.push(i + '.jpeg/' + j + '/' + k);
        }
      }
    }
    shuffle(deck);
    //console.log(deck);
    setDeck(deck);
  }

  const nextCard = (value) => {
    if (value !== 0) {
      setPoints(points + value);
    }
    const candidate = deck.pop();
    if (candidate) {
      setCard(candidate);
    }
  };

  const startTurn = async () => {
    // Reset the timer
    setTime(90);
    // Reset the points
    setPoints(0);
    // Start the timer
    setTime(90);
    setIsTimerOn(true);
    // Get the next card
    nextCard(0);
  };

  // Initial shuffle
  useEffect(reshuffle, []);

  useEffect(() => {
    if (isTimerOn && time > 0) {
      const interval = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [time, isTimerOn]);

  const image = card.split('/')[0];
  const x = card.split('/')[1];
  const y = card.split('/')[2];
  // console.log(image, x, y);

  return (
    <div className="App">
      <div className="App-header">
      <div>Poetry for Neanderthals</div>
      <div style={{
        borderRadius: '8px',
        margin: '12px',
        width: '410px',
        height: '568px',
        backgroundImage: `url(/${image})`,
        backgroundPosition: `${x}px ${y}px`,
      }} />
      <div className="buttonContainer">
        <button className="btn btn-secondary gameButton" onClick={() => nextCard(0)}>Skip</button>
        <button className="btn btn-primary gameButton" onClick={() => nextCard(1)}>+1</button>
        <button className="btn btn-success gameButton" onClick={() => nextCard(3)}>+3</button>
        <button className="btn btn-danger gameButton" onClick={() => nextCard(-1)}>-1 (oops!)</button>
      </div>
      <div>{points} Point(s)</div>
      <div>{time}s remaining</div>
      <div className="buttonContainer">
        <button className="btn btn-success" onClick={startTurn}>Start Turn</button>
        <button className="btn btn-secondary" onClick={reshuffle}>Reshuffle ({deck.length} cards left)</button>
      </div>
      </div>
    </div>
  );
}

export default App;
