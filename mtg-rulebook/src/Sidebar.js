import React from 'react'
import Chapter from './Chapter';
import styles from './mystyle.module.css'


const Sidebar = (props) => {
        return(
        <div>
            {props.chapters.map(chapter =>
            <Chapter chapter={chapter} key={chapter.chapterName} toggleSection={props.toggleSection}/>
            )}
            
        </div>
        )
    }
export default Sidebar