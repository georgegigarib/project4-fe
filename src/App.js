import './App.css';
import {useState} from 'react'
const numbers = [
  

  {value:7,
  id:'seven',
  class:'numbers'   },
  {value:8,
  id:'eight',
  class:'numbers'   },
  {value:9,
  id:'nine',
  class:'numbers'   },

  {value:'*',
  id:'multiply',
  class:'operators'   },

  {value:4,
  id:'four',
  class:'numbers'   },
  {value:5,
  id:'five',
  class:'numbers'   },
  {value:6,
  id:'six',
  class:'numbers'   },
    
  {value:'/',
  id:'divide',
  class:'operators'   },
    
  {value:1,
  id:'one',
  class:'numbers'   },
  {value:2,
  id:'two',
  class:'numbers'   },
  {value:3,
  id:'three',
  class:'numbers'   },

  {value:'-',
  id:'substract',
  class:'operators'   },

  {value:'.',
  id:'decimal',
  class:'numbers'   },

  {value:0,
  id:'zero',
  class:'zero'   },

  {value:'AC',
  id:'clear',
  class:'ac'   },

  {value:'+',
  id:'add',
  class:'operators'   },

];


const App = () => {

  const [mydisplay, setmydisplay] = useState('');
  const [haypunto, sethaypunto] = useState(false);
  const [negacount, setnegacount] = useState(0);
  const [keyCounter, setkeyCounter] = useState(0);

  function padClick(e){
    let sym = e.target.innerText;
    let last = mydisplay.length;
    if(sym === 'AC'){
      setmydisplay('')
      sethaypunto(false);
      setnegacount(0);
      setkeyCounter(0);
    }
      else if(sym === '.'){

        if(haypunto){}

        else{
          var lasti = mydisplay.charAt(mydisplay.length -1);
          console.log(lasti, 'el lasti');
            if(lasti === ''){
              setmydisplay(mydisplay + '0' + sym);
              sethaypunto(true);
            }
              else if(lasti <= 9 && keyCounter === 1){
                setmydisplay(mydisplay + sym);
                sethaypunto(true);
              }
              else if(mydisplay !== '' && keyCounter === 0){
                setmydisplay('0' + sym);
                setkeyCounter(1);
                sethaypunto(true);
              }
                else{
                  setmydisplay(mydisplay + '0' + sym);
                  sethaypunto(true);
                  }
            }
      }
      
      else if(sym === '0' && mydisplay.indexOf('0') !== -1){}

      else if(sym === '-'){
        sethaypunto(false);
          if(negacount < 3){
            setkeyCounter(1);
                if(negacount === 0){
                setmydisplay(mydisplay + sym);
                setnegacount(negacount + 1)
                }
                  else if( negacount === 1){
                    setmydisplay(mydisplay.slice(0,-1) + '+');
                    setnegacount(negacount + 1)
                  }
                  else if(negacount === 2 && last > 1){
                    setmydisplay(mydisplay.slice(0, -1) + sym);
                    setnegacount(1)
                  }
                    else{}
                }
        if (mydisplay.lastIndexOf('+-')=== last-2 && last >1){
          setmydisplay(mydisplay.slice(0,-2) + '+');
              setnegacount(negacount + 1)
        }
      }
      else if((sym === '+' || sym === '*' || sym === '/') && mydisplay.length > 0){
        sethaypunto(false);
          console.log(mydisplay.lastIndexOf('+-'), last);
        if(((mydisplay.lastIndexOf('+-')=== last-2) || (mydisplay.lastIndexOf('-+')=== last-2)
        || (mydisplay.lastIndexOf('*-')=== last-2) || (mydisplay.lastIndexOf('*+')=== last-2)
        || (mydisplay.lastIndexOf('/-')=== last-2) || (mydisplay.lastIndexOf('/+')=== last-2)) && last > 1){
          setmydisplay(mydisplay.slice(0, -2) + sym);
          console.log('el llega aqui 1');
          setkeyCounter(1);
      }
        else {
          if((mydisplay.lastIndexOf('-') === last-1  || mydisplay.lastIndexOf('+') === last-1 || 
          mydisplay.lastIndexOf('*') === last-1 || mydisplay.lastIndexOf('/') === last-1 )){
          setmydisplay(mydisplay.slice(0,-1) + sym);
                    console.log('el llega aqui si 2');
                    setkeyCounter(1);
        }
        else{
          setmydisplay(mydisplay + sym);
          console.log('el llega aqui 3');
          setkeyCounter(1);
        }
      }
      }

      else if((sym === '+' || sym === '*' || sym === '/') && mydisplay.length === 0){}

      else if(sym <= 9 && keyCounter === 0){
        setmydisplay(sym);
      setkeyCounter(1);
      }
    else{
      setmydisplay(mydisplay + sym);
    setnegacount(0);
    }
    
    }
    
    function calculate(){
       try {
       var result = eval(mydisplay);
       setmydisplay(result.toString());
       setkeyCounter(0);
       sethaypunto(false);
       setnegacount(0);
       console.log(result);
       } catch (error) {
         console.log(error);
       }

    }


  return (
    <div className="App">
      <header className="App-header">
        <div id="calcu" >
        <div id="display">{mydisplay}</div>
        <div className="numspace">
        {numbers.map((num) => {
            return <div onClick={padClick} className={num.class} key={num.id} id={num.id} >{num.value}</div>
        })}
        <div className="equals" onClick={calculate} id='equals' value='equal'>=</div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
