import axios from "axios";

export const initSessionData=()=>{
    const sessionUser=sessionStorage.getItem('users');
    const sessionUserVersion=sessionStorage.getItem('userVersion');
    const sessionTask=sessionStorage.getItem('tasks');
    const sessionTaskVersion=sessionStorage.getItem('taskVersion');

    axios.get('./data/users.json').then(res=>{
        const{users,version}=res.data;
        if(!sessionUser||sessionUserVersion!==version){
            sessionStorage.setItem('users',JSON.stringify(users));
            sessionStorage.setItem('userVersion',version);
        }
    }).catch(err=>console.error('유저 데이터 로딩 실패',err));

    axios.get('./data/tasks.json').then(res=>{
        const{tasks,version}=res.data;
        if(!sessionTask||sessionTaskVersion!==version){
            sessionStorage.setItem('tasks',JSON.stringify(tasks));
            sessionStorage.setItem('taskVersion',version);
        }
    }).catch(err=>console.error('할 일 데이터 로딩 실패',err));
};