
import Card from "../components/account/Card";
import '../styles/Account.css';
export default function Account() {
    return (
        <div className="account-body">
            <h2 className="welcome">Glad to see you, Vitaliy</h2>
            <Card id='vouchers' title={'Vouchers'} class={'horisontal'} />
            <h2 className="section-label">Other Info</h2>
            <div className="cards-container">
                <Card id = 'event' title={'Events' } />
                <Card id = 'hour' title={'Opening hours' } />
                <Card id = 'about' title={ 'About' } />
                <Card id = 'contact' title={ 'Contact'} />
            </div>
        </div>
    )
}