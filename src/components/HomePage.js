import React, {Component} from 'react';

class HomePage extends Component{

    goToPayPage = () => {
        this.props.push('/payForm')
    }

    render(){
        return(
            <>
                <h2>Home Page</h2>
                <button onClick={this.goToPayPage} >Go to Shopping Page</button>
            </>
        )
    }
}

export default HomePage