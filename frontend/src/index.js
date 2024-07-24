import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    const [votes, setVotes] = useState({ candidate1: 0, candidate2: 0 });
    const [showResults, setShowResults] = useState(false);

    const vote = (candidate) => {
        axios.post(`http://localhost:3000/vote`, { candidate })
            .then(response => {
                setVotes(response.data);
                if (votes.candidate1 + votes.candidate2 >= 4) {
                    setShowResults(true);
                }
            })
            .catch(error => console.error(error));
    };

    if (showResults) {
        const totalVotes = votes.candidate1 + votes.candidate2;
        const candidate1Percentage = ((votes.candidate1 / totalVotes) * 100).toFixed(2);
        const candidate2Percentage = ((votes.candidate2 / totalVotes) * 100).toFixed(2);
        return (
            <div>
                <h1>Voting Results</h1>
                <p>Candidate 1: {candidate1Percentage}%</p>
                <p>Candidate 2: {candidate2Percentage}%</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Vote for Your Candidate</h1>
            <button onClick={() => vote('candidate1')}>Vote for Candidate 1</button>
            <button onClick={() => vote('candidate2')}>Vote for Candidate 2</button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
