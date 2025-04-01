import { Link } from 'react-router-dom';
import './SettingPage.css';

const SettingPage = ({ isSetting, setIsSetting, handleClickSetting }) => {
    return (
        <div className={`settings ${isSetting ? 'view' : ''}`}>
            <div className="setting-inner">
                <h2>Settings</h2>
                <div className="dbView">
                    <p><Link to={'/db/user-set'} onClick={handleClickSetting}>유저관리</Link></p>
                    <p><Link to={''} onClick={handleClickSetting}>임시 버튼</Link></p>
                </div>
                <button onClick={handleClickSetting}>CLOSE</button>
            </div>
        </div>
    )
};

export default SettingPage;