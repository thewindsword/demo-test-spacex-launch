/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import {
  useQuery,
  gql
} from "@apollo/client";
import { launchData } from '../common/types';
import LaunchCard from '../components/LaunchCard';

export default () => {
  // const { loading, error, data } = useQuery(GET_LAUNCHES)
  // console.log('loading: ', loading);
  // console.log('error: ', error);
  // console.log('data: ', data);

  const loading = false
  const data: Array<launchData> = {
    launches: [{
      "id": "13",
      "mission_name": "Thaicom 6",
      "launch_date_local": "2014-01-06T14:06:00-04:00",
      "launch_site": {
        "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
      },
      "links": {
        "article_link": "http://spacenews.com/38959spacex-delivers-thaicom-6-satellite-to-orbit/",
        "video_link": "https://www.youtube.com/watch?v=AnSNRzMEmCU",
        "flickr_images": [
          "https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg",
          "https://farm8.staticflickr.com/7619/16763151866_35a0a4d8e1_o.jpg",
          "https://farm9.staticflickr.com/8569/16169086873_4d8829832e_o.png"
        ]
      },
      "rocket": {
        "rocket_name": "Falcon 9",
        "rocket_type": "v1.1"
      },
      "launch_success": true,
      "details": "Second GTO launch for Falcon 9. The USAF evaluated launch data from this flight as part of a separate certification program for SpaceX to qualify to fly U.S. military payloads and found that the Thaicom 6 launch had \"unacceptable fuel reserves at engine cutoff of the stage 2 second burnoff\""
    },
    {
      "id": "17",
      "mission_name": "AsiaSat 6",
      "launch_date_local": "2014-09-07T01:00:00-04:00",
      "launch_site": {
        "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
      },
      "links": {
        "article_link": "https://www.space.com/27052-spacex-launches-asiasat6-satellite.html",
        "video_link": "https://www.youtube.com/watch?v=39ninsyTRk8",
        "flickr_images": [
          "https://farm8.staticflickr.com/7604/16169087563_0e3559ab5b_o.jpg",
          "https://farm9.staticflickr.com/8742/16233828644_96738200b2_o.jpg",
          "https://farm8.staticflickr.com/7645/16601443698_e70315d1ed_o.jpg",
          "https://farm9.staticflickr.com/8730/16830335046_5f017c17be_o.jpg",
          "https://farm9.staticflickr.com/8637/16855040322_57671ab8eb_o.jpg"
        ]
      },
      "rocket": {
        "rocket_name": "Falcon 9",
        "rocket_type": "v1.1"
      },
      "launch_success": true,
      "details": null
    },
    {
      "id": "25",
      "mission_name": "OG-2 Mission 2",
      "launch_date_local": "2015-12-22T21:29:00-04:00",
      "launch_site": {
        "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
      },
      "links": {
        "article_link": "https://spaceflightnow.com/2015/12/22/round-trip-rocket-flight-gives-spacex-a-trifecta-of-successes/",
        "video_link": "https://www.youtube.com/watch?v=O5bTbVbe4e4",
        "flickr_images": [
          "https://farm2.staticflickr.com/1648/23827554109_837b21739e_o.jpg",
          "https://farm1.staticflickr.com/597/23802553412_d41e4dcc64_o.jpg",
          "https://farm6.staticflickr.com/5806/23802550622_9ff8c90098_o.jpg",
          "https://farm1.staticflickr.com/571/23604164970_2a1a2366e4_o.jpg",
          "https://farm6.staticflickr.com/5773/23271687254_5e64d726ba_o.jpg",
          "https://farm6.staticflickr.com/5766/23526044959_5bfe74bc88_o.jpg",
          "https://farm6.staticflickr.com/5723/23785609832_83038751d1_o.jpg",
          "https://farm1.staticflickr.com/715/23833499336_d3fde6a25a_o.jpg"
        ]
      },
      "rocket": {
        "rocket_name": "Falcon 9",
        "rocket_type": "FT"
      },
      "launch_success": true,
      "details": "Total payload mass was 2,034 kg (4,484 lb) : 11 satellites weighing 172 kg each, plus a 142-kg mass simulator. This was the first launch of the upgraded v1.1 variant (later called Falcon 9 Full Thrust), with a 30 percent power increase. Orbcomm had originally agreed to be the third flight of the enhanced-thrust rocket, but the change to the maiden flight position was announced in October 2015. SpaceX received a permit from the FAA to land the booster on solid ground at Cape Canaveral, and succeeded."
    }]
  }

  function renderData(data: { launches: Array<launchData> }) {
    if (data && data.launches) {
      return data.launches.map((i: launchData) => {
        return (
          <div className='w-1/2 p-1' key={`launch_${i.id}`}>
            <LaunchCard dataSource={i} />
          </div>
        )
      })
    }
  }

  return (
    <div>
      Launches List:
      <div className='flex flex-wrap'>
        {loading ? (
          <p>Loading ...</p>
        ) : renderData(data)}
      </div>
    </div>
  )
}

const GET_LAUNCHES = gql`
  query {
    launches(limit: 2) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      launch_success
      details
    }
  }  
`;
