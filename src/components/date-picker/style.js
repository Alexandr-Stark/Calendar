import styled from 'styled-components';

const first_color = '#55a5ff';
const second_color = '#0f5099';
const sep_line_color = 'rgba(0, 0, 0, 0.07)';

const Wrapper = styled.div`
& * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  padding-bottom: 15px;
  max-width: 320px;
  width: 100%;
  box-shadow: 0 5px 15px #55a4ff65;
  position: absolute;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
`;

const Header = styled.div`
    margin-top: 15px;
    height: 25px;
    position: relative;
`;

const ExitButton = styled.div`
    margin-top: 15px;
    height: 25px;
    position: relative;
    cursor: pointer;
  height: 100%;
  width: 20px;
  position: relative;
  transform: translate(-100%, 0);
  top: 50%;
  left: 96%;

  &::before,
  &::after {
    content: '';
    display: block;
    height: 2px;
    width: 17px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
`;

const Month = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MonthButtonPrev = styled.span`
    display: block;
    border: 5.5px solid transparent;
    cursor: pointer;
    border-right: 5.5px solid ${first_color};
`;

const MonthButtonNext = styled.span`
    display: block;
    border: 5.5px solid transparent;
    cursor: pointer;
    border-left: 5.5px solid ${first_color};
`;

const MonthName = styled.h2`
    font-weight: normal;
    color: ${second_color};
    margin: 0 25px;
`;

const Range = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
align-self: center;
    padding: 15px;
`;

const RangeButtonPrev = MonthButtonPrev;

const RangeButtonNext = MonthButtonNext;

const Label = styled.label`
max-width: 100px;
width: 100%;
padding: 6px 8px;
border-radius: 5px;
border: 1px solid ${first_color};
background-color: white;
& input:disabled {
    background-color: inherit;
    border: 0;
    font-size: 15px;
    width: 100%;
    color: rgba(0, 0, 0, 0.65);
  }
}
`;

const LabelSeparator = styled.div`
    height: 2px;
    width: 14px;
    background-color: rgba(0, 0, 0, 0.3);
`;

const DefaultPicker = styled.div`
padding: 6px;
display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 2px solid ${sep_line_color};
  border-bottom: 2px solid ${sep_line_color};
  text-transform: uppercase;
`;

const RangePresetButton = styled.div`
padding: 0 7px;
    font-size: 11px;
    color: ${first_color};
    letter-spacing: 0.07em;
    opacity: 0.7;
    cursor: pointer;
`;

const Footer = styled.div`
display: flex;
    align-items: center;
    justify-content: center;
`;

const FooterApplyButton = styled.button`
margin-top: 15px;
border: 0;
  border-radius: 5px;
  font-family: inherit;
  padding: 10px 30px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: ${second_color};
  font-weight: bold;
  cursor: pointer;
`;


export {
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
};
