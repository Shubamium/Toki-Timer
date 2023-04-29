import { useEffect, useState } from "react";

export default function useTitleChanger(){
    
    const [_title,_setTitle] = useState('Toki Timer App');

    useEffect(()=>{
        document.addEventListener('visibilitychange',handleVisibilityChange);
        
        return ()=>{
            // document.removeEventListener('visibilitychange',handleVisibilityChange);
            // resetTitle();
        }
    });


    function handleVisibilityChange(){
        console.log(_title);
        if(document.visibilityState === 'hidden'){
            setTitle(_title);
        }else{
            resetTitle();
        }
    }
    const resetTitle = () =>{
        document.title = 'Toki Timer App';  
    };

    const setTitle = (changeTo)=>{
        document.title = changeTo;
    }
    return { resetTitle, setTitle:_setTitle};
}