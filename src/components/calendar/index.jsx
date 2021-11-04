import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Table, Th, Td} from './style.js'


const FIRST_MONTH_DAY = 1;
const ROW_COUNT = 5;
const COL_COUNT = 7;

const getRegularDayCountFromJsDay = (jsDay) => {
    return [6, 0, 1, 2, 3, 4, 5][jsDay];
}

function Calendar({date, range, setRangeCallback}) {
    const [calendarMatrix, setCalendarMatrix] = useState([]);

    useEffect(() => {
        const firstCalendarDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            FIRST_MONTH_DAY - getRegularDayCountFromJsDay(date.getDay())
        );

        const tempMatrix = [];
        let dayCounter = 0;

        for(let i = 0; i < ROW_COUNT; i++){
            const week = [];

            for(let j = 0; j < COL_COUNT; j++){

                const cellDate = new Date(
                    firstCalendarDate.getFullYear(),
                    firstCalendarDate.getMonth(),
                    firstCalendarDate.getDate() + dayCounter++
                );

                week.push(cellDate.getTime());
            }

            tempMatrix.push(week);
            
        }

        setCalendarMatrix(tempMatrix);
    }, [date]);

    const getStyleByDate = (timestamp, range) => {
      if (timestamp === range.from) {
        return 'from';
      }
  
      if (timestamp === range.to) {
        return 'to';
      }
  
      if (range.from && timestamp > range.from && range.from && timestamp < range.to) {
        return 'between';
      }

      if (new Date(timestamp).getMonth() !== date.getMonth()) {
        return 'another-month';
      }
  
      return '';
    };

    const handleClick = (event) => {
      const node = event.target;
  
      if (node.tagName !== 'TD') {
        return;
      }
  
      const pickedDate =
        calendarMatrix[event.target.closest('tr').rowIndex - 1][event.target.cellIndex];
  
      setRangeCallback(pickedDate);
    };

    return (
        <Table>
          <thead>
            <tr>
              <Th>Mon</Th>
              <Th>Tue</Th>
              <Th>Wed</Th>
              <Th>Thu</Th>
              <Th>Fri</Th>
              <Th>Sat</Th>
              <Th>Sun</Th>
            </tr>
          </thead>
          <tbody onClick={handleClick}>
            {calendarMatrix.map((row, index) => (
              <tr key={`row_${index}`}>
                {row.map((cell, index) => (
                  <Td
                    key={`cell_${index}`}
                    className={getStyleByDate(cell, range)}>
                    {new Date(cell).getDate()}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
}


Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  range: PropTypes.object.isRequired,
  setRangeCallback: PropTypes.func.isRequired,
};


export default Calendar;