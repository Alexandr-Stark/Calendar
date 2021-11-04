import React, { useState } from 'react';
import Calendar from '../calendar';
import PropTypes from 'prop-types';

import {
    Wrapper, 
    Header, 
    ExitButton, 
    Body, 
    Month, 
    MonthName, 
    MonthButtonPrev, 
    MonthButtonNext, 
    Range, 
    RangeButtonPrev, 
    RangeButtonNext, 
    Label,
    LabelSeparator,
    DefaultPicker,
    RangePresetButton,
    Footer,
    FooterApplyButton  

} from './style';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December ',
];

function DatePicker(props) {
  const [date, setDate] = useState(new Date());
  const [multiRange, setMultiRange] = useState([{ from: null, to: null }]);
  const [activeRangeIndex, setActiveRangeIndex] = useState(0);

  const handleClickApply = () => {
    console.log(multiRange);
  };

  const handleClickPrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleClickNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const getLastDate = (callback) => {
    setDate(new Date());

    const dateParams = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };

    callback(dateParams);
  };

  const handleClickLastWeek = () => {
    getLastDate((dateParams) =>
      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex
            ? {
                from: new Date(dateParams.year, dateParams.month, dateParams.day - 7).getTime(),
                to: new Date(dateParams.year, dateParams.month, dateParams.day).getTime(),
              }
            : value,
        ),
      ),
    );
  };

  const handleClickLastMonth = () => {
    getLastDate((dateParams) =>
      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex
            ? {
                from: new Date(dateParams.year, dateParams.month, dateParams.day - 30).getTime(),
                to: new Date(dateParams.year, dateParams.month, dateParams.day).getTime(),
              }
            : value,
        ),
      ),
    );
  };

  const handleClickLastQuarter = () => {
    getLastDate((dateParams) =>
      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex
            ? {
                from: new Date(dateParams.year, dateParams.month, dateParams.day - 90).getTime(),
                to: new Date(dateParams.year, dateParams.month, dateParams.day).getTime(),
              }
            : value,
        ),
      ),
    );
  };

  const handleClickNextRange = () => {  
    if(props.rangeType !== 'multiRange'){
      return;
    }
    
    if (!multiRange[activeRangeIndex].from && !multiRange[activeRangeIndex].to) {
      return;
    }

    if (!multiRange[activeRangeIndex + 1]) {
      setMultiRange([...multiRange, { from: null, to: null }]);
    }

    setActiveRangeIndex(activeRangeIndex + 1);
  };

  const handleClickPrevRange = () => {
    if (!multiRange[activeRangeIndex - 1]) {
      return;
    }

    setActiveRangeIndex(activeRangeIndex - 1);
    
  };

  const setRangeCallback = (pickedDate) => {
    // Take away range from
    if (multiRange[activeRangeIndex].from && pickedDate === multiRange[activeRangeIndex].from) {
      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex ? { ...value, from: null } : value,
        ),
      );
      //setRange({ ...range, from: null });
      return;
    }

    //Take away range to
    if (multiRange[activeRangeIndex].to && pickedDate === multiRange[activeRangeIndex].to) {
      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex ? { ...value, to: null } : value,
        ),
      );
      //setRange({ ...range, to: null });
      return;
    }

    //Set up range from
    if (!multiRange[activeRangeIndex].from) {
      //Check for range order
      if (multiRange[activeRangeIndex].to && pickedDate > multiRange[activeRangeIndex].to) {
        return;
      }

      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex ? { from: pickedDate, to: null } : value,
        ),
      );
      //setRange({ from: pickedDate, to: null });
      return;
    }

    //Set up range to
    if (!multiRange[activeRangeIndex].to) {
      //Check for range order
      if (multiRange[activeRangeIndex].from && pickedDate < multiRange[activeRangeIndex].from) {
        return;
      }

      setMultiRange(
        multiRange.map((value, index) =>
          index === activeRangeIndex ? { ...value, to: pickedDate } : value,
        ),
      );
      return;
    }
  };

  return (
    <Wrapper>
      <Header>
        <ExitButton></ExitButton>
      </Header>
      <Body>
        <Month>
          <MonthButtonPrev onClick={handleClickPrevMonth}></MonthButtonPrev>
          <MonthName>
            {months[date.getMonth()]} {date.getFullYear()}
          </MonthName>
          <MonthButtonNext onClick={handleClickNextMonth}></MonthButtonNext>
        </Month>
        <div>
          <Calendar
            date={new Date(date.getFullYear(), date.getMonth())}
            range={multiRange[activeRangeIndex]}
            setRangeCallback={setRangeCallback}
          />
        </div>
        <Range>
          <RangeButtonPrev onClick={handleClickPrevRange}></RangeButtonPrev>
          <Label htmlFor="dp-range-from">
            <input
              id="dp-range-from"
              type="text"
              disabled
              value={
                multiRange[activeRangeIndex].from
                  ? new Date(multiRange[activeRangeIndex].from)
                      .toLocaleDateString('en-GB')
                      .split('/')
                      .join('-')
                  : ''
              }
            />
          </Label>
          <LabelSeparator></LabelSeparator>
          <Label htmlFor="dp-range-to">
            <input
              id="dp-range-to"
              type="text"
              disabled
              value={
                multiRange[activeRangeIndex].to
                  ? new Date(multiRange[activeRangeIndex].to)
                      .toLocaleDateString('en-GB')
                      .split('/')
                      .join('-')
                  : ''
              }
            />
          </Label>
          <RangeButtonNext onClick={handleClickNextRange}></RangeButtonNext>
        </Range>
        <DefaultPicker >
          <RangePresetButton onClick={handleClickLastWeek}>
            Last week
          </RangePresetButton>
          <RangePresetButton onClick={handleClickLastMonth}>
            Last month
          </RangePresetButton>
          <RangePresetButton onClick={handleClickLastQuarter}>
            Last quarter
          </RangePresetButton>
        </DefaultPicker>
      </Body>
      <Footer>
        <FooterApplyButton onClick={handleClickApply}>
          Apply
        </FooterApplyButton>
      </Footer>
    </Wrapper>
  );
}

DatePicker.defaultProps = {
  rangeType : 'multiRange'
};

DatePicker.propTypes = {
  rangeType : PropTypes.oneOf(['multiRange', 'singleRange']).isRequired
};

export default DatePicker;