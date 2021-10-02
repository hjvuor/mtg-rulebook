import React from 'react'
import Chapter from './Chapter';


const Chapters = (props) => {
        return(
        <div>
            {props.chapters.map(chapter =>
            <Chapter chapter={chapter} key={chapter.chapterName} />
            )}
        </div>
        )
    }
export default Chapters