import { useState } from 'react'

function Search({onSearch}) { 
// 3 onSearch props를 받아온다
  const [textDestination, setTextDestination] = useState('')

  const handleChange = (e) => {
    setTextDestination(e.target.value.toUpperCase())
  }

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSearchClick()
    }
  }

  const handleSearchClick = () => {
    console.log('검색 버튼을 누르거나, 엔터를 치면 search 함수가 실행됩니다')

  // 4 상태 변경 함수 `search`는 Search 컴포넌트의 `검색` 버튼 클릭 시 실행되어야 합니다 
  // 검색 버튼을 클릭했을때 onChange는 handleChange값이 변경된다고 아래에 적혀있다
  // handleChange는 도착지 값이 변경되는 것을 알려주고 있고 
  // 출발지는 고정하고 도착지의 값을 textDestination으로 변경해주면 된다 
  // 서치 함수에서 setCondition({departure, destination}) 객체형태로 값을 받아오는걸 알 수 있으니
  // 똑같이 값을 넣어줘야 한다
    onSearch({departure : "ICN", destination : textDestination})
  }

  return <fieldset>
    <legend>공항 코드를 입력하고, 검색하세요</legend>
    <span>출발지</span>
    <input id="input-departure" type="text" disabled value="ICN"></input>
    <span>도착지</span>
    <input id="input-destination" type="text" value={textDestination} onChange={handleChange} placeholder="CJU, BKK, PUS 중 하나를 입력하세요" onKeyPress={handleKeyPress} />
    <button id="search-btn" onClick={handleSearchClick}>검색</button>
  </fieldset>
}

export default Search;