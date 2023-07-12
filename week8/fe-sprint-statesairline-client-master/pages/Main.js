import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFlight } from '../api/FlightDataApi';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';
import Debug from './component/Debug';
// 후반 테스트를 진행할 때 아래 import를 삭제합니다.
import json from '../resource/flightList';

export default function Main() {
  const [condition, setCondition] = useState({
    departure: 'ICN'
  })
  const [flightList, setFlightList] = useState(json)
  const [isloading, setloading] = useState(true)
  // 로딩상태일때를 구현 , 상태를 만들어준다
  
  const search = ({ departure, destination }) => {
    if (condition.departure !== departure || condition.destination !== destination) {
      console.log('condition 상태를 변경시킵니다')

      // TODO:
      setCondition({departure, destination})
    }
  }

// useEffect로 상태를 변화하는 condition을 FlightDataApi의 getflight로 넘겨준다
  
  useEffect(async() =>{
    setloading(true)
    setFlightList(await getFlight(condition))
    // 필터링 조건인 객체를 인자로 넣어준다 
    setloading(false)
  }, [condition])
  // 검색 조건이 바뀔 때 마다 useEffect 실행
  // useEffect에서 어떤 값이 바뀔때만 호출하고싶다면 배열 안에 
  // useEffect로 관리하고 있는 상태인 condition을 넣어준다


  
  
  global.search = search // 실행에는 전혀 지장이 없지만, 테스트를 위해 필요한 코드입니다. 이 코드는 지우지 마세요!

  return (
    <div>
      <Head>
        <title>States Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          여행가고 싶을 땐, States Airline
        </h1>
        <Search onSearch={search}/>
        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>
          {/* <FlightList list={flightList.filter(filterByCondition)} /> */}
          // getFlight 요청이 다소 느리므로, 
          // 로딩 상태에 따라 LoadingIndicator 컴포넌트를 표시해야 합니다 
          // 컴포넌트 내 필터 함수 `filterByCondition` 대신 삼항연산자 사용 
          {isloading
          ? <LoadingIndicator />
          : <FlightList list ={flightList} />
          }
        </div>

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
      </main>
    </div>
  )
}