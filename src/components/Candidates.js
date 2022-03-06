import React from 'react'


//候选人组件
class Candidates extends React.Component {

  render() {
    return (
        <div className="col-md-6 text-left">
        
            <table className="table table-bordered">
            <thead>
                <tr>
                <th colSpan="3" className="bg-info">
                    选举人信息
                </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                <td>zhangsan</td>
                <td id="candidate-1" className="text-center">
                {this.props.candidateList.zhangsan}
                </td>
                </tr>
                <tr>
                <td>lisi</td>
                <td id="candidate-2" className="text-center">
                {this.props.candidateList.lisi}
                </td>

                </tr>
                <tr>
                <td>wangwu</td>
                <td id="candidate-3" className="text-center">
                {this.props.candidateList.wangwu}
                </td>

                </tr>
            </tbody>
            </table>
      </div>
     
    )
  }
}

export default Candidates