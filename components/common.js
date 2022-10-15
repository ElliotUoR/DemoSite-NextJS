///common components 

//Capitilises first word in string

export default function Common(){

  return '';
}


export function CapWord(word){
    return word[0].toUpperCase()+word.slice(1,word.length+1);

}

export function sleep(ms){
  return new Promise(r => setTimeout(r,ms));
}