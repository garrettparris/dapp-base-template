import styled from 'styled-components'

const Shimmer = styled.div`
    height: 100%;
    width: 100%;
    background: #3a3a3a;
    background-image: linear-gradient(to right, #3a3a3a 0%, #3f3f3f 10%, #4a4a4a 20%, #3f3f3f 30%, #3a3a3a 50%, #3a3a3a 100%);
    background-repeat: no-repeat;
    background-size: 800px 800px; 
    display: block;
    position: relative; 
    animation: placeholderShimmer 2s linear infinite forwards;
    
    -webkit-animation-duration: 2s;
    -webkit-animation-fill-mode: forwards; 
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: placeholderShimmer;
    -webkit-animation-timing-function: linear;

  
@-webkit-keyframes placeholderShimmer {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0; 
    }
}
  
@keyframes placeholderShimmer {
    0% {
        background-position: -468px 0;
        }
        
    100% {
        background-position: 468px 0; 
        }
}
`

export default Shimmer
