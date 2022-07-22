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

function clickContentBtn(parent, buttonNum){
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

function clickMode1PageBtn(parent, buttonNum){
  let selectedButon = parent.state.mode1Page;

  if(selectedButon!=buttonNum){
    let newButtonStrs = []
    for(let i = 0; i < parent.state.mode1BtnStrs.length; i++){
      newButtonStrs.push('off');
    }
 
    newButtonStrs[buttonNum] = 'on';
    parent.setState({mode1Page:buttonNum, mode1BtnStrs:newButtonStrs});
  }
}

function clickMode2PageBtn(parent, buttonNum){
  let selectedButon = parent.state.mode2Page;

  if(selectedButon!=buttonNum){
    let newButtonStrs = []
    for(let i = 0; i < parent.state.mode2BtnStrs.length; i++){
      newButtonStrs.push('off');
    }
 
    newButtonStrs[buttonNum] = 'on';
    parent.setState({mode2Page:buttonNum, mode2BtnStrs:newButtonStrs});
  }
}


function createContent(parent){
  let topViewElems = [
    e('button',{key:"button0", className:'btn-flat-simple ' + parent.state.buttonStrs[0], id:'hiraganaButton', 
      onClick: () =>{clickContentBtn(parent, 0);}},"ຕົວອັກສອນພາສາຍີ່ປຸ່ນ"),
    e('button',{key:"button1", className:'btn-flat-simple ' + parent.state.buttonStrs[1], id:'word', 
      onClick: () =>{clickContentBtn(parent, 1);}},"\u00A0\u00A0ຄໍາ\u00A0\u00A0"), 
    e('button',{key:"button2", className:'btn-flat-simple ' + parent.state.buttonStrs[2], id:'sentence', 
      onClick: () =>{clickContentBtn(parent, 2);}},"ປະໂຫຍກ"),
    e('br',{key:"br"}),
    
  ];

  if(parent.state.selectedButon==0){
    let page = parent.state.page;
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
    let page = parent.state.mode1Page;
    let data = wordData; 
    let tr_list = [];
    let pageBtnNum =  Math.ceil(data.length / setting.sizeAtPage);

    if(parent.state.mode1BtnStrs.length != pageBtnNum){
      for(let i = 0; i < pageBtnNum; i++){
        parent.state.mode1BtnStrs.push("off");
      }
      parent.state.mode1BtnStrs[page] = "on";
    }

    for(let i = 0; i < pageBtnNum; i++){
      topViewElems.push(
        e('button',{key:"pageBtn" + i.toString(), className:'btn-flat-simple ' + parent.state.mode1BtnStrs[i], id:'pageBtn', 
          onClick: () =>{clickMode1PageBtn(parent, i)}}, i.toString()),
        );
    }

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
    let page = parent.state.mode2Page;
    let data = sentenceData; 
    let tr_list = [];
    let pageBtnNum =  Math.ceil(data.length / setting.sizeAtPage);

    if(parent.state.mode2BtnStrs.length != pageBtnNum){
      for(let i = 0; i < pageBtnNum; i++){
        parent.state.mode2BtnStrs.push("off");
      }
      parent.state.mode2BtnStrs[page] = "on";
    }

    for(let i = 0; i < pageBtnNum; i++){
      topViewElems.push(
        e('button',{key:"pageBtn" + i.toString(), className:'btn-flat-simple ' + parent.state.mode2BtnStrs[i], id:'pageBtn', 
          onClick: () =>{clickMode2PageBtn(parent, i)}}, i.toString()),
        );
    }


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
      mode1Page: 0,
      mode2Page: 0,
      selectedButon: 0, 
      buttonStrs: ['on', 'off', 'off'],
      mode1BtnStrs: [],
      mode2BtnStrs: [],
    };
  }

  render() {    
    return createContent(this);
  }
}

const domContainer = document.querySelector('#page_body');
const root = ReactDOM.createRoot(domContainer);
root.render(e(WordTable));