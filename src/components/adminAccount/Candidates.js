import { CloseCircle, TickCircle, User } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { createPortal } from "react-dom";
import AgreeModal from "./AgreeModal";
import { useDispatch, useSelector } from "react-redux";
import {
  approveCandidate,
  declineCandidate,
  getCandidates,
} from "../../utils/content-actions";


export default function Candidates() {
  const { candidates } = useSelector((state) => state.admin);
  const [targetCandidate, setTargetCandidate] = useState(null);
  const [agreeModal, setAgreeModal] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasFetchedData) {
      dispatch(getCandidates());
      setHasFetchedData(true);
    }
  }, [dispatch, hasFetchedData]);

  const handleApproveCandidate = function (id) {
    dispatch(approveCandidate(id));
  };

  const handleDeclineCandidate = function () {
    dispatch(declineCandidate(targetCandidate));
  };

  return (
    <div className="layout">
      <h1 className="layout-title">Candidates</h1>
      <div className="candidates-container">
        {candidates.length === 0 ? (
          <NotFound />
        ) : (
          candidates.map((candidate) => (
            <div id={candidate.id} key={candidate.id} className="candidate">
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
                  onClick={() => {
                    setTargetCandidate(candidate.id);
                    setAgreeModal(!agreeModal);
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {agreeModal &&
        createPortal(
          <AgreeModal
            onAgree={handleDeclineCandidate}
            onDisagree={setAgreeModal(!agreeModal)}
          />,
        )}
    </div>
  );
}
