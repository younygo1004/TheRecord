/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Clock from 'react-live-clock'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import '../../styles/diary/Calendar.css'

const getAlldate = (to, last) => {
  let newToday = to
  const dates = []

  dates[0] = newToday
  for (let i = 1; i <= 6; i++) {
    newToday += 1
    // 마지막 날보다 날짜가 클경우 today를 1로 초기화.
    if (newToday > last) {
      newToday = 1
      dates[i] = newToday
    } else {
      dates[i] = newToday
    }
  }
  return dates
}

// 요일 계산 표시 해봅시다 평일 검정, 공휴일/일요일 빨간색/ 토요일 파란색
const getAllweak = toWeak => {
  let newTodayWeak = toWeak
  const strWeak = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const newWeaklist = []

  // 첫번째 오늘 날짜 적용

  newWeaklist[0] = strWeak[newTodayWeak]
  // todayWeak=5
  // weaklist[0] = Fri

  for (let i = 1; i <= 6; i++) {
    newTodayWeak += 1
    if (newTodayWeak > 6) {
      newTodayWeak = 0
      newWeaklist[i] = strWeak[newTodayWeak]
    } else {
      newWeaklist[i] = strWeak[newTodayWeak]
    }
  }

  return newWeaklist
}

const now = new Date()
const todayWeak = now.getDay()
const today = now.getDate()
const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

function Calendar() {
  const [daylist, setDaylist] = useState([])
  const [weaklist, setWeaklist] = useState([])
  const [calendarObject, setCalendarObject] = useState([])
  const [alldate, setAlldate] = useState([])
  const [allweak, setAllweak] = useState([])
  const getList = useCallback(() => {
    setDaylist(daylist.concat(today))
    setWeaklist(weaklist.concat(today))
  }, [])

  useEffect(() => {
    setAlldate(() => getAlldate(today, lastday), [daylist])
    setAllweak(() => getAllweak(todayWeak), [weaklist])

    console.log('날짜 리스트 출력')

    const CalendarDay = getAlldate(today, lastday)
    const CalendarWeak = getAllweak(todayWeak)

    console.log('CalendarDay', CalendarDay)
    console.log('CalendarWeak', CalendarWeak)

    // 날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
    // 분해로 하나씩 넣는 방법

    setCalendarObject(() => [
      { weak: CalendarWeak[0], day: CalendarDay[0] },
      { weak: CalendarWeak[1], day: CalendarDay[1] },
      { weak: CalendarWeak[2], day: CalendarDay[2] },
      { weak: CalendarWeak[3], day: CalendarDay[3] },
      { weak: CalendarWeak[4], day: CalendarDay[4] },
      { weak: CalendarWeak[5], day: CalendarDay[5] },
      { weak: CalendarWeak[6], day: CalendarDay[6] },
    ])
  }, [])

  return (
    <div className="Calendar">
      <div className="Year-Month">
        <p>
          <span className="Year">
            <Clock format="YYYY" ticking={false} timezone="Asia/Seoul" />
          </span>
          &nbsp;&nbsp;
          <span className="Month">
            <Clock format="MM" ticking={false} timezone="Asia/Seoul" />
          </span>
        </p>
      </div>
      <div className="Day" onChange={getList}>
        <div className="daylistContainer">
          <div>
            {alldate.map((value, index) => (
              <span
                className="Daylist"
                key={value}
                style={{ cursor: 'pointer' }}
              >
                {value}
              </span>
            ))}
          </div>
          <div className="weaklistContainer">
            {allweak.map((value, index) => (
              <span
                className="Weaklist"
                key={`weaklist_${index + 1}`}
                style={{ cursor: 'pointer' }}
                value={value}
              >
                {value}
              </span>
            ))}
          </div>

          {/* {calendarObject.map((calendar, index) => (
            <div>
              <div className="cn">{calendar.weak}</div>
              <div className="cn">{calendar.day}</div>
            </div>
          ))} */}
        </div>

        <button type="button" className="calendarButton">
          {' '}
        </button>
        {/* 버튼은 이벤트용 안보이게 만듬 */}
        {/* <b>전체 보기</b>
        <CalendarMonthIcon /> */}
      </div>
    </div>
  )
}

export default Calendar
