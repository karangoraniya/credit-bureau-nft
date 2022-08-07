import { NFTStorage, File } from 'nft.storage';

const API_TOKEN = `${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`;

const client = new NFTStorage({ token: API_TOKEN });

export async function main() {
  const metadata = await client.store({
    name: 'Karan',
    description: 'A Credit Bureau NFT',
    image: new File(
      [
        /* data */
      ],
      'dev.png',
      { type: 'image/jpg' }
    ),
  });
  console.log(metadata.url);
}

main();
