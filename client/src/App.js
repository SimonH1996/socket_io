import { io } from "socket.io-client";
import { useState, useEffect } from "react";

function App() {
  const [socket] = useState(() => io(':5000'));
  const [pollInformation, setpollInformation] = useState([])

  useEffect(() => {
    socket.emit("update", "")
    socket.on('send_data_to_all_other_clients', data => {
      setpollInformation(data)
      console.log(data)
    });
    return () => socket.disconnect(true);
  }, []);

  function sendAnwer(answer) {
    socket.emit("answer", answer)

  }

  return (
    <div className="App">
      <h1>Socket Test</h1>
      <button onClick={() => sendAnwer("A")}>A</button>
      <button onClick={() => sendAnwer("B")}>B</button>
      <button onClick={() => sendAnwer("C")}>C</button>
      <table>
        <tr>
          <th>A</th>
          <th>B</th>
          <th>C</th>
        </tr>
        <tr>
          <td>
            {pollInformation[0]}
          </td>
          <td>
            {pollInformation[1]}
          </td>
          <td>
            {pollInformation[2]}
          </td>

        </tr>
      </table>
    </div >
  );
}

export default App;
