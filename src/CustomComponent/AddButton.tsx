import React from 'react';
import { useNavigate } from 'react-router-dom';
export interface Props {
    modals : Boolean;
    text?:String;
    setModal : React.Dispatch<React.SetStateAction<Boolean>>
};
export const AddButton = ({modals,text,setModal}:Props) =>{
  const nav=useNavigate();
    const AddModal=()=>{
        nav(`/${text}`)
        setModal(true);
    }
  return (
    <>
        <button onClick={AddModal} className='succ'>{text}</button>
    </>
  )
}
