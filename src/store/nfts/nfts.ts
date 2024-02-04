import { defineStore } from 'pinia'

export const useNfts = defineStore('nfts', {
  state: () => ({
    nfts: [
      {
        id: '0',
        name: 'Common NFT',
        icon: 'common.svg',
        rare: 'common',
        rarity: 'Common',
        price: 0.06,
        img: '/img/common_nft.png',
        bg: '/img/common_bg.png',
        pcs: '400',
        pcsLeft: '350',
        profits: '20%',
        author: 'NFT Author',
        number: '#872323',
        ownerIcon: '/img/owner-icon.png',
        ownerName: 'Michael Kazuto',
        wallet: '0xF1FE73D1d411A9EF7B3ff6eC7de93e9C1c73A5b3',
        apy: '200%'
      },
      {
        id: '1',
        name: 'Uncommon NFT',
        icon: 'uncommon.svg',
        rare: 'uncommon',
        rarity: 'Uncommon',
        price: 0.1,
        img: '/img/uncommon_nft.png',
        bg: '/img/uncommon_bg.png',
        pcs: '400',
        pcsLeft: '350',
        profits: '25%',
        author: 'NFT Author',
        number: '#872323',
        ownerIcon: '/img/owner-icon.png',
        ownerName: 'Michael Kazuto',
        wallet: '0xF1FE73D1d411A9EF7B3ff6eC7de93e9C1c73A5b3',
        apy: '200%'
      },
      {
        id: '2',
        name: 'Rare NFT',
        icon: 'rare.svg',
        rare: 'rare',
        rarity: 'Rare',
        price: 0.2,
        img: '/img/rare_nft.png',
        bg: '/img/rare_bg.png',
        pcs: '400',
        pcsLeft: '350',
        profits: '25%',
        number: '#872323',
        ownerIcon: '/img/owner-icon.png',
        ownerName: 'Michael Kazuto',
        wallet: '0xF1FE73D1d411A9EF7B3ff6eC7de93e9C1c73A5b3',
        apy: '200%'
      },
      {
        id: '3',
        name: 'Legendary NFT',
        icon: 'legendary.svg',
        rare: 'legendary',
        rarity: 'Legendary',
        price: 0.6,
        img: '/img/legendary_nft.png',
        bg: '/img/legendary_bg.png',
        pcs: '400',
        pcsLeft: '350',
        profits: '30%',
        author: 'NFT Author',
        number: '#872323',
        ownerIcon: '/img/owner-icon.png',
        ownerName: 'Michael Kazuto',
        wallet: '0xF1FE73D1d411A9EF7B3ff6eC7de93e9C1c73A5b3',
        apy: '200%'
      }
    ]
  })
})
