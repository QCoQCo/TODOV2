import { useState,useEffect } from "react";
import axios from "axios";

export const List=({inputData})=>{
    return(
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
            <hr/>
        </div>
    )
};

const DbTest=()=>{

    const [listData, setListData] = useState([]);

    const conListData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/users");
            setListData(res.data);// console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        conListData();
    }, []);

    return(
        <div className="data">
            {listData.map(data=>
                <List key={data.id} inputData={data}/>
            )}
        </div>
    )
};

export default DbTest;