import styled from "@emotion/styled";
import { useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';
import dayjs from 'dayjs'
import { launchData } from "../../common/types"
import { getVideoIdByUrl } from "../../utils";
import './index.css';

interface LaunchCardProps {
  dataSource: launchData;
}

const Card = styled.div`
  display: inline-flex;
  background-color: white;
  /* border: 1px solid black; */
  width: 100%;
`

const DateText = styled.h3`
  text-transform: uppercase;
  font: 20px/24px D-Din,Arial,Verdana,sans-serif;
`

const Title = styled.h1`
  text-shadow: 0 0 2px #555;
  text-transform: uppercase;
  font: 32px/36px D-DIN-Bold,Arial,Verdana,sans-serif;
`

const ArticleButton = styled.button`
  position: relative;
  min-width: 130px;
  padding: 0 15px;
  border: 2px solid black;
  font: 16px/24px D-DIN-Medium,Arial,Verdana,sans-serif;
`

const CoverImage = styled.img`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 360px;
`

export default (props: LaunchCardProps) => {
  const {
    dataSource
  } = props
  const [isShowVideo, setShowVideo] = useState(false)
  const youtubeVideoId = getVideoIdByUrl(dataSource.links.video_link) || '2g811Eo7K8U'
  const opts = {
    playerVars: {
      width: '100%',
      autoplay: 1,
    },
  };
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  return (
    <Card>
      {
        dataSource ? (
          <div className="w-full relative">
            <YouTube
              videoId={youtubeVideoId}
              opts={opts}
              onReady={onPlayerReady}
              className="youtubeContainer"
            />
            {
              isShowVideo ? null : (
                <div>
                  <CoverImage src={dataSource.links.flickr_images[0]} alt={dataSource.mission_name} onClick={() => setShowVideo(!isShowVideo)} />
                </div>
              )
            }
            <div className="pl-3">
              <DateText className="pt-6">{dayjs(dataSource.launch_date_local).format('MMMM D. YYYY')}</DateText>
              <Title className="pt-3 pb-9">{dataSource.mission_name}</Title>

              <ArticleButton className="mb-9">LEARN MORE</ArticleButton>
            </div>
          </div>
        ) : 'No Launch Data'
      }
    </Card>
  )
}