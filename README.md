# DataBrokerDAO DTX crowdsale contracts [![Build Status](https://travis-ci.org/DataBrokerDAO/dtx-crowdsale-contracts.svg?branch=master)](https://travis-ci.org/DataBrokerDAO/dtx-crowdsale-contracts)

## 1. The DTX token is an EIP/ERC20 compliant MiniMe token

The DTX token is an EIP/ERC20 MiniMe Token, based on the work of the Giveth team. It is ERC20 compliant and adds two useful features.

First, it allows for the creation of spin off tokens in the future that can have custom logic and allows for future upgrades of the token itself. For example, the creation of reputation tokens to be awarded based on DTX token holdings.

The second feature is that it keeps a full record of balances at each block. The MiniMe token is not new, and it has proven its value in projects like Aragon, Giveth, Swarm City, Status IM and Mothership. Using a token that has been audited and tested in all these projects makes for a secure and proven base for the DTX token.

## 2. The DTX token is controlled by the TokenSale contract

The controller of the token is the party that can create new tokens. The DTX token supply is not pre-mined. The contract only generates the tokens that are sold during the sale. During this initial phase, the TokenSale contract is the controller of the token. The sale will start on the 19th of March at 4 PM CET and will run for 5 weeks.

Coded into the sale contract is a maximum of 108.000.000 tokens sold at variable rated depending on the phase. The gas amount needed to contribute is 200.000, the amount not used is sent back automatically by the Ethereum blockchain.

## 3. Security and compliance

We have placed safety as paramount for the token and the sale. By building on the shoulders of giants, each with their contract audits, we have eliminated a lot of potential issues. For additional security, an independent contract review of our code by ... is currently under way. Additionally, we have ensured that the sale can be halted and restarted at any time in case of an emergency.

On the regulatory front, especially with the shifting tides globally, we are striving to become the first fully compliant sale in the world. To do this, we are partnering with IdentityMind and their new KYC/AML/CTF/PEP product designed for token sales.

All token sale contributors are reviewed by a state of the art risk-based KYC product to ensure the eligibility according to country level regulation, that they are not obfuscating their IP address, that they aren’t a known “bad actor” and that they are not on a sanctioned individuals list.

The technology being used also prevents contributors from creating more than one account, ensuring they undergo the proper KYC requirements and cannot use the token sale as a way to launder money.

Although the regulation around token sales is still being formed in most countries, several countries have already specified their requirements and these country specific requirements are met by the IdentityMind solution.

KYC=Know Your Customer, AML=Anti-Money Laundering, CTF=Counter Terrorist Financing, PEP=Politically Exposed Persons

## 4. Concluding the token sale

After the token sale ends, either by selling the maximum amount of tokens assigned or if the period has passed, a finalisation function will be called. This will mint the platform and team allocations as described in the white paper. In the period immediately after the sale concludes, the final referrals will be calculated and paid out from the platforms wallet.

## 5. Show me the code

The code for all these contract functions is available at https://github.com/DataBrokerDAO/dtx-crowdsale-contracts. The code is thoroughly tested and can be reviewed at https://travis-ci.org/DataBrokerDAO/dtx-crowdsale-contracts

## 6. Join the conversation

* Learn more about DataBroker DAO at — https://databrokerdao.com
* Join our Telegram at https://t.me/databrokerdao
* Find DataBroker DAO on Facebook at — https://www.facebook.com/DataBrokerDAO/
* Follow DataBroker DAO on Twitter at — https://twitter.com/DataBrokerDAO
