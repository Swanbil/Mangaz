import { API_URL } from '@env';
import axios from 'axios';

// Import the required shims
import '@ethersproject/shims';

// Import the ethers library
import { ethers } from 'ethers';
import { contractTokenABI, constTokenAddress, constNftAddress, contractNftABI, contractNftOpenSeaAddress} from '../Utils/constants';


    export async function getAddress (_pseudo)  {
        const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

        // Set the private key of the sender account
        const privateKey = await getPrivateKey(_pseudo);

        // Create a new instance of the ethers.js Wallet using the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        return wallet.address;
    };

     export async function getBalance(_pseudo){
        const provider = new ethers.providers.InfuraProvider('goerli','8846dcd958a74362bd06d7b4eae341c7');

        // Set the private key of the sender account
        const privateKey = await getPrivateKey(_pseudo);

        // Create a new instance of the ethers.js Wallet using the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        // Create a new instance of the ethers.js Contract using the ABI and the address of the contract
        const contract = new ethers.Contract(constTokenAddress, contractTokenABI, wallet);

        // Call the balanceOf() function of the contract instance with the account address as the parameter
        const balance = await contract.balanceOf(wallet.address);

        return balance;
    };

     export async function exchangeTokens (_pseudoClient,  _addressUserSeller, _amountInput) {

        let tokenAddress = constTokenAddress;
        let amount = _amountInput;

        //Appeler getPrivateKey pour récup la clé privé du receveur avec en entré le pseudo ecirt en input par l'envoyeur
        const toAddress = _addressUserSeller;

        if(amount == 0 || amount == null || isNaN(amount) || amount == undefined || amount == ""){
            alert("Veuillez entrer un pseudo et un montant");
            return;
        }

        // Create a new instance of the ethers.js provider
        const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

        // Set the private key of the sender account
        const privateKey = await getPrivateKey(_pseudoClient);

        // Create a new instance of the ethers.js Wallet using the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        // Create a new instance of the ethers.js Contract using the ABI and the address of the contract
        const contract = new ethers.Contract(tokenAddress, contractTokenABI, wallet);

         // Set the function to call and any parameters required
        const functionToCall = "transfer";
        const functionParams = [toAddress, amount];

        // Set the gas price and gas limit
        const gasPrice = await provider.getGasPrice();
        const gasLimit =  ethers.utils.hexlify(ethers.BigNumber.from(200000));

        // // Build the transaction object
        const transaction = {
            to: tokenAddress,
            data: contract.interface.encodeFunctionData(functionToCall, functionParams),
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce: await wallet.getTransactionCount()
        };

        // Sign the transaction
        const signedTransaction = await wallet.signTransaction(transaction);

        //Send the transaction
        const response = await wallet.provider.sendTransaction(signedTransaction);
        console.log(response);
    };

    /*
        Function for Private Key
     */
    export async function getPrivateKey (_pseudo) {
        const user = { "userPseudo" : _pseudo };
        const response = await axios.get(API_URL + '/web3/getPrivateKey/' + user.userPseudo);
        return (response.data);
    };

    export async function postPrivateKey (_pseudo, _privateKeyInput) {
        const user = { "userPseudo" : _pseudo, "privateKey" : _privateKeyInput };

        if(user.privateKey == "") {
            alert("Veuillez entrer une clé privée");
            return;
        }
        try{
            const response = await axios.post(API_URL + '/web3/postPrivateKey/', user);
            alert("Clé privée enregistrée");

            return (response.data);
        }catch
        {
            alert("Erreur lors de l'enregistrement de la clé privée");
        }
    };

    export async function checkPrivateKey (_pseudo) {
        const response = await getPrivateKey(_pseudo);
        console.log("data in check function : " + response + "")

        return response;
    };


    /*
        Exchange nft
     */

    //User click on button buy NFT
     export async function  exchangeNFT(_idNft, _addressUserClient, _pseudoUserSeller , _addressUserSeller) {
        let fromAddress = _addressUserClient;  //Get the address of the user
        let toAddress = _addressUserSeller;  //Get the address of the user
        let idNft = _idNft;//Get the id of the nft
        let amount = 1; //Get the amount of nft
        let data = "0x00"; //Get the data of the nft

            // Create a new instance of the ethers.js provider
            const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

            const contractAddress = '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c';

            // Set the private key of the sender account
            const privateKey = await getPrivateKey(_pseudoUserSeller);

            // Create a new instance of the ethers.js Wallet using the private key
            const wallet = new ethers.Wallet(privateKey, provider);

            // Create a new instance of the ethers.js Contract using the ABI and the address of the contract
            const contract = new ethers.Contract(contractAddress, contractNftABI, wallet);

            // Set the function to call and any parameters required
            const functionToCall = "0xf242432a";
            const functionParams = [fromAddress, toAddress, idNft, amount, data];

            // Set the gas price and gas limit
            const gasPrice = await provider.getGasPrice();
            const gasLimit =  ethers.utils.hexlify(ethers.BigNumber.from(200000));

        // Calculate the replacement gas cost
        const replacementGasCost = gasPrice.mul(ethers.BigNumber.from(100));

        // Calculate the total gas cost
        const totalGasCost = gasPrice.mul(gasLimit).add(replacementGasCost);


            // // Build the transaction object
            const transaction = {
                to: contractAddress,
                data: contract.interface.encodeFunctionData(functionToCall, functionParams),
                gasPrice: gasPrice.add(replacementGasCost),
                gasLimit: gasLimit,
                nonce: await wallet.getTransactionCount()
            };

            // Sign the transaction
            const signedTransaction = await wallet.signTransaction(transaction);

            //Send the transaction
            const response = await wallet.provider.sendTransaction(signedTransaction);
            console.log(response);
    };

     export async function buyNFT (_pseudoClient, _addressUserSeller, _idNft, _amountInput) {
        try{
            await exchangeTokens(_pseudoClient, _addressUserSeller, _amountInput);
            try{
                await exchangeNFT(_idNft, _pseudoClient, _addressUserSeller);
                alert("Nft échangé");

            }catch (e) {
                console.log(e);
                alert("Erreur lors de l'échange des NFT");

                //A REVOIR
                //await exchangeTokens(_addressUserSeller, _pseudoClient, _amountInput);
            }
        }catch (e){
            console.log(e);
            alert("Erreur lors de l'échange des tokens");
        }
    };

     export async function getAllNftUser (_address)  {
        try{
            console.log("address in getAllNftUser : " + _address);
            const response = await axios.get(API_URL + '/web3/OpenSea/getNFTsUser/' + _address);
            const data =response.data;

            return data.assets;

        }catch (e) {
            console.log(e);
        }
    };

     export async function getNftUser (_contractAddress, _idNft, _addressUser) {
        try {
            const response = await axios.get(API_URL + '/web3/OpenSea/getNFT/' + _contractAddress + '/' + _idNft + '/' + _addressUser);
            const nft = response.data;
            console.log(nft);


            //setNfts(nfts => [...nfts, nft]); // append the new NFT to the list of NFTs
            return nft;

        } catch (e) {
            console.log(e);
        }
    };

     export async function retrieveAllNftUser (_address)  {
        await getAllNftUser(_address);
        for (let i = 0; i < listIdNft.length; i++) {

            console.log("listIdNft[i].id : " + listIdNft[i].token_id);
            await getNftUser(contractNftOpenSeaAddress, listIdNft[i].token_id.justifyContent, "0x7424b8bfD8dB7d8Ed37cd7751a3C9F31f7467940");
        }
    };

     export async function getCollections (_address)  {
        try {
            const response = await axios.get(API_URL + '/web3/OpenSea/getCollections/' + _address);
            const data =response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };

     export async function getCollection (_nameCollection)  {
            const response = await axios.get(API_URL + '/web3/OpenSea/getCollection/' + _nameCollection);
            const data =response.data;
            return data;
     }
     export async function getNftsFromCollection (_nameCollection){
        try {
            const response = await axios.get(API_URL + '/web3/OpenSea/getNFTsFromCollection/' + _nameCollection);
            const data =response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
     }



     export async function OpenPackAllCards () {
        setLoading(true);
        const addressWallet = { "addressWallet" : '0x685EAa4fFDCa637EE8b3c2AC454E7Dbd4EFd2d64' };
        const response = await axios.get(API_URL + '/web3/OpenSea/getNFTsUser/' + addressWallet.addressWallet);
        const data =response.data;

        //Randomise the number of NFT id
        const numberOfCards = data.assets.length;
        console.log("numberOfCards : " + numberOfCards);
        const randomId = Math.floor(Math.random() * numberOfCards);
        console.log("randomId : " + randomId);

        //Get the right card id
        const cardID = data.assets[randomId].token_id;
        console.log("cardID : " + cardID);

        //Call buyNFT
        await buyNFT("Test", "U", cardID, 1);
    }