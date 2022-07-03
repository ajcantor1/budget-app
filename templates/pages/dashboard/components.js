import styled from 'styled-components';

export const StyledContainer = styled.section`
  padding: 10px;
  text-align: center;
  margin: auto;
  max-width: 200px;
`

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AddButton = styled.button`
  font-size: 24px;
  border-radius: 70%;
  background-color: #48abe0;
  color: white;
  border: none;
  padding: 5px;
  height: 40px;
  width: 40px;
  box-shadow: 0 2px 4px darkslategray;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active{
    background-color: #48abe0;
    box-shadow: 0 0 2px darkslategray;
    transform: translateY(2px);   
  }
`

export const SVGContainer = styled.svg`
  width: 180px;
  height: 180px;
  margin: auto;
`

export const Circle = styled.circle.attrs(props => ({
  stroke: props.color ||'green',
  r: props.radius,
  cx: 90,
  cy: 90,
  strokeDashoffset: (props.radius * 2 * Math.PI - props.percent / 100 * props.radius * 2 * Math.PI).toString(),
  strokeDasharray: props.radius * 2 * Math.PI,
  strokeWidth: 20,
  strokeOpacity: 0.6
}))`
  transition: 0.35s stroke-dashoffset, 0.35s stroke;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  fill: transparent;
`

export const Amount = styled.text.attrs(props => ({
  x: 90,
  y: 95,
  textAnchor: 'middle',
  stroke: props.color ||'green',
  strokeWidth: '2px'
}))`

`

export const ExpensesOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ExpenseContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px auto;
  width: 180px;
  height: 30px;
  padding: 5px 0;
  background-color: rgba(156, 204, 234, 0.3);;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const RemoveButton = styled.button`

  border: none;
  height: 24px;
  width: 24px;
  background: none;
  color: red;
  cursor: pointer;
  margin: 0 2px;
  font-size: 14px;
  font-weight: 700;
	border: none;
	padding: 0;
	outline: inherit;

  & > div {
    margin: 3.5px 0 0 0;
  }
`

export const Price = styled.div`
  margin: 2.5px 2px 0 2px;
  font-size: 14px;
  font-weight: 700;
`

export const Notes = styled.div`
  margin: 1px 0 0 8px;
  font-size: 12px;
`

export const ModalContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  & > div, input, textArea {
    margin: 5px;
    font-size: 14px;
  }

  & > textArea {
    resize: none;
  }
`

export const ModalButtonContainer = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 5px;
`

export const ModalButton = styled.button`
  font-size: 16px;
  background-color: #48abe0;
  color: white;
  border: none;
  padding: 5px;
  height: 30px;
  width: 70px;
  cursor: pointer;
`


