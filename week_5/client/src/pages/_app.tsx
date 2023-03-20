
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi';
import { mainnet, goerli, polygon, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectWalletBtn } from './components/ConnectWalletBtn';
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
 
const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function MyApp(props: AppProps) {

  const { Component, pageProps } = props;
  const { address, isConnected } = useAccount()
  

  return (
    <Container>
      <CssBaseline />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ position: 'absolute', top: 8, right: 8 }}>
              <ConnectWalletBtn />
            </div>
            <h1 style={{ fontWeight: 'bold', fontSize: '4rem', textAlign: 'center', marginTop: '4rem' }}>Lottery dApp</h1>
            {!isConnected ? (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ fontSize: '2rem'}}> Please  <strong> connect</strong> your wallet</p> 
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Button variant="contained">Purchase Tokens</Button> 
              </div>
            )}
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
  </Container>
  
  );
}