import { useEffect,useContext,useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../data";
import UserAdd from "./UserAdd";

const UserSet=({title})=>{
    useEffect(()=>{
        // window.location.reload();
        title('USER MOD');
    });
    const{userData}=useContext(DataContext);
    const[isAdd,setIsAdd]=useState(false);
    // const[user,setUser]=useState('');
    
    const AddComp=()=>{
        setIsAdd(!isAdd);
    };

    const onDelete=(id)=>{
        fetch('http://localhost:4000/users',{
            method:'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body:JSON.stringify({id})
        }).then(res=>res.json).then(data=>console.log(data));
        window.location.reload();
    };

    const onSubmit=(data)=>{
        // e.preventDefault();
        fetch('http://localhost:4000/users',{
            method:'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data),
        }).then(res=>res.json).then(data=>console.log(data));
        window.location.reload();
    };
    

    //다이어리를 참고 params
    //

    return(
        <div className="UserSet">
            <div className="userList">
                <ul>
                    {userData.map(data=>
                        <li key={data.id}>
                            <p className="id">{data.userId}</p>
                            <p className="nick">{data.nickname}</p>
                            <p className="name">{data.username}</p>
                            <p className="user-btn">
                                <Link to={`/db/user-edit/${data.userId}`}>UPDATE</Link>
                                <button onClick={()=>onDelete(data.id)}>DELETE</button>
                                <Link to={`/db/task-set/${data.userId}`}>TASK MOD</Link>
                            </p>
                        </li>
                    )}
                </ul>
            </div>
            <p className="add-btn">
                <button onClick={AddComp}>ADD USER</button>
            </p>
            {isAdd&&<UserAdd onSubmit={onSubmit}/>}
        </div>
    )
};

export default UserSet;