export const printDate=(date)=>{
    const d=new Date();
    return d.toISOString().slice(0,10);
};