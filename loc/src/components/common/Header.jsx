import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserMng } from '../../pages/account';
import './Header.css';

const Header = ({title}) => {
    const [managerMD, setManagerMD] = useState(false);

    const handleClickUserModal = () => {
        setManagerMD(!managerMD);
    };

    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    <Link to='/'><img src="/assets/images/Ex-logo.png" alt="logo" /></Link>
                </div>
                <div className="p-name">
                    <p><span>{title}</span></p>
                </div>
                <div className="md-btn" onClick={handleClickUserModal}>
                    <img src="/assets/images/user-setting-btn.png" alt="user-manager" />
                </div>
            </div>
            {managerMD && <UserMng managerMD={managerMD} handleClickUserModal={handleClickUserModal} />}
        </header>
    )
};

export default Header;