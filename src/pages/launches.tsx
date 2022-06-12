/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { WaveLoading, RotateCircleLoading } from 'react-loadingg';
import {
  useQuery,
  gql,
  useLazyQuery,
} from "@apollo/client";
import qs from 'querystring'
import { launchData } from '../common/types';
import LaunchCard from '../components/LaunchCard';
import styled from '@emotion/styled';
import { useSearchParams } from "react-router-dom";

const PageButton = styled.button`
  position: relative;
  min-width: 130px;
  padding: 5px 15px;
  background-color: black;
  color: white;
  font: 16px/24px D-DIN-Medium,Arial,Verdana,sans-serif;
`

export default () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1);
  const [getLaunchesTotal, { loading: loadingTotal, error: errorTotal, data: totalData }] = useLazyQuery(GET_TOTAL)
  const [getLaunches, { loading, error, data: LaunchesData }] = useLazyQuery(
    GET_LAUNCHES,
    {
      variables: {
        limit: 10,
        offset: (page - 1) * 10,
      }
    }
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let urlPage = params.get('page')
    if (urlPage) {
      setPage(+urlPage)
    }
    getLaunchesTotal()
  }, [])

  useEffect(() => {
    getLaunches()
  }, [page])

  const getTotalPage = () => {
    if (loadingTotal || !totalData) return 0
    return Math.ceil(totalData.launchesPastResult.result.totalCount / 10)
  }

  const handlePageChange = (type: 'next' | 'past') => {
    let resultPage = page
    if (loading) return;
    if (type === 'next' && page + 1 <= getTotalPage()) {
      resultPage = page + 1;
    } else if (type === 'past' && page > 1) {
      resultPage = page - 1 <= 0 ? 1 : page - 1
    }
    const params = new URLSearchParams()
    params.append('page', `${resultPage}`);
    setSearchParams(params.toString())
    setPage(resultPage)
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
    <div className="min-h-full">
      <div className='pt-6 relative min-h-[80%]'>
        <div className="flex flex-wrap w-full min-h-[80%]">
          {renderData(LaunchesData)}
        </div>
        {loading ? (
          <div className="absolute top-0 left-0 right-0 bottom-16 flex justify-center items-start">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-30" />
            <div className="mt-16">
              <WaveLoading color="#000000" size="default" style={{}} speed={1} />
            </div>
          </div>
        ) : null}
      </div>
      {
        loadingTotal ? <div className="flex justify-center w-10/12 mx-auto pb-6">
           <RotateCircleLoading color="#000000" size="default" style={{}} speed={1} />
        </div> : (
          <div className='flex justify-between w-10/12 mx-auto pb-6'>
            <PageButton style={{ visibility: page === 1 ? 'hidden' : 'visible' }} disabled={loadingTotal} onClick={() => handlePageChange('past')}>PAST</PageButton>
            <div>{page} / {loadingTotal ? '?' : getTotalPage()}</div>
            <PageButton style={{ visibility: page === getTotalPage() ? 'hidden' : 'visible' }} disabled={loadingTotal} onClick={() => handlePageChange('next')}>NEXT</PageButton>
          </div>
        )
      }
    </div>
  )
}

const GET_TOTAL = gql`
  query LaunchesTotal {
    launchesPastResult {
      result {
        totalCount
      }
    }
  }
`

const GET_LAUNCHES = gql`
  query Launches($limit: Int!, $offset: Int!){
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        flickr_images
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