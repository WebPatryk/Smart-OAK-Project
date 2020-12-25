import styled from 'styled-components';

import ImageSrc from '../../../../assets/images/some-dude-in-cafe.png';

const Wrapper = styled.div`
    padding: 100px 0 0 0;
    position: relative;
    z-index: 3;
`;

const Header = styled.h2`
    display: flex;
    flex-direction: column;
    color: black;

    width: fit-content;
    margin: 0 0 100px 100px;

    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 52px;
    line-height: 136%;
    @media (max-width: 550px) {
        margin: 0 15px 0 15px;
    }
    span {
        color: gray;
    }
`;

const ImageAndTextContainer = styled.div`
    display: flex;

    height: 960px;
    width: 100%;
    .WhiteBox {
        display: block;
        height: 100%;

        width: 35vw;

        background: white;
    }

    margin: 80px auto 0;

    background: url(${ImageSrc}) no-repeat;
    background-size: cover;

    background-position: 0 0;

    @media (max-width: 1224px) {
        background-size: auto;
        text-align: justify;
    }
`;

const Text = styled.p`
    margin: 65px 0px 0px 0;
    color: white;

    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 152%;
    overflow: hidden;

    p {
        max-width: 75%;
        margin: 24px 0;
        @media (max-width: 1224px) {
            width: 100%;
        }
    }

    & p:first-of-type {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 23px;
        line-height: 152%;
    }
    @media (max-width: 1224px) {
        padding-top: 0px;
    }

    @media screen and (max-width: 900px) {
        font-size: 22px;
    }
    @media screen and (max-width: 800px) {
        font-size: 14px;
    }
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

export { Wrapper, Header, ImageAndTextContainer, Text };
