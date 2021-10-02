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
      sidebar: false
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
    const sidebarState = this.state.sidebar
    this.setState({sidebar: !sidebarState})
    console.log(this.state.sidebar)
  }


  render(){
    console.log('render')

    if(this.state.sidebar === true){
      return (
        <div>
        <Header sidebar={this.toggleSidebar}/>
        <div className={styles.layout}>
          <div className={styles.sidebarContainer}>
          <div className={styles.sidebar}>
            <Sidebar 
              chapters={this.state.chapters} 
              toggleSection={this.toggleSection}
              sidebar={this.toggleSidebar}
            />
          </div>
          </div>

          <div className={styles.mainSidebarOn} onClick={() => this.toggleSidebar()}>
            <div className={styles.content}>
              <h1>{this.state.activeSection.section}</h1>
              <br></br><br></br>
              {Object.values(this.state.activeSection).slice(1).map(rule =>(
                <p>{rule.rule}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      )
    }
    
    return (
      <div>
        <Header sidebar={this.toggleSidebar}/>
        <div className={styles.layout}>

          <div className={styles.main}>
            <div className={styles.content}>
              <h1>{this.state.activeSection.section}</h1>
              <br></br><br></br>
              {Object.values(this.state.activeSection).slice(1).map(rule =>(
                <p>{rule.rule}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )


  }
}

export default App;
