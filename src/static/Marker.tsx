import React from 'react';
import Popup from "reactjs-popup";
import SplitPane from 'react-split-pane';
import './Marker.css';
import { imageListClasses } from '@mui/material';  
import Button from '@mui/material/Button';
import theme from '../theme'
import { css } from "@emotion/react"
import StellarSdk from 'stellar-sdk';

const Marker = (props: any) => {
    const { color, name, id, lat, lng, publicKey, desc, img, AssetNum, IssueAccount,  privateKey,} = props;

    var markerClass = new String(getStringValue(color))

    function getStringValue(value: any): string {
      return value.toString();
  }

    console.log(markerClass)
    
    function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    function distanceInMilesBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
      var earthRadiusKm = 6371;
    
      var dLat = degreesToRadians(lat2-lat1);
      var dLon = degreesToRadians(lon2-lon1);
    
      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);
    
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return earthRadiusKm * c * 0.6213712;
    }

    const dis = distanceInMilesBetweenEarthCoordinates(lat, lng, 37.7759, -122.41814)

    const logo = require('../static/img/' + img)

    const setup = {fee: StellarSdk.BASE_FEE, networkPassphrase: StellarSdk.Networks.TESTNET}

    const proximity = async () => {

            try {
              const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
      
              // Add here if statement to check the marker we're point at and see the distance.
              // so we know which asset to add trustline to

              var Hp = await getHP();

              // Hp not working use constant as Hp
              Hp = 10;
      
              const receivingKey = StellarSdk.Keypair.fromSecret('SDCEFVCY3HE54XKHTXYBHRQFHJZMFZHXQKSRJQZDXYMUL3Z2PCQWJ2Z2')
              const monster_issuingKey = StellarSdk.Keypair.fromSecret('SCZQKI2IEW3HU762LFK7RNVA6IIVS23DFDH4JKW6Q737KLWRVT4KVFHY')
              const monster = new StellarSdk.Asset('GEOS0001', monster_issuingKey.publicKey())

              if (dis < 2) {
                const acc = await server.loadAccount(receivingKey.publicKey())
                var paymentXLM = Math.round(2/dis);

                console.log(paymentXLM)

                var hploss = Math.round(Hp-paymentXLM);
                console.log(hploss)

                const hploss_str = hploss.toString()
                const hp_str = Hp.toString()
                const payment_str = paymentXLM.toString()

      
                const accPay = new StellarSdk.TransactionBuilder(acc, setup)
                .addOperation(
                  StellarSdk.Operation.setOptions({
                    //Add homedomain
                    signer: {ed25519PublicKey: receivingKey.publicKey(),
                            weight: '0'},
                    source: monster_issuingKey.publicKey()
                  })
                )
                .addOperation(
                  StellarSdk.Operation.changeTrust({
                    asset: monster,
                    limit: '10',
                  })
                )
                .addOperation(
                  StellarSdk.Operation.payment({
                    destination: receivingKey.publicKey(),
                    asset: monster,
                    amount: payment_str,
                    source: monster_issuingKey.publicKey()
                  })
                )
                .addOperation(
                  StellarSdk.Operation.payment({
                    destination: monster_issuingKey.publicKey(),
                    asset: StellarSdk.Asset.native(),
                    amount: '5',
                  })
                )
                .addOperation(
                  StellarSdk.Operation.manageData({
                    name: 'HP',
                    value: hploss_str,
                    source: monster_issuingKey.publicKey()
                  })
                ).setTimeout(180).build()
      
                accPay.sign(monster_issuingKey)
                accPay.sign(receivingKey)
      
                server.submitTransaction(accPay)
      
              } else {
                console.log("You are too far away to mint")
              }
            
      
            } catch (error) {
              console.log("Marker not hovered/Funds not enough!", error)
            }
              
          }

      const getHP = async () => {
              try {
        
                const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
        
                const monster_issuingKey = StellarSdk.Keypair.fromSecret('SCZQKI2IEW3HU762LFK7RNVA6IIVS23DFDH4JKW6Q737KLWRVT4KVFHY');
                const acc = await server.loadAccount(monster_issuingKey.publicKey());
        
                Object.entries(acc.data_attr).forEach(entry => {
                  const [key, value] = entry;
                  if (typeof value === 'string') {
                    if (key === 'HP') {
                      var b = Buffer.from(value, 'base64')
                      return b.toString();
                    
                    }
                  }
                });
                return 0;
        
              } catch (error) {
                console.log("No HP found!");
                return 0;
              }
            }
    
        const getTop = async(IssueAccount) => {
                  try {
                    var maxAcc = ''
                    var maxDmg = 0
                    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
          
                    const monster_issuingKey = StellarSdk.Keypair.fromSecret(IssueAccount);
                    const acc = await server.loadAccount(monster_issuingKey.publicKey());
                    acc.signers.forEach((element) => {
          
                      if (element !== monster_issuingKey.publicKey()) {
          
                        const signers = async (element) => {
          
                          const signerAcc = await server.loadAccount(element['key'])
                          signerAcc.balances.forEach((asset) => {
                            if (asset.asset_type === 'GEOS0001') {
                              if (asset.balance > maxDmg) {
                                maxAcc = element['key'];
                                maxDmg = asset.balance
                              }
                            }
                          });
                        }

                      signers(element);
                      }
                    });
                    return [maxAcc, maxDmg];
          
                  } catch (error) {
                    console.log("Could not find Max Dmg User!")
                    return ['', 0];
                  }
              }
    
    const claimAndAttack = async() => {
      if (markerClass === "green") {
        proximity();
      } else if (markerClass === "red") {
        const hp = await getHP()
        if (hp <= 0) {
          proximity();
        }
      }
    }


    const display = async() => {
      // create a new div element
      const currentDivHealth = document.getElementById("display-health");
      const currentDivTop = document.getElementById("display-top");
    
      const health = await getHP()
      // and give it some content
      console.log(currentDivHealth)

      if (currentDivHealth !== null && currentDivTop !== null && markerClass !== null) {
        currentDivHealth.textContent = "Health: " + health + AssetNum
        currentDivTop.textContent = "Top Hitter: " + health + IssueAccount
      }

    }

    return (
      <div>
        {/* <div className="heatmap"> */}
        <Popup
    trigger={<div className="marker" id={IssueAccount}
    style={{ backgroundColor: color, cursor: 'pointer', fontSize: '25px'}}
    title={"Distance: " + dis.toString().substring(0, dis.toString().indexOf(".")+3) + " miles"} 
    onMouseEnter={() => 
      Marker}
  >      </div>}
    modal
    nested
  >
    {close => (
      <div className="modal" style={{ fontFamily: 'IBM Plex Sans'}}>
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> {name} </div>
        <SplitPane split="vertical" allowResize={false}>
          <div className="content" style ={{padding: '50px 10px', display: 'block', position: "relative"}}> 
            <img src={logo} style = {{width: '20vw', height:'20vw'}}/>

            <div id="display-health" style = {{position: "relative"}}>Health</div>

            <div id="display-top" style = {{position: "relative"}}>Top Hitters </div>
          </div>
          <div className="content" style={{padding: '50px 20px', fontSize: '1vw', display: 'flex', justifyContent: 'center'}}>{desc}</div>

        </SplitPane>
        
        <div className="actions">
        
          <Button variant="outlined"
              className="button" style={{borderColor: '#3E1BDB', marginRight: '20px'}}
              onClick={() => {
                console.log('function 1 button pressed');
                proximity();
              }}>
              5 XLM
          </Button>
        

        </div>
      </div>
    )}
  </Popup>
);
      </div>
      // </div>
      
      
    );
  };

  export default Marker;