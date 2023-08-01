import { CloseCircle, TickCircle, User } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);


    const showCandidates = function () {
        axios
          .get("http://localhost:5000/users/candidates")
          .then((response) => setCandidates(response.data))
          .catch((error) => console.log(error));
    
}
    
    useEffect(() => {
        showCandidates()
    
  }, []);

  const handleApproveCandidate = function (id) {
    axios
      .post("http://localhost:5000/users/approve", {
          id: id,
          
      })
      .then((response) => response && showCandidates())
      .catch((error) => console.log(error));
    };
    
    const handleDeclineCandidate = function (id) {
        axios
          .post("http://localhost:5000/users/decline", {
            id: id,
          })
          .then((response) => response && showCandidates())
          .catch((error) => console.log(error));
    }

  return (
    <div className="layout">
      <h1 className="layout-title">Candidates</h1>
      <div className="candidates-container">
        {candidates.map((candidate) => (
          <div id={candidate.id} className="candidate">
            <div className="info">
              <User />
              <p className="name">{candidate.name}</p>
              <span className="user-number">{candidate.phoneNumber}</span>
            </div>
            <div className="actions">
              <TickCircle
                color="green"
                size={30}
                className="action-btn"
                onClick={() => handleApproveCandidate(candidate.id)}
              />
              <CloseCircle
                color=" red"
                size={30}
                className="action-btn"
                onClick={() => handleDeclineCandidate(candidate.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
