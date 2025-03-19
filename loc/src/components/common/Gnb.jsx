import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faStopwatch,faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import './Gnb.css';

const Gnb = () => {
    return (
        <nav className="Gnb">
            <div className="gnb-inner">
                <div className="main-btn">
                    <Link to={''}><FontAwesomeIcon icon={faHouse} alt="메인페이지 버튼" /></Link>
                </div>
                <div className="stop-watch">
                    <Link><FontAwesomeIcon icon={faStopwatch} alt="스탑워치 버튼" /></Link>
                </div>
                <div className="addToDo">
                    <Link><FontAwesomeIcon icon={faSquarePlus} alt="목표추가 버튼" /></Link>
                </div>
                <div className="setting-btn">
                    <Link><FontAwesomeIcon icon={faBars} alt="세팅버튼" /></Link>
                </div>
            </div>
        </nav>
    )
};
export default Gnb;

/* 
    메뉴바
        구성 버튼
            홈버튼: 메인페이지로
            스탑워치 버튼: 스탑워치 오버레이
            목표리스트 버튼: 목표 관리 페이지로
            사용자 프로필: 설정메뉴 오버레이
*/