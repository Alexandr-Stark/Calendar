import styled from "styled-components";

const main_dark = '#0f5099';
const main_light = '#e5f1ff';

const Table = styled.table`
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  letter-spacing: 0.08em;
  border-spacing: 0 5px;
`;

const Td = styled.td`
  height: 30px;
  text-align: center;
  cursor: pointer;
  opacity: ${(props) => (props.className === "another-month" ? "0.25" : "1")};

  ${(props) =>
    props.className === "from"
      ? `background-color: ${main_dark};
        color: #fff;
        border-radius: 5px 0 0 5px;`
      : ""}

  ${(props) =>
    props.className === "to"
      ? `background-color: ${main_dark};
        color: #fff;
        border-radius: 0px 5px 5px 0px;`
      : ""}

  ${(props) =>
    props.className === "between"
      ? `background-color:${main_light};
        color: #0f5099;`
      : ""}
`;

const Th = styled.th`
  height: 30px;
  font-size: 12px;
  text-transform: uppercase;
  opacity: 0.25;
`;

export { Table, Th, Td };
