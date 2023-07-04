const Web3 = require('web3')
const web3 = new Web3('http://localhost:52540')
const prefunded_pk = "..."
const prefunded_account = "..."

let txCount = 1

debugger

signedTxs = []
signedTx = web3.eth.signTransaction({
		from:"878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766",
		to:"34a600a929c439fcc9fd87bf493fea453add3d5a",
		gas:"21000",
		gasPrice: "1",
		maxPriorityFeePerGas: "1",
		maxFeePerGas: "1",
		nonce: 0,
		value:  "1000000000000000000",
		data: "0xdf"
	},
	"ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
	function(err, transactionHash) {
		if (!err)
			console.log(transactionHash + " success");
		console.log(err)
	});

/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendTxs(tx, count) {
        let promises = []
        for (let i = 0; i < count; i++) {
                promises.push(new Promise((resolve, reject) => {web3.eth.sendTransaction(tx).then((x,y) => resolve())}))
        }
        return Promise.all(promises)
}

async function pollPending() {
        for (;;) {
                let pending = await new Promise((resolve, reject) => {
                        web3.eth.getPendingTransactions().then((f) => resolve(f))})

                if (pending.length == 0) {
                        console.log("no more pending")
                        return
                } else {
                        console.log("pending: ", pending.length)
                }
                await sleep(1000)
        }
}

async function main() {
        for (;;) {
                console.log("sending more txs...")
                await sendTxs({
                        from:"34a600a929c439fcc9fd87bf493fea453add3d5f",
                        to:"34a600a929c439fcc9fd87bf493fea453add3d50",
                        value:  "1"//,
                        //data: "0x60026000f3"
                }, 4096)
                await pollPending()
        }
}

main().then(() => {console.log("done")})
*/
