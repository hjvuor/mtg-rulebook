import React from 'react'
import Rule from './Rule'
import styles from './mystyle.module.css'

class Section extends React.Component{


    onClick() {
        this.props.toggleSection(this.props.section)
        console.log('kulli')
    }

    render(){

        return(
        <div className={styles.section}>
            <p onClick={() => this.onClick()}> {this.props.section.section}</p>
        </div>
        )
    }
}
export default Section