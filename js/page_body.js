'use strict';

const e = React.createElement;

const setting = {
  sizeAtPage: 13
};

let voice = new Audio();
const voiceDir = "sounds/"
console.log("start");

function pronounce(voiceStr){
  let voicePath = voiceDir+voiceStr;
  voice.pause();
  voice.setAttribute('src', voicePath); 
  voice.load(); 
  voice.play(); 
  //alert(voiceStr);
  console.log(voicePath);
}

function clickPageButton(parent, buttonNum, buttonId){
  let selectedButon = parent.state.selectedButon;

  if(selectedButon!=buttonNum){
    document.getElementById("hiraganaButton").classList.remove('on');
    document.getElementById("button2").classList.remove('on');
    document.getElementById("button3").classList.remove('on');
    document.getElementById("hiraganaButton").classList.add('off');
    document.getElementById("button2").classList.add('off');
    document.getElementById("button3").classList.add('off');
    document.getElementById(buttonId).classList.remove('off');  
    document.getElementById(buttonId).classList.add('on');
    parent.state.selectedButon = buttonNum;
  }
}

function createPage(data, parent){
  let page = parent.state.page;
  let tr_list = [];

  for(let i = 0; i < setting.sizeAtPage; i++){
    let dataIndex = setting.sizeAtPage * page + i;

    if (dataIndex >= data.length){
      break;
    }

    let tr_elem = data[dataIndex];
    let tdList = [];

    if (tr_elem[0] == "hiragana" || tr_elem[0] == "Lao-JP"){
      for(let j = 1; j < tr_elem.length/2 ; j++){
        let voiceStr = tr_elem[parseInt(j+(tr_elem.length-1)/2)];
        tdList.push(
          e("td", 
            {key: 'column'+String(j)+'_row'+String(i), className:"hoge", 
              onClick: () =>{pronounce(voiceStr);}},
            tr_elem[j])
        );
      }
    }

   tr_list.push(e("tr", {key: 'row'+String(i)},tdList));
  }
  

  let hiraganaButtonStr = 'off', button2Str = 'off', button3Str = 'off';

  if(parent.state.selectedButon==0){
    hiraganaButtonStr = 'on';
  }else if(parent.state.selectedButon==1){
    button2Str = 'on';
  }else if(parent.state.selectedButon==2){
    button3Str = 'on';
  }

  return (
    e("div", { id: 'topView'},
      e('button',{className:'btn-flat-simple ' + hiraganaButtonStr, id:'hiraganaButton', 
        onClick: () =>{clickPageButton(parent, 0, 'hiraganaButton');}},"ຕົວອັກສອນພາສາຍີ່ປຸ່ນ"),
      e('button',{className:'btn-flat-simple ' + button2Str, id:'button2', 
        onClick: () =>{clickPageButton(parent, 1, 'button2');}},"\u00A0\u00A0ຄໍາ\u00A0\u00A0"), 
      e('button',{className:'btn-flat-simple ' + button3Str, id:'button3', 
        onClick: () =>{clickPageButton(parent, 2, 'button3');}},"ປະໂຫຍກ"),  
      e("table", { className: 'viewTable'},
        e("tbody", {},tr_list)
      )
    )
  );
}

class WordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, selectedButon: 0};
  }

  render() {    
    return createPage(wordData, this);
  }
}

const domContainer = document.querySelector('#page_body');
const root = ReactDOM.createRoot(domContainer);
root.render(e(WordTable));