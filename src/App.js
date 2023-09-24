import "./App.css";
import { AppContext } from "./context/AppContext";
import { useContext, useState } from "react";
import FABC_logo from "./assets/lusterlogo-removebg-preview.png"


function App() {
  const {
    walletAddress,
    connectWallet,
    disconnectWallet,
    setTimeLimitFn,
    numberOfCandidate,
    getNumberOfCandidate,
    setCandidateFn,
    getScoreBoard,
    voteFn,
    scoreBoard,
    isOwner,
  } = useContext(AppContext);
  const [timeLimit, setTimeLimit] = useState(30);
  const [teamName, setTeamName] = useState();

  return (
    <div className="App">
      <div className="img-con">
        <img src={FABC_logo} alt="..." width={250}/>
      </div>
      
      <button onClick={connectWallet} className="connect">
        Connect Wallet
      </button>
      <button onClick={disconnectWallet} className="disconnect">
        Disconnect Wallet
      </button>
      <br />
      <p>{walletAddress}</p>
      <h1>Score Board</h1>
      <button onClick={getScoreBoard}>View Score Board</button>
      <div className="card-container">
        {scoreBoard.map((score) => (
          <div className="card">
            <h1>{score.name}</h1>
            <p>{score.voteCount.toString()}</p>
          </div>
        ))}
      </div>
      <div className="container">
        {isOwner && (
          <div>
            <h2>Set Time Limit</h2>
            <input
              type="number"
              placeholder="Enter the time limit in minutes"
              onChange={(e) => setTimeLimit(e.target.value)}
              value={timeLimit}
            />
            <button onClick={() => setTimeLimitFn(timeLimit)} className="ml-3">
              Set Time Limit
            </button>

            <h2>Get Total Teams</h2>
            <button onClick={getNumberOfCandidate}>Total Number of Teams</button>
            <br />
            <p>{numberOfCandidate}</p>

            <div>
              <h3>Add Team</h3>
              <input
                type="text"
                placeholder="Enter the team name"
                onChange={(e) => setTeamName(e.target.value)}
                value={teamName}
              />
              <button onClick={() => setCandidateFn(teamName)} className="ml-3">
                Add +
              </button>
            </div>
          </div>
        )}
        <h1>Vote Here</h1>
        <div className="vote-container">
          <button onClick={()=>voteFn(0)}>Candidate 1</button>
          <button onClick={()=>voteFn(1)}>Candidate 2</button>
          <button onClick={()=>voteFn(2)}>Candidate 3</button>
          <button onClick={()=>voteFn(3)}>Candidate 4 </button>
        </div>
      </div>
      <div>
        <br/>
        <h3>Creted with 💙  by team <span>Hameed</span></h3>
        <br></br>
      </div>
    </div>
  );
}

export default App;
