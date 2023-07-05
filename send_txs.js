const Web3 = require('web3')
const prefunded_pk = "..."
const prefunded_account = "..."
const { execSync } = require("node:child_process");

let txCount = 1
let nonce = 0

function getPort() {
	let output = execSync("python3 main.py").toString('utf-8')
    	return parseInt(output.trim(), 10)
}

async function signTx() {
	const getTxCount = new Promise((resolve, reject) => {
		web3.eth.getTransactionCount("878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766", function(err, count) {
			if (!err) {
				resolve(count)
			}
			reject(err)
		})
	})

	const txCount = await getTxCount

	const signTx = new Promise((resolve, reject) => {
		web3.eth.signTransaction({
				from:"878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766",
				to:"34a600a929c439fcc9fd87bf493fea453add3d5a",
				gas:"21016",
				gasPrice: "1",
				maxPriorityFeePerGas: "1",
				maxFeePerGas: "1",
				nonce: txCount,
				value:  "1000000000000000000",
				data: "0xdf"
			},
			"ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
			function(err, tx) {
				if (!err) {
					nonce += 1
					resolve(tx.raw)
				}
				reject(err)
			})
	})

	return await signTx
}

async function sendTx(signedTx) {
	return new Promise((resolve, reject) => {
		web3.eth.sendSignedTransaction(signedTx).then((thing) => {
			resolve(thing)
		}, (error) => {
			reject(error)
		})
	})
}

let web3 = null

async function main() {
	let port = getPort()
	web3 = new Web3(`http://localhost:${port}`)
	let signedTx = await signTx()
	await sendTx(signedTx)
}

main().then((done) => {
	debugger
}, (err) => {
	console.log("error: " + err)
})
