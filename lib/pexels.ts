import { createClient } from 'pexels';

const client = createClient(process.env.PEXELS_API_KEY!);

export async function pexelsSearch(query: string) {
  const orientation = 'square';
  // const size = 'medium';

  const photoRes = await client.photos.search({
    query,
    per_page: 1,
  });

  if ('photos' in photoRes) {
    const photoId = await photoRes.photos[0].id;
    const photoObj = await client.photos.show({ id: photoId });

    if ('src' in photoObj) {
      const finalSrc = await photoObj.src.original;
      return finalSrc;
    } else {
      console.error('Error occurred while retrieving photo details:', photoObj);
      return null;
    }
  } else {
    console.error('Error occurred while searching for photos:', photoRes);
    return null;
  }
}
