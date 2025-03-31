export const printDate=(date)=>{
    const d=new Date(date);
    return d.toISOString().slice(0,10);
};