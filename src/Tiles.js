import React,{Component} from 'react'


class Tiles extends Component{
    render(){
        const allTiles = () =>{
            let tileArr = [];
            for(let i =0;i<9;i++){
                tileArr.push(
                    <div className="tile" onClick = {this.props.click} id={i} key={i}></div>
                );
            }
            return tileArr;
        }
        return(
            <div>
                {allTiles()}
            </div>
        )
    }
}

export default Tiles;