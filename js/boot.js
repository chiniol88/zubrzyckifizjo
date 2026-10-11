// Uruchomienie aplikacji: bezpiecznik na całą aplikację + start React. (Wcześniej inline w index.html.)
class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={err:null};}
  static getDerivedStateFromError(e){return {err:e};}
  render(){
    if(this.state.err){
      return React.createElement('div',{style:{padding:24,fontFamily:"monospace",fontSize:13,background:"#FEE2E2",minHeight:"100vh",color:"#1C2B3A"}},
        React.createElement('div',{style:{fontWeight:700,fontSize:16,marginBottom:12,color:"#E05C5C"}},"Blad aplikacji"),
        React.createElement('div',{style:{marginBottom:8,wordBreak:"break-all"}},String(this.state.err)),
        React.createElement('div',{style:{fontSize:11,color:"#7A8FA6",wordBreak:"break-all",whiteSpace:"pre-wrap"}},this.state.err&&this.state.err.stack),
        React.createElement('button',{onClick:()=>this.setState({err:null}),style:{marginTop:16,padding:"8px 16px",background:"#3E6FB0",color:"#fff",border:"none",borderRadius:8,cursor:"pointer"}},"Sprobuj ponownie")
      );
    }
    return this.props.children;
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(ErrorBoundary,null,React.createElement(AppWrapper)));
