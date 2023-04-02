export function secondToTime(time){
    if(time === 0) return {hours:0,minutes:0,seconds:0};
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time % 60);
  
    // if(hours === 0) hours = "00";
    // if(minutes === 0) minutes = "00";
    // if(seconds === 0) seconds = "00";
    return {hours,minutes,seconds};
  }
  
export function msToTime(ms){
if(ms === 0) return {hours:0,minutes:0,seconds:0};
const time = ms/1000;
const hours = Math.floor(time / 3600);
const minutes = Math.floor(time / 60) % 60;
const seconds = Math.floor(time % 60);
const mili = ms % 1000;
// if(hours === 0) hours = "00";
// if(minutes === 0) minutes = "00";
// if(seconds === 0) seconds = "00";
return {hours,minutes,seconds,ms:mili};
}

export function timeToString(timeObj){
const addZero = (time)=>{
    if(!time)return null;
    const newTime = time.toString();
    return newTime.split('').length > 1 ? newTime : '0' + newTime;
}

const hours = addZero(timeObj.hours) || '00';
const minute = addZero(timeObj.minutes) || '00';
const seconds =  addZero(timeObj.seconds) || '00';

const string = `${hours+ ':'}${minute + ':'}${seconds + '.'}${Math.floor(timeObj.ms / 100) || '0'}`;

return string;
}