import React from 'react';
import { useState, setState, state } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

import theme from '../../theme'
import Marker from '../../static/Marker'
import {AccountContext, LoadingContext} from '../../Context.js';
import StellarSdk, { StellarTomlResolver } from 'stellar-sdk'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import AddCard from '@mui/icons-material/AddCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CloseIcon from '@mui/icons-material/Close';


const Navbar = () => {

    // OPENING DIALOGS

    const {loading, setLoading} = React.useContext(LoadingContext);
    const [isOn, toggleIsOn] = useToggle();
    const [open, setOpen] = React.useState(false);
    const [openKey, setOpenKey] = React.useState(false);
    const [publicK, setPublicK] = React.useState('')
    const [privateK, setPrivateK] = React.useState('')
    const [balanceP, setBalanceP] = React.useState(0.0)
    var publicKK = publicK
    var privateKK = privateK
    var bal = balanceP
    var auth = false

    const addPublicKey = (v) => {
        setPublicK(v);
        console.log("wtf" + v)
        publicKK = v
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (privateK) {
            console.log(privateK)
            privateKK = privateK
        }
        closeLogin()
        secretKey(privateK)
        getBalance(publicKK)
    }

    const openLogin = () => {
        setOpen(true);
        if (publicK != "") {
            setOpen(false);
        }
      };
    
    const closeLogin = () => {
        setOpen(false);
    };

    const startBal = (b) => {
        console.log(b);
        const newBalanceP = b;
        setBalanceP(newBalanceP);
        bal = newBalanceP
        console.log(balanceP);
        console.log("startBal initiated");
    }

    const closeLoginKey = () => {
        setOpenKey(false);
    }

    // LOGIN INFORMATION

    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

    // SPINNER

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

    // functions
    function useToggle(initialValue = false) {
        const [value, setValue] = React.useState(initialValue);
        const toggle = React.useCallback(() => {
          setValue(v => !v);
        }, []);
        setLoading(value);
        return [value, toggle];
    }

    function changeButton() {
        const btn = document.getElementById("top-btn")
        console.log(publicKK)
        btn.innerText = "" + publicKK.substring(0, 3) + "..." + publicKK.substring(publicKK.length - 3) + " | " + "Bal: " + bal.toString().substring(0, bal.toString().indexOf(".") + 3) + " XLM"
        btn.startIcon= <CreditCardIcon/>
        console.log(btn.value)
    }

    // Create New Keypair
    const newKeypair = () => {
        return StellarSdk.Keypair.random();
    }

    const keypair = newKeypair();

    // Create New Account Callback 
    const newAcc = (keypair) => {
        
        (async function main() {
            try {
                toggleIsOn();
                console.log(loading);
         
                const response = await fetch( `https://friendbot.stellar.org?addr=${encodeURIComponent(
                    keypair.publicKey(),
                    )}`,)
                const responseJSON = await response.json();
                console.log("SUCCESS! You have a new account :)\n", responseJSON);
                setOpenKey(true);
                addPublicKey(keypair.publicKey())
                console.log(publicK)
                changeButton();
                getBalance(publicKK);
                toggleIsOn();
            } catch (error) {
                console.log("ERROR!", error);
                setPublicK("")

            }
        })();
    }

    // Use Secret Key Callback
    const secretKey = (privateKey) => {
        privateKK = privateKey
        console.log(publicK  + ' none')

        const secretPair = StellarSdk.Keypair.fromSecret(privateKey)
        console.log(secretPair.publicKey())
        addPublicKey(secretPair.publicKey())
    };

    // Get Balance of Account
    const getBalance = (publicKey) => {

        (async function main() {
            try {
                const account = await server.loadAccount(publicKey);
                console.log("publicKey is " + publicKey)
                account.balances.forEach(function (balance) {
                    console.log("it reaches forEach")
                    if (balance.asset_type == 'native') {
                        console.log("it reaches if statement")
                        console.log("balance is " + balance.balance)
                        startBal(balance.balance)
                        console.log("does it work?")
                        changeButton();
                    }
                });
            }
            catch {
                console.log("error")
            }
        })();
    }

    let [color] = useState("#3E1BDB");

    return (
        
        <div className = "navbar"
        style = {{ display: 'flex', 
        flexDirection: 'row',
        padding: '45px 80px',
        alignItems: 'center',
        justifyContent: 'space-between'}}>

            <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                <Button variant="contained" theme={theme} style={{fontSize: '20px', fontFamily: 'IBM Plex Sans', padding: '5px 5px', borderRadius: '5px', marginRight: '15px'}}>GEO</Button>

                <h1 style={{fontSize: '35px', fontFamily: 'IBM Plex Sans' ,padding: '0px 0px', margin: '0px', fontWeight: '500'}}>Stellar</h1>

            </div>


            <div style={{marginTop: '40px', marginLeft: '30px'}}>

                <Button variant="contained" theme={theme} style={{fontSize: '12px', fontWeight: '800', fontFamily: 'IBM Plex Sans', padding: '5px 10px', borderRadius: '10px', marginRight: '25px', backgroundColor: 'rgba(250, 0, 0, 0.8)'}}>MONSTER</Button>
                <Button variant="contained" theme={theme} style={{fontSize: '12px', fontWeight: '800', fontFamily: 'IBM Plex Sans', padding: '5px 10px', borderRadius: '10px', marginRight: '25px', backgroundColor: 'rgba(0, 125, 0, 0.8)'}}>ATTRACTION</Button>
                <Button variant="contained" theme={theme} style={{fontSize: '12px', fontWeight: '800', fontFamily: 'IBM Plex Sans', padding: '5px 10px', borderRadius: '10px', marginRight: '25px', backgroundColor: 'rgba(0, 0, 255, 0.8)'}}>Current</Button>

            </div>

            <div className = "navbar_selection">

                {/* <Button variant="text" theme={theme} style={{fontSize: '25px', fontFamily: 'IBM Plex Sans', margin: '0px 30px'}}>MAP</Button>

                <Button variant="text" theme={theme} style={{fontSize: '25px', fontFamily: 'IBM Plex Sans', margin: '0px 30px'}}>NFT</Button> */}

                <Button id="top-btn" variant="contained" startIcon={<AccountBalanceWalletIcon />}
                theme={theme} style={{borderRadius: '10px', fontSize: '14px', fontFamily: 'IBM Plex Sans', padding: '0px 25px', height: '60px', margin: '10px 0px 10px 20px', rowgap: '5px'}}
                onClick={openLogin}>Connect Account
                </Button>

                <Dialog open={open} onClose={closeLogin}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <DialogTitle style = {{fontFamily: 'IBM Plex Sans'}}>Select Login</DialogTitle>
                            <IconButton aria-label="close" onClick={closeLogin}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                 
                        <Button style = {{fontFamily: 'IBM Plex Sans', padding: '10px 50px'}} onClick={() => {
                            newAcc(keypair);
                            const acc = keypair.publicKey();
                            setPublicK(acc);
                            getBalance(acc);
                            closeLogin();
                        }} startIcon={<AddCard />}>
                            
                            Create New Keypair</Button>

            
                            
                        <form style = {{fontFamily: 'IBM Plex Sans', padding : '10px 50px'}} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField 
                                onChange={(e) => setPrivateK(e.target.value)}
                                autoFocus
                                margin="normal"
                                id="secret"
                                label="Secret Key"
                                fullWidth
                                variant="standard"
                                required
                            />

                            <Button style = {{fontFamily: 'IBM Plex Sans', left:'20%'}}
                                startIcon={<KeyIcon />}
                                type="submit"
                                >
                            Login with SecretKey</Button>
                        </form>


            
                </Dialog>
                <Dialog open={openKey} onClose={closeLoginKey} maxWidth = {'lg'}>
                        
                    
                    <div style={{padding: '30px 30px', gap: '20px'}}>
                        <div style = {{display: 'flex', flexDirection: 'column'}}>
                            <DialogContent style = {{fontFamily: 'IBM Plex Sans', fontWeight: '800'}}>
                            Public Key:
                            </DialogContent>   
                            <DialogContent style = {{fontFamily: 'IBM Plex Sans', padding: '5px 10px'}}>
                            {publicK}
                            </DialogContent>
                        </div>

                        
                        
                        <div style = {{display: 'flex', flexDirection: 'column'}}>
                            <DialogContent style = {{fontFamily: 'IBM Plex Sans', fontWeight: '800'}}>
                                Secret Key: 
                            </DialogContent>
                            <DialogContent style = {{fontFamily: 'IBM Plex Sans', padding: '5px 10px'}}>
                                {keypair.secret()}
                            </DialogContent>
                        </div>

                        <div style = {{display: 'flex', flexDirection: 'column'}}>
                            <DialogContent style = {{fontFamily: 'IBM Plex Sans', fontWeight: '800'}}>
                                Balance: 
                            </DialogContent>
                            <DialogContent style = {{fontFamily: 'IBM Plex Sans', padding: '5px 10px'}}>
                               {bal.toString().substring(0, bal.toString().indexOf(".") + 3) + " XLM"}
                            </DialogContent>
                        </div>
                    </div>
                    
                </Dialog>
            </div>
            
                <div className="loading" style={{position: "absolute", top: "50%",  left: "0",
                right: "0", margin: "auto", transform: "translateY(-50%)", zIndex: '5'}}>
                    <HashLoader color={color} loading={loading} css={override} size={150} />
                    <div height="20%"></div>
                    <p color={color} hidden={!loading} paddingTop="20">Private Key is being generated</p>
                </div>
            

        </div>
    )
}

export default Navbar;