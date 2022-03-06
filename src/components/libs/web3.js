import Web3 from "web3"

const web3 = new Web3() 

//这段代码可以连接geth、ganache-cli
web3.setProvider("http://localhost:8545")

export default web3 