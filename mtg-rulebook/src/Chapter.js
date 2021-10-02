import React from 'react'
import Section from './Section'
import styles from './mystyle.module.css'


class Chapter extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }
    toggleShow() {
        const currentState = this.state.show;
        this.setState({ show: !currentState });
    };

    render(){

        if(this.state.show === true){
            return(

                <div >
                    <div className= {styles.chapter}
                         onClick={() => this.toggleShow()}
                    >
                        <p>{this.props.chapter.chapterName}</p>
                    </div>
                    {Object.values(this.props.chapter).slice(1).map(section =>
                    <Section
                        className={styles.section}
                        section={section} 
                        key={section.section}
                        toggleSection={this.props.toggleSection}
                        />    
                    )}
                </div>
            )
        }

        return(
        <div className= {styles.chapter}  onClick={() => this.toggleShow()}>
            <p >
                {this.props.chapter.chapterName}
            </p>
        </div>
        )
        }
    }
export default Chapter