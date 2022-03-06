import React from 'react'


//Tokens组件
class Tokens extends React.Component {


  buyToken() {
    //获取框的内容
    const wei = this.refs["wei"].value
    //调用父亲身上的buy方法
    this.props.app.buy(wei) 
  }


  render() {
    return (
        <div className="col-md-6 text-left">
        <table className="table table-bordered">
                 <thead>
                   <tr>
                     <th colSpan="2" className="bg-info">
                       代币(token)信息
                     </th>
                   </tr>
                 </thead>
       
                 <tbody>
                   <tr>
                     <td>发行总量:</td>
                     <td id="totalTokens" className="text-center">
                         {this.props.totalTokens}
                     </td>
                   </tr>
                   <tr>
                     <td>剩余总量:</td>
                     <td id="balanceTokens" className="text-center">
                     {this.props.balanceOfTokens}
                     </td>
                   </tr>
                   <tr>
                       <td>token购买价格:</td>
                       <td id="tokenPrePrice" className="text-center">
                       {this.props.priceOfToken}wei / 1 Token
                       </td>
                   </tr>
       
                   <tr>
                       <td>token售出总量:</td>
                       <td id="tokensSold" className="text-center">
                           {this.props.tokenSold}
                       </td>
                   </tr>
       
                   <tr>
                     <td> 
                       <input ref="wei" type="text" className="form-control" placeholder={this.props.priceOfToken+"wei / 1 Token"} />
                 </td>
       
                     <td id="tokenSold" className="text-center">
                         <button className="btn btn-primary" onClick={this.buyToken.bind(this)}>购买token</button>
                     </td>
                 </tr>
       
       
                 </tbody>
       
       
       
               </table>
       
       </div>
    )
  }
}

export default Tokens