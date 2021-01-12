import {
  createSlice
} from '@reduxjs/toolkit';
import {
  RootState
} from '../app';
import {Profile} from '../models/Profile';
import {
  State
} from '../models/State'

const initialState: State = {
  profiles: [],
  editing: false,
  editing_id: '',
  authenticated: false
}
const dummydata = {
  "artists": [
    {
      "id": "345454",
      "description": "Alexandra is a songwriter, producer, and podcaster from New York City. She writes primarily on the piano, guitar, and ukulele in the genre of indie pop. In London as a student, she is the Executive Producer of AGK Studios, an organisation aimed at encouraging creatives across fields in collaboration on digital media platforms. ",
      "facebook": "",
      "instagram": "ale6 ",
      "name": "Aleddra efewewa ",
      "twitter": "",
      "type": "performers",
      "upcomingEvent": "https://www.kclsu.org/ents/event/6548/",
      "url": "https://firebasestorage.googleapis.com/v0/b/bush-house-sessions.appspot.com/o/profiles%2Fssss.jpg?alt=media&token=1efabcdc-e7a0-43ac-a220-d8c3184e1f24",
      "website": "http://www.alexandrakytka.com/"
    },
    {
      "id": "34345",
      "description": "",
      "facebook": "https://www.facebook.com/profile.php?id=100001585530240",
      "instagram": "",
      "name": "Ekaterina",
      "twitter": "",
      "type": "performers",
      "upcomingEvent": "https://www.kclsu.org/ents/event/6548/",
      "url": "https://firebasestorage.googleapis.com/v0/b/bush-house-sessions.appspot.com/o/profiles%2Fresized.jpg?alt=media&token=73a8d682-e3a4-49f0-92c1-0e7b8ec56bb9",
      "website": "https://www.youtube.com/channel/UCWTd6FXN4mtilv-mPeKig2Q/featured"
    },
    {
      "id": "34343",
      "description": "Karen Ng is a writer, musician, photographer and stylist from Hong Kong. Her 2019 exhibition \"Nature and Child: Moments from my Life so Far\" was her debut photography event. Held through Project X at Bush House, it explored the intimate relationship we have with the natural world within urban cities. The photographs exemplified the style of casual daily-life photography that Karen frequently works with.\n\n\nEmail: karenngcontact@gmail.com\n",
      "facebook": "",
      "instagram": "",
      "name": "Karen Ng",
      "twitter": "",
      "type": "xhibitArtists",
      "upcomingEvent": "",
      "url": "https://firebasestorage.googleapis.com/v0/b/bush-house-sessions.appspot.com/o/profiles%2FKN%20resized.jpg?alt=media&token=5edeb3a3-b365-4bc5-bc49-d8ee026db7b5",
      "website": "ngsumyi.tumblr.com"
    },
    {
      "id": "2343435",
      "description": "Finding her roots in classic country music, Katie brings in elements of bluegrass and pop in her catchy, authentic songs. Each song she plays is her own and helps to paint an engaging story of herself for the audience. Child-like and optimistic in the likes of Taylor Swift and Kelsea Ballerini, there is also a maturity found in her songs rare for a 17 year old. She has the ability to handle the stage, no matter how large, in a way that gets people up on their feet during her quick songs and on the edge of their seat during her ballads. Katie pl",
      "facebook": "",
      "instagram": "",
      "name": "Keferwf Trfrf",
      "twitter": "",
      "type": "performers",
      "upcomingEvent": "",
      "url": "https://firebasestorage.googleapis.com/v0/b/bush-house-sessions.appspot.com/o/profiles%2Fkatie_resized.jpg?alt=media&token=821577f4-bb9a-4aa7-84ba-cb896269400f",
      "website": "https://kmgtrojak.wixsite.com/artist"
    },
    {
      "id": "34354353",
      "description": "'Disparities' is a new documentary focusing on the gender culture and prevalence of sexual assault at the University of California, Santa Barbara. While on a study abroad placement from King's, filmmaker Samuel Davies sat down with 9 students to discuss a range of gender related issues in their small beach town of Isla Vista, including university housing, party culture, the separation of men and women, and the sexual violence that these structures might facilitate. Gathering a range of perspectives and insights, the documentary aims to raise ",
      "facebook": "",
      "instagram": "",
      "name": "\"Disparities\" by Seffewam efwes",
      "twitter": "",
      "type": "specialActs",
      "upcomingEvent": "",
      "url": "https://firebasestorage.googleapis.com/v0/b/bush-house-sessions.appspot.com/o/profiles%2FDISPARITIES%20PICTURE_resized.jpg?alt=media&token=47ae3e0b-abf6-44b4-a0ea-37c4f6e96fff",
      "website": ""
    }
  ]
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState: initialState,
  reducers: {
    fetchProfiles: (state: RootState) => {
      console.log('fetching profiles')
      const data = dummydata as any;
      const profiles = data.artists.map((artist: Profile): Profile => {
        return {
          name: artist.name,
          description: artist.description,
          url: artist.url,
          facebook: artist.facebook,
          twitter: artist.twitter,
          instagram: artist.instagram,
          type: artist.type,
          website: artist.website,
          upcomingevent: artist.upcomingevent,
          id: artist.id
        }
      });
      state.profiles = profiles;
    },
    addProfile: (state: RootState, action) => {
      //FIRST UPLOAD TO FIREBASE
      //THEN
      state.profiles.unshift(action.payload);
    },
    deleteProfile: (state: RootState) => {
      return state;
    },
    edit: (state: RootState, action) => {
      state.editing = true;
      state.editing_id = action.payload;
    },
    resetEditMode: (state: RootState) => {
      state.editing = false;
      state.editing_id = '';
    }
  }
}) as any;

export const {
  addProfile,
  deleteProfile,
  edit,
  resetEditMode,
  fetchProfiles
} = profileSlice.actions;


export default profileSlice;