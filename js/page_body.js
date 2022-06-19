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

function createWordTable(data, page){
  
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
  
  return (
    e("div", { id: 'topView'},
      //e('button',{id:'button', onClick: () =>{alert('test');}},"test"), 
      e("table", { className: 'viewTable'},
        e("tbody", {},tr_list)
      )
    )
  );
  
  /* ok 
 return e(
  'button',
  { onClick: () =>{alert('test'); }},
  'Like'
  );
  */
}

class WordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 0};
  }

  render() {
    /*
    if (this.state.liked) {
      return 'You liked this.';
    }
    */
    /*
    return e(
      'button',
      { onClick: () =>{ 
        alert('test'); 
      }},
      'Like'
    );
    */
    
    /*
    return (
      e("ul", { className: 'shiritori' }, 
        e("li", null, 'コアラ'), 
        e("li", null, 'ラッパ'), 
        e("li", null, 'パリ'), 
        e("li", null, 'リンゴ')
      )
    );
    */
    
    
    return createWordTable(wordData, this.state.page);
  }
}

const domContainer = document.querySelector('#page_body');
const root = ReactDOM.createRoot(domContainer);
root.render(e(WordTable));