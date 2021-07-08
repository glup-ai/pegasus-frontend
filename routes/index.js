var express = require("express");
var router = express.Router();
const { NodeSSH } = require("node-ssh");
const isPortReachable = require('is-port-reachable');

const ssh = new NodeSSH();

module.exports = function (keys) {
  /* GET home page. */
  router.get("/", async function (req, res, next) {

    let minerRes = await isPortReachable(keys.miner.port, {host: keys.miner.host});
    let jupyterRes = await isPortReachable(keys.jupyter.port, {host: keys.jupyter.host});

    if(minerRes){
      return res.render("miner");
    }

    if(jupyterRes){
      return res.render("jupyter");
    }

    return res.render("connect");

  });


  router.get("/connect", async function (req, res, next) {

    let minerRes = await isPortReachable(keys.miner.port, {host: keys.miner.host});
    let jupyterRes = await isPortReachable(keys.jupyter.port, {host: keys.jupyter.host});

    if(jupyterRes || minerRes){
      return res.send({ready:true})
    };
    
    return res.send({ready:false})
  });

  router.get("/toggle",async function (req, res, next) {

    let currentMode = null;

    let minerRes = await isPortReachable(keys.miner.port, {host: keys.miner.host});

    if(minerRes){
      currentMode = "miner";
    };

    let jupyterRes = await isPortReachable(keys.jupyter.port, {host: keys.jupyter.host});

    if(jupyterRes){
      currentMode = "jupyter";
    };

    if(currentMode == null){
      return res.send({error:"Lost contact with Pegasus :("});
    }

    let bootNum = currentMode == "miner" ? keys.miner.bootNum : keys.jupyter.bootNum;

    ssh.connect({
        host: currentMode == "miner" ? keys.miner.host : keys.jupyter.host,
        port: currentMode == "miner" ? keys.miner.port : keys.jupyter.port,
        username: currentMode == "miner" ? keys.miner.username : keys.jupyter.username,
        password: currentMode == "miner" ? keys.miner.password : keys.jupyter.password,
      })
      .then(
        function () {
          console.log("Connected");
          ssh.execCommand(`efibootmgr -n ${bootNum}; reboot`).then(function(result) {
            setTimeout(function(){ return res.send({success:true}); }, 5000);            
          });
        },
        function (error) {
          return res.send({error:`Connected failed: ${error}`});
        }
      );
  });

  return router;
};
