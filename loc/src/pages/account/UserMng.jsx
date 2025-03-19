import { useState, useEffect } from "react";
import Signup from "./SignUp";
import FindId from "./FindId";
import FindPw from "./FindPw";
import './UserMng.css';

const UserMng = ({ managerMD, handleClickUserModal }) => {

    const [idMd, setIdMd] = useState(false);
    const [pwMd, setPwMd] = useState(false);

    const toLogin = () => {
        setIdMd(false);
        setPwMd(false);
    }
    const swMd = () => {
        var temp = idMd;
        setIdMd(pwMd);
        setPwMd(temp);
    };

    useEffect(() => {
        setIdMd(false);
        setPwMd(false);
    }, []);
    // const handleCloseManager=()=>{
    //     handleClickUserModal();
    // };

    return (
        <div className="UserMng">
            <div className="manager-inner">
                <div className="top-comp">
                    <div className="back-btn" onClick={handleClickUserModal}>
                        <img src="/assets/images/back-btn.png" alt="back" />
                    </div>
                    <h2>SIGNIN</h2>
                </div>
                {!idMd && !pwMd && <Signup managerMD={managerMD} setIdMd={setIdMd} setPwMd={setPwMd} handleClickUserModal={handleClickUserModal} />}
                {idMd && !pwMd && <FindId managerMD={managerMD} setIdMd={setIdMd} setPwMd={setPwMd} />}
                {!idMd && pwMd && <FindPw managerMD={managerMD} setIdMd={setIdMd} setPwMd={setPwMd} />}
            </div>
        </div>
    )
};

export default UserMng;