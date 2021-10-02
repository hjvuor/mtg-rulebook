import React from 'react'
import styles from './mystyle.module.css'
//import Button from 'react-bootstrap/Button'

const Header = (props) => {
        console.log('header props: '+ JSON.stringify(props))
        return(
        <div className={styles.header}>
            
            <span onClick={() => props.sidebar()}
                className={styles.sidebarButton}>CHAPTERS</span>
            <span className={styles.title}>Magic The Gathering Rulebook</span>
          
            
        </div>
        )
    }
export default Header