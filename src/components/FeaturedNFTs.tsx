
import React from 'react';
import NeonButton from './NeonButton';
import { Card, CardContent } from '@/components/ui/card';

const featuredNFTs = [
  {
    id: 1,
    title: "Astronauta Galático",
    creator: "CosmoArtist",
    price: "0.45 ETH",
    imageUrl: "https://cdn.midjourney.com/d7ce0055-7deb-4f8c-997b-9561e090cadf/0_0.webp"
  },
  {
    id: 2,
    title: "Nave Espacial X-92",
    creator: "SpaceVoyager",
    price: "0.78 ETH",
    imageUrl: "https://cdn.midjourney.com/c3ed465e-c98d-4863-a838-3e82374d301b/0_1.webp"
  },
  {
    id: 3,
    title: "Planeta Aurora",
    creator: "NebulaDesign",
    price: "1.23 ETH",
    imageUrl: "https://cdn.midjourney.com/aec96a44-fe71-4aff-9d77-d102fe303014/0_0.webp"
  },
  {
    id: 4,
    title: "Guardião Cósmico",
    creator: "StarCreator",
    price: "0.96 ETH",
    imageUrl: "https://cdn.midjourney.com/8613750a-670c-46d8-befe-b641826fd701/0_0.webp"
  },
];

const NFTCard = ({ nft }: { nft: typeof featuredNFTs[0] }) => {
  return (
    <Card className="space-card overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(155,48,255,0.3)]">
      <CardContent className="p-0">
        <div className="h-60 overflow-hidden">
          <img src={nft.imageUrl} alt={nft.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-xl font-semibold text-white">{nft.title}</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Criador</p>
              <p className="text-neon-blue">{nft.creator}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Preço</p>
              <p className="text-neon-purple font-semibold">{nft.price}</p>
            </div>
          </div>
          <NeonButton variant="secondary" className="w-full mt-4">Ver Detalhes</NeonButton>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedNFTs = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[150px] -z-10"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">NFTs em Destaque</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Descubra nossa seleção de NFTs exclusivos criados pelos melhores artistas do universo JOGO.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <NeonButton>Ver Todos os NFTs</NeonButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNFTs;
