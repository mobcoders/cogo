import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchImgUrl_Description(listingUrl: string) {
  try {
    const response = await axios.get(listingUrl);
    const $ = cheerio.load(response.data);
    const mainPhotoUrl = $('meta[property="og:image"]').attr('content');
    const titleText = $('title').text();

    // console.log('Main photo URL:', mainPhotoUrl);
    // console.log('Venue Title:', titleText);
    return { mainPhotoUrl, titleText };
  } catch (error) {
    console.error('Error:', error);
  }
}
