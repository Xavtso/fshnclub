import '../../styles/AdminStyles/Layouts.css';

export default function AgreeModal(props) {
  const handleAgree = function () {
    props.onAgree();
  };
  const handleDisagree = function () {
    props.onDisagree();
  };

  return (
    <div className="overflow">
      <div className="agreeModal">
        <h1 className="agree-title">Are you sure ?</h1>
        <div className="agree-controls">
          <button className="agree-btn" onClick={handleAgree}>
            Yes
          </button>
          <button className="disagree-btn" onClick={handleDisagree}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
