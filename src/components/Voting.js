import React from 'react'


//投票组件
class Voting extends React.Component {

  votingFor() {
    this.props.app.voting(this.refs['candidateName'].value,parseInt(this.refs['tokenNum'].value ) )
  }


  render() {
    return (
      <div className="col-md-6">
      <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="2" className="bg-info">
                投票区域
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>选举人:</td>
              <td id="candidate-1" className="text-center">
                  <input type="text" className="form-control" ref="candidateName" placeholder="请输入候选人的名字" />
              </td>
            </tr>
            <tr>
              <td>token数量:</td>
              <td id="candidate-2" className="text-center">
                  <input type="text" className="form-control" ref="tokenNum" placeholder="请输入可用的token数量" />
              </td>
            </tr>

          </tbody>
          <tfoot>
              <tr>
                <td colSpan="2"  className="text-center">
                  <button className="btn btn-primary" id="voteBtn" onClick={this.votingFor.bind(this) }>确认投票</button>
                </td>
              </tr>
            </tfoot>


        </table>
</div>
    )
  }
}

export default Voting 