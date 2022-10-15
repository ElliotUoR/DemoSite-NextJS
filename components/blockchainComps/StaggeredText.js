import styled from "styled-components";


const _ = ({ string }) => {
  return (
    <>
      {[...string].map((letter, i) => (
        <Letter stringLength={string.length} key={i} style={{ animationDelay: `${i / 10}s` }}>
          {letter}
        </Letter>
      ))}
    </>
  );
};

const Letter = styled.p`
  color: green;
  font-family: monospace;
  font-size: 1.3rem;
  animation: fadeIn 2s;
  animation-duration: 
  ${props => props.stringLength *0.075 + "s"};
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;

  margin-block-start: 0.1em;
  margin-block-end: 0.1em;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Temp = styled.div`
  display: flex;
  flex-wrap: wrap;
  user-select: none;
`

const StaggeredText = ({ string }) => (
  <Temp>
    <_ string={string} />
  </Temp>
);
export default StaggeredText;
