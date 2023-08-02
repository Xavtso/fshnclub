import '../../styles/AdminStyles/NotFound.css';
import empty from '../../images/Empty-removebg-preview.png'
export default function NotFound(props) {
  return (
      <div className="notfound-container">
          <img src={empty} alt='Not found'  className='notfound-img'/>
      </div>
  );
}
