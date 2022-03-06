import React from 'react'


//投票人详情组件
class Details extends React.Component {



  render() {
    //统计消耗量
    let used = 0 
    for(let item of this.props.details[1]) {
      used += parseInt(item) 
    }


    return (
        <div className="col-md-6 text-left">
        
            <table className="table table-bordered">
            <thead>
                <tr>
                <th colSpan="4" className="bg-info">
                    投票人详情
                </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                <td>投票人EOA：</td>
                <td id="candidate-1" className="text-center">
                {this.props.eoa}
                </td>
                </tr>
                <tr>
                <td>拥有的Token数量：</td>
                <td id="candidate-2" className="text-center">{this.props.details[0]}</td>
                
                </tr>
                <tr>
                <td>消耗的Token数量：</td>
                <td id="candidate-3" className="text-center">
                {used} 
                </td>
                </tr>

                <tr>
                <td>可用的Token数量：</td>
                <td id="candidate-3" className="text-center">
                { parseInt(this.props.details[0])-used } 
                </td>
                </tr>

            </tbody>
            </table>
      </div>
     
    )
  }
}

export default Details