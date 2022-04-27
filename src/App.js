import logo from './logo.svg';
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

  function padClick(e){
    let sym = e.target.innerText;
    if(sym === 'AC'){
      setmydisplay('')
    }
    else if(sym === '.' && mydisplay.indexOf('.') !== -1){
    }
    else if(sym === '0' && mydisplay.indexOf('0') !== -1){
    }
    else if(
            (sym === '-' || sym === '+' || sym === '*' || sym === '/') 
            && 
            (mydisplay.lastIndexOf('-') !== -1 || mydisplay.lastIndexOf('+') !== -1 || mydisplay.lastIndexOf('*') !== -1 || mydisplay.lastIndexOf('/') !== -1 )){
    }
    else{
      setmydisplay(mydisplay + sym)
    }
    console.log(mydisplay);
    }
    
    function calculate(){

        var f = {
          add: '+',
          sub: '-',
          div: '/',
          mlt: '*',
        };
      
        // Create array for Order of Operation and precedence
        f.ooo = [
          [
            [f.mlt],
            [f.div],
          ],
          [
            [f.add],
            [f.sub]
          ]
        ];
      
        var handleinput = mydisplay.replace(/[^0-9%^*/()\-+.]/g, ''); // clean up unnecessary characters
        var output;
        for (var i = 0, n = f.ooo.length; i < n; i++) {
      
          // Regular Expression to look for operators between floating numbers or integers
          var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
          re.lastIndex = 0; // take precautions and reset re starting pos
      
          // Loop while there is still calculation for level of precedence
          while (re.test(handleinput)) {
            output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output)) 
              return output; // exit early if not a number
              handleinput = handleinput.replace(re, output);
          }
        }
      
        function _calculate(a, op, b) {
          a = a * 1;
          b = b * 1;
          switch (op) {
            case f.add:
              return a + b;
              break;
            case f.sub: 
            return a - b;
              break;
            case f.div:
              return a / b;
              break;
            case f.mlt:
              return a * b;
              break;
            default: {};
          }
        }
        
    setmydisplay(handleinput);

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
