import { useEffect, useState } from "react";
import Btn from "./Button";

function App() {
  const [todo, setTodo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [dollar, setDollar] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState();

  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
    setToDos((currentArray) => [todo, ...currentArray]);
    setTodo("");
  };
  const onDelete = (index) => {
    setToDos((current) => current.filter((_, i) => i !== index));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, []);
  const convert = (event) => {
    setAmount(event.target.value);
  };
  const onSelect = (event) => {
    const selectedId = event.target.value;
    const selectedCoin = coins.find((coin) => coin.id === selectedId);
    const price = selectedCoin.quotes.USD.price;
    setSelectedCoin(selectedCoin.symbol);
    setDollar(price);
  };
  const onClick = () => {
    setAmount(0);
  };

  return (
    <div>
      <h1>My Todo List : ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todo}
          type="text"
          placeholder="Put your todo"
        ></input>
        <button>Add</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <Btn text="Delete" onClick={() => onDelete(index)} />
          </li>
        ))}
      </ul>
      <h1>Coin Tracker</h1>
      <div>
        <strong>
          {loading ? (
            "Loading.."
          ) : (
            <select onChange={onSelect}>
              <option value="">Select a coin</option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
          )}
        </strong>
      </div>
      <br />
      <form>
        <input
          type="number"
          value={amount}
          onChange={convert}
          placeholder="Coin"
        ></input>
        <button
          type="button"
          onClick={onClick}
          style={{ backgroundColor: "tomato", border: 0, color: "white" }}
        >
          Reset
        </button>
      </form>
      <div>Selected : {selectedCoin}</div>
      <div>Dollar : {Math.round(amount * dollar)} $</div>
    </div>
  );
}

export default App;
