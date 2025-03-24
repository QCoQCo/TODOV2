import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { UseDbData } from "../../data";

export const List = ({ inputData }) => {
    return (
        <div className="wrap">
            <p>
                {inputData.username}
            </p>
            <p>
                {inputData.nickname}
            </p>
            <p>
                {inputData.userId}
            </p>
            <hr />
        </div>
    )
};

const DbTest = () => {

    // const {getDbdata}=useContext(UseDbData());
    const [listData, setListData] = useState([]);
    const [listData2, setListData2] = useState([]);
    
    const conListData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/users");
            setListData(res.data);// console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    
    
    useEffect(() => {
        // setListData2(getDbdata());
        conListData();
        
    }, []);

    return (
        <div className="data">
            <div className="row1">
                {listData.map(data =>
                    <List key={data.id} inputData={data} />
                )}
            </div>
            <div className="row2">
                {listData2.map(data =>
                    <List key={data.id} inputData={data} />
                )}
            </div>
        </div>
    )
};

export default DbTest;

// 너가 알려준대로 적었지만, 여전히 Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop 라는 에러만 띄우고 있어.



// 참고로 이렇게 불러온 데이터는 

//     const [listData2, setListData2] = useState([]);

//     setListData2(useDbData());

// 라는 코드로 상태변수에 저장하고 있어. 이 부분은 문제 없지?