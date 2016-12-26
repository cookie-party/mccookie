import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

export default class Words extends Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      index: 0,
      viewable: false
    };
  }

  onNext() {
    const now = this.state.index;
    if(now < this.props.wordList.length - 1){
      this.setState({index: now+1});
    }
  }

  onBack() {
    const now = this.state.index;
    if(now > 0){
      this.setState({index: now-1});
    }
  }

  onAte(id) {
    this.props.emitter.emit('cookieAte', id, true);
  }

  onEver(id) {
    this.props.emitter.emit('cookieAte', id, false);
  }

  onViewable() {
    this.setState({viewable: !this.state.viewable});
  }

  render() {
    const styles = {
      back:{
        height: 400,
        width: 450,
        margin: '0 auto',
        textAlign: 'center',
        display: 'inline-block',
      },
      paper:{
        height: 100,
        width: 400,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      },
      meaningpaper: {
        height: 100,
        width: 400,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        cursor: 'pointer'
      },
      button:{
        margin: 12,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      }, 
    };

    const ateButton = (id, ate) => {
      return ate? (
        <RaisedButton
          label="Ever"
          labelPosition="before"
          style={styles.button}
          onTouchTap={this.onEver.bind(this, id)}
        />)
        :
      (<RaisedButton
          label="Ate"
          labelPosition="before"
          primary={true}
          style={styles.button}
          onTouchTap={this.onAte.bind(this, id)}
        />
      );
    };

    const viewableComponent = (component, viewable)=>{
      return viewable ? component : (
        <div></div>
      );
    };

    const wordView = (word)=>{
      const strstyle = {
        fontSize: '31pt',
        fontColor: '#812da9'
      };
      return (
        <p style={strstyle}>{word}</p>
      );
    };

    const wordList = this.props.wordList.map((word, id)=>{
      return (
        <Paper style={styles.back} zDepth={1}>
          <table><tbody>
          <tr>
            <td colSpan='3'>
              <Paper style={styles.paper} zDepth={3} >
                {wordView(word.key)}
              </Paper>
            </td>
          </tr>
          <tr>
            <td>
              <IconButton iconStyle={styles.mediumIcon} onTouchTap={this.onBack.bind(this)}> 
                <ArrowLeft />
              </IconButton>
            </td>
            <td>
                {ateButton(id, word.ate)}
            </td>
            <td>
              <IconButton iconStyle={styles.mediumIcon} onTouchTap={this.onNext.bind(this)}>
                <ArrowRight />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td colSpan='3'>
              <Paper style={styles.meaningpaper} zDepth={3} onTouchTap={this.onViewable.bind(this)} >
                {viewableComponent(wordView(word.value),this.state.viewable)}
              </Paper>
            </td>
          </tr>
          </tbody></table>
        </Paper>
      );
    });

    return (
      <div>
        {wordList[this.state.index]}
      </div> 
    );
  }

}
