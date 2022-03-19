
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: "Avian Fundraiser" })
      document.getElementById("loginbsc").innerHTML = "Connected!";
      const chainId = "0x38"; //bsc mainnet Mainnet
      const chainIdHex = await Moralis.switchNetwork(chainId);
    } catch (error) {
      console.log(error)
    }
    if (!user) {
      const chainId = 56;
      const chainName = "Binance smart chain";
      const currencyName = "BNB";
      const currencySymbol = "BNB";
      const rpcUrl = "https://bsc-dataseed.binance.org/";
      const blockExplorerUrl = "https://bscscan.com";

      await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
      );
    }
  }
}

//////////////////send/////////////////////////////////////////////////////
$('#sendbsc').on('click', function (e) {
  e.preventDefault();

  const sb = document.querySelector('#selecttokenbsc');
  let contractadd = (sb.value);

  let a = document.querySelector('#bscamount');
  let polyamount = (a.value);

  if (sb.value == "0x0000000000000000000000000000000000001010") {
    const matic = {
      type: "native",
      amount: Moralis.Units.ETH(polyamount),
      receiver: "0xDe0DE663345Fb6c24aB340E38a574dF31E9cFB88"
    };
    document.getElementById("sendpoly").innerHTML = "Sent!!";
    let result = Moralis.transfer(matic).catch((error) => {
      alert(error)
    });

  }
  else {
    const options = {
      type: "erc20",
      amount: Moralis.Units.Token(polyamount, "18"),
      receiver: "0xDe0DE663345Fb6c24aB340E38a574dF31E9cFB88",
      contractAddress: contractadd,
    };
    document.getElementById("sendpoly").innerHTML = "Sent!!";
    let result = Moralis.transfer(options).catch((error) => {
      alert(error)
    });

  }

});



///////////logout//////////////////////
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  document.getElementById("logoutbsc").innerHTML = "Logged out!";
}

document.getElementById("loginbsc").onclick = login;
document.getElementById("logoutbsc").onclick = logOut;
