import React from 'react'

class Rule extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }
    toggleShow() {
        const currentState = this.state.show;
        this.setState({ show: !currentState });
        console.log(Object.values(this.props.rule))
    };

    render(){

        if(this.state.show === true){
            return(
                <div>
                    <p onClick={() => this.toggleShow()}>{this.props.rule.ruleKey}</p>
                    <p>{this.props.rule.rule}</p>
                </div>
            )
        }


        return(
        <div>
            <p onClick={() => this.toggleShow()}>{this.props.rule.ruleKey}</p>
        </div>
        )
    }
}
export default Rule