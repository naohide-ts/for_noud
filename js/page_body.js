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
  console.log(voicePath);
}

function clickPageButton(parent, buttonNum){
  let selectedButon = parent.state.selectedButon;

  if(selectedButon!=buttonNum){
    let newButtonStrs = []
    for(let i = 0; i < parent.state.buttonStrs.length; i++){
      newButtonStrs.push('off');
    }
 
    newButtonStrs[buttonNum] = 'on';
    parent.setState({selectedButon:buttonNum, buttonStrs:newButtonStrs});
  }
}

function createPage(parent){
  let page = parent.state.page;

  let topViewElems = [
    e('button',{key:"button0", className:'btn-flat-simple ' + parent.state.buttonStrs[0], id:'hiraganaButton', 
      onClick: () =>{clickPageButton(parent, 0);}},"ຕົວອັກສອນພາສາຍີ່ປຸ່ນ"),
    e('button',{key:"button1", className:'btn-flat-simple ' + parent.state.buttonStrs[1], id:'word', 
      onClick: () =>{clickPageButton(parent, 1);}},"\u00A0\u00A0ຄໍາ\u00A0\u00A0"), 
    e('button',{key:"button2", className:'btn-flat-simple ' + parent.state.buttonStrs[2], id:'sentence', 
      onClick: () =>{clickPageButton(parent, 2);}},"ປະໂຫຍກ")  
  ];

  if(parent.state.selectedButon==0){
    let data = charData; 
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
              {key: 'column'+String(j)+'_row'+String(i), className:"charTable", 
                onClick: () =>{pronounce(voiceStr);}},
              tr_elem[j])
          );
        }
      }

      tr_list.push(e("tr", {key: 'row'+String(i)},tdList));
    }
    
    topViewElems.push(e("table", { key:"charTable", className: 'viewTable'},e("tbody", {}, tr_list)));
  }else if(parent.state.selectedButon==1){
    let data = wordData; 
    let tr_list = [];

    for(let i = 0; i < setting.sizeAtPage; i++){
      let dataIndex = setting.sizeAtPage * page + i;

      if (dataIndex >= data.length){
        break;
      }

      let tr_elem = data[dataIndex];
      let tdList = [];

      let voiceStr = tr_elem[tr_elem.length-1];
      
      for(let j = 1; j < tr_elem.length-1 ; j++){
        tdList.push(
          e("td", 
            {key: 'column'+String(j)+'_row'+String(i), className:"wordTable", 
              onClick: () =>{pronounce(voiceStr);}},
            tr_elem[j])
        );
      }

      tr_list.push(e("tr", {key: 'row'+String(i)},tdList));
    }
    
    topViewElems.push(e("table", { key:"charTable", className: 'viewTable'},e("tbody", {}, tr_list)));
  }else if(parent.state.selectedButon==2){
    let data = sentenceData; 
    let tr_list = [];

    for(let i = 0; i < setting.sizeAtPage; i++){
      let dataIndex = setting.sizeAtPage * page + i;

      if (dataIndex >= data.length){
        break;
      }

      let tr_elem = data[dataIndex];
      let tdList = [];

      let voiceStr = tr_elem[tr_elem.length-1];
      
      for(let j = 1; j < tr_elem.length-1 ; j++){
        tdList.push(
          e("td", 
            {key: 'column'+String(j)+'_row'+String(i), className:"sentenceTable", 
              onClick: () =>{pronounce(voiceStr);}},
            tr_elem[j])
        );
      }

      tr_list.push(e("tr", {key: 'row'+String(i)},tdList));
    }
    
    topViewElems.push(e("table", { key:"charTable", className: 'viewTable'},e("tbody", {}, tr_list)));

  }

  return (e("div", { id: 'topView'}, topViewElems));
}

class WordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      page: 0, 
      selectedButon: 0, 
      buttonStrs: ['on', 'off', 'off']
    };
  }

  render() {    
    return createPage(this);
  }
}

const domContainer = document.querySelector('#page_body');
const root = ReactDOM.createRoot(domContainer);
root.render(e(WordTable));