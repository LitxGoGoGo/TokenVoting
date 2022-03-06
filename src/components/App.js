import React from 'react'
import Candidates from './Candidates'
import Tokens from './Tokens'
import Voting from './Voting'
import Details from './Details'

//引入web3引入一个自定义的web3
import web3 from './libs/web3'
//引入
import axios from 'axios'
//App是所有子组的容器
class App extends React.Component {

  constructor(...args) {
    super(...args) 
    //合约实例的类变量
    this.contract = null 
    //定义状态变量
    this.state = {
      candidates:{
        zhangsan:"-",  //0x1111
        lisi:"-",    //0x2222
        wangwu:"-"  //0x3333
      },
      //写一个映射关系
      candidatesBytes:{
        zhangsan:"0x1111",
        lisi:"0x2222",
        wangwu:"0x3333" 
      },
      //初始details
      details:{
        0:0,
        1:[]
      },
      //定义metamask状态变量
      metaMask:"",
      //发行总量
      totalTokens:0,
      //剩余量
      balanceOfTokens:0,
      //单价
      priceOfToken:0,
      //售出总量
      tokenSold:0
    }
  }

  voting = async (candidateName,tokenNumber) => {
    //获取候选人的bytecode 
    const candidate = this.state.candidatesBytes[candidateName] 
    //当前的metaMask用户投票
    const metaMask = await window.ethereum.enable() 
    //投票
    await this.contract.methods.votingFor(candidate,tokenNumber).send({
      from:metaMask[0],
      gas:6000000
    })

    //读取区块链中的合约信息，来初始化候选人票数
    //获取初始值
    const candidates = this.state.candidates 
   
    for(let key in this.state.candidatesBytes) {
       let count = await this.contract.methods.getCandidateCount( this.state.candidatesBytes[key] ).call() 
       candidates[key] = count
    }
    //更新投票人详情
    const details = await this.contract.methods.getVoterDetails(metaMask[0]).call() 
    //修改状态
    this.setState({
      candidates,
      details
    })


  }




  //购买token的函数
  buy = async (wei)=>{
     //获取metaMask的账户
     const metaMask = await window.ethereum.enable() 
    //调用合约中购买的方法
    await this.contract.methods.buyToken().send({
      from: metaMask[0],
      gas:6000000,
      value:wei 
    })
    //购买成功后，要更新: 剩余量，发售量，投票的人拥有总量
    //更新token的信息
    const balanceOfTokens = await this.contract.methods.balanceOfTokens().call() //剩余量
    const tokenSold = await this.contract.methods.getTokensoldNum().call() //售出总量    
    //更新投票人详情
    const details = await this.contract.methods.getVoterDetails(metaMask[0]).call() 
        //修改状态
    this.setState({
          details,
          metaMask:metaMask[0],
          balanceOfTokens,
          tokenSold
    })
  }



  //做初始化，应该在生命周期函数中是做
  componentDidMount = async ()=>{
    //获取metaMask的账户
    const metaMask = await window.ethereum.enable() 
    //获取合约的地址和abi 
    const contractInfo = await axios.get("http://localhost:8686/contract?contract=VotingByToken") 
    //console.log(contractInfo.data.data.address)  
    //console.log(contractInfo.data.data.abi)   
    const address = contractInfo.data.data.address
    const abi = JSON.parse( contractInfo.data.data.abi )
    //部署合约: 使用地址和abi来部署
    this.contract = new web3.eth.Contract(abi,address) 
    //读取区块链中的合约信息，来初始化候选人票数
    //获取初始值
    const candidates = this.state.candidates 
    console.log("before candidates:",candidates) 
    for(let key in this.state.candidatesBytes) {
       let count = await this.contract.methods.getCandidateCount( this.state.candidatesBytes[key] ).call() 
       candidates[key] = count
    }
    console.log("before after:",candidates) 

    //更新投票人详情
    const details = await this.contract.methods.getVoterDetails(metaMask[0]).call() 
    
    //更新token的信息
    const totalTokens = await this.contract.methods.totalTokens().call()  //发行总量
    const balanceOfTokens = await this.contract.methods.balanceOfTokens().call() //剩余量
    const priceOfToken = await this.contract.methods.priceOfToken().call() //单价
    const tokenSold = await this.contract.methods.getTokensoldNum().call() //售出总量


    //修改状态
    this.setState({
      candidates,
      details,
      metaMask:metaMask[0],
      totalTokens,
      balanceOfTokens,
      priceOfToken,
      tokenSold
    })

  }

  render() {
    return (
      <div className="container" style={ {marginTop:"50px"} }>
        <h1 >基于Token的投票系统</h1>
        <div className="row">
          <Candidates candidateList={this.state.candidates} app={this}  />

          <Tokens 
          totalTokens={this.state.totalTokens}  
          balanceOfTokens={this.state.balanceOfTokens} 
          priceOfToken={this.state.priceOfToken}
          tokenSold={this.state.tokenSold}
          app={this} 
          /> 

        </div>

        <div className="row" style={ {marginTop:"50px"} }>
          <Voting app={this} /> 
          <Details details={this.state.details} eoa={this.state.metaMask} app={this} /> 
        </div>


      </div>
    )
  }
}

export default App;


