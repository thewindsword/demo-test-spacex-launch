import styled from "@emotion/styled";
import dayjs from 'dayjs'
import { launchData } from "../../common/types"
import YoutubePlayCard from "../YoutubePlayCard";
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

const CoverImageContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 360px;
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

export default (props: LaunchCardProps) => {
  const {
    dataSource
  } = props
  return (
    <Card>
      {
        dataSource ? (
          <div className="w-full relative">
            <YoutubePlayCard
              url={dataSource.links.video_link}
              image={dataSource.links.flickr_images[0]}
              imageAlt={dataSource.mission_name}
              opt={{
                height: "360px"
              }}              
            />

            <div className="pl-3">
              <DateText className="pt-6">{dayjs(dataSource.launch_date_local).format('MMMM D. YYYY')}</DateText>
              <Title className="pt-3 pb-9 overflow-hidden whitespace-nowrap text-ellipsis" title={dataSource.mission_name}>{dataSource.mission_name}</Title>

              <ArticleButton className="mb-9" style={{ visibility: dataSource.links.article_link ? 'visible' : 'hidden'}} onClick={() => {
                window.open(dataSource.links.article_link)
              }}>LEARN MORE</ArticleButton>
            </div>
          </div>
        ) : 'No Launch Data'
      }
    </Card>
  )
}