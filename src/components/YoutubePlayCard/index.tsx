import styled from "@emotion/styled";
import { useState } from "react";
import { CSSTransition } from 'react-transition-group'
import YouTube, { YouTubeProps } from 'react-youtube';
import { getVideoIdByUrl } from "../../utils";
import playIcon from '../../public/img/play.png'
import './index.css';

interface YoutubePlayCardProps {
  url: string;
  image: string;
  imageAlt: string;
  opt: {
    height: string;
  }
}

const CoverImageContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
  background-color: black;
  cursor: pointer;
`

const CoverImage = styled.img`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const HoverBlack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.3;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.6;
  }
`

const PlayCardContainer = styled.div`
  display: relative;
`


export default (props: YoutubePlayCardProps) => {
  const [isShowVideo, setShowVideo] = useState(false)
  const [playTarget, setPlayTarget] = useState<any>(null)
  const youtubeVideoId = getVideoIdByUrl(props.url)
  const opts = {
    playerVars: {
      width: '100%',
      autoplay: 0,
    },
  };
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayTarget(event.target)
    event.target.pauseVideo();
  }

  return (
    <PlayCardContainer style={{ height: props.opt.height }}>
      {
        youtubeVideoId ? <YouTube
          videoId={youtubeVideoId}
          opts={opts}
          onReady={onPlayerReady}
          className="youtubeContainer"
        /> : null
      }
      <CSSTransition
        in={!isShowVideo}
        timeout={500}
        unmountOnExit
        classNames="coverImage"
      >
        <CoverImageContainer style={{ height: props.opt.height, pointerEvents: youtubeVideoId ? 'auto' : 'none' }}>
          <CoverImage src={props.image} alt={props.imageAlt} />
          {
            youtubeVideoId ? (!isShowVideo && <HoverBlack onClick={() => {
              if (!playTarget) return
              playTarget.playVideo()
              setShowVideo(!isShowVideo)
            }}
            >
              <img className="flex w-16 h-16" src={playIcon} alt='play' />
            </HoverBlack>) : null
          }
        </CoverImageContainer>
      </CSSTransition>
    </PlayCardContainer>
  )
}