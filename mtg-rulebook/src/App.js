import React from 'react';
import axios from '../../backend/node_modules/axios';
import Sidebar from './Sidebar';
import styles from './mystyle.module.css'
import Header from './Header'


class App extends React.Component {
  
  constructor(props) {

    super(props)
    console.log('constructor')
    this.toggleSection = this.toggleSection.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.state = {
      hello: '',
      chapters: [],
      activeSection: {},
      sidebarWidth: "0px"
    }
  }
  
  
  componentDidMount(){
    axios.get('http://localhost:3001/rules').then(res => {
      this.setState({chapters: Object.values(res.data)})
      this.setState({activeSection: Object.values(this.state.chapters[0])[1]})
      console.log(this.state)
  }
    )
  }

  toggleSection(section){
    console.log(this)
    this.setState({activeSection: section})
    window.scrollTo(0, 0)
    console.log('active section is: ' + this.state.activeSection.section)
  }

  toggleSidebar() {
    const sidebarState = this.state.sidebarWidth
    if(sidebarState === "0px"){
      this.setState({sidebarWidth: "300px"})
    }else{
      this.setState({sidebarWidth: "0px"})
    }
    console.log(this.state.sidebarWidth)
  }


  render(){
    console.log('render')

    return (
      <div>
      <Header sidebar={this.toggleSidebar}/>
      <div className={styles.layout}>
        <div className={styles.sidebarContainer} style={{width: this.state.sidebarWidth}}>
        <div className={styles.sidebar}>
          <Sidebar 
            chapters={this.state.chapters} 
            toggleSection={this.toggleSection}
          />
        </div>
        </div>
        <div  className={styles.main}
              style={{marginLeft: this.state.sidebarWidth}}
              onClick={() => this.setState({sidebarWidth: "0px"})}
              >
          <div className={styles.content}>
            <h1>{this.state.activeSection.section}</h1>
            {Object.values(this.state.activeSection).slice(1).map(rule =>(
              <p key={rule.ruleKey}>{rule.rule}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App;
