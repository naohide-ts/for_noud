'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
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
        this.setState({ liked: true }) 
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
   return (
    e("div", { className: 'shiritori' },
      e('button',{},"test"), 
      e("table", { className: 'shiritori' },
        e("tbody", {},
          e("tr", {},
            e("td", {}, "aa"),
            e("td", {}, "ai")
          ),
          e("tr", {},
            e("td", {}, "aa"),
            e("td", {}, "ai")
          )
        )
      )
    )
  );

  }
}

const domContainer = document.querySelector('#page_body');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));