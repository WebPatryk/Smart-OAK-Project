import React, { Component, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, useIntl } from 'gatsby-plugin-intl';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { gsap } from 'gsap';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SearchWrapper = styled.div`
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35vw;

    svg {
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.85);
        margin-right: 0.8rem;
        margin-left: 0.8rem;
        cursor: pointer;
    }
    @media screen and (max-width: 900px) {
        width: 90%;
        margin-left: 2rem;
        svg {
            margin-right: 0;
        }
    }
`;
const DropDown = styled.div`
    background-color: #fff;
    border-radius: 0 0 18px 18px;
    padding-top: 2vh;
    position: absolute;
    right: 0;
    top: 55px;
    width: 35vw;
    z-index: 100010123312;
    display: flex;
    flex-direction: column;
    animation: 0.6s ${fadeIn} ease-in;

    @media screen and (max-width: 900px) {
        width: 90vw;
        top: 8rem;
        padding-bottom: 0vh;
        padding-top: 0vh;
        border-radius: 0;
    }
`;
const DropdownLink = styled(Link)`
    padding: 1.2rem 0.8rem;
    list-style: none;
    padding-left: 8rem;
    cursor: pointer;
    color: #000;
    position: relative;
    text-decoration: none;
    transform: translateX(20%);
    opacity: 0;

    &:hover {
        &:last-child {
            border-radius: 0 0 1rem 1rem;
        }
        color: #06c;
        background-color: #f4f4f4;
    }
`;

const Backdrop = styled.div`
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    left: 0;
    top: 5.5rem;
    width: 100vw;
    height: calc(100vh - 5.5rem);
    z-index: 10000143;
`;

const Input = styled.input`
    width: 100%;
    background-color: inherit;
    border: none;
    border-radius: 14px;
    font-size: 1.4rem;
    height: 3rem;
    color: rgba(255, 255, 255, 0.85);
    padding: 1rem 2rem;
    outline: none;
    background: #282828;
    margin: 2rem auto;
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        -webkit-appearance: none;
    }
    ${(props) =>
        props.isDesktop &&
        css`
            margin: 3rem auto;
            background-color: #0e0e0e;
            -webkit-appearance: textfield;
            border: none;
            border-radius: 14px;
            height: 2.2rem;
            color: rgba(255, 255, 255, 0.85);
            outline: none;
            animation: 0.6s ${fadeIn} ease-out;
            transform: translateX(10%);
            opacity: 0;
            &::-webkit-search-decoration,
            &::-webkit-search-cancel-button,
            &::-webkit-search-results-button,
            &::-webkit-search-results-decoration {
                -webkit-appearance: none;
            }
        `}
`;
const InputSearch = ({ isDesktop, handleRef }) => {
    const intl = useIntl();

    const childRef = useRef(null);

    useEffect(() => {
        gsap.to(childRef.current, 0.5, {
            transform: 'translateX(0)',
            opacity: 1,
            ease: 'none',
        });
        handleRef(childRef);
    }, []);

    const inputPlaceholder = `${intl.formatMessage({
        id: 'navigation.searchIn',
    })} Smart Oak Project`;

    return (
        <Input ref={childRef} isDesktop={isDesktop} type="search" placeholder={inputPlaceholder} />
    );
};

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedPhrase: '',
            searchedLinks: this.props.projectsList,
            childRef: null,
        };
    }
    handleRef = (ref) => {
        this.setState({
            childRef: ref,
        });
    };
    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutside);
        gsap.to(this.wrapperRef.children, {
            transform: 'translateX(0)',
            opacity: 1,
            duration: 0.5,
            stagger: 0.03,
            ease: 'none',
        });
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleSearchInputChange = (event) => {
        if (event) {
            this.setState(
                {
                    searchedPhrase: event.target.value,
                },
                this.searchInMenu,
            );
        } else {
            this.setState(() => ({
                searchedLinks: this.props.projectsList,
            }));
        }
    };

    clearIfEmpty = () => {
        if (this.state.searchedPhrase === '') {
            this.setState({
                searchedLinks: [],
            });
        }
    };

    searchInMenu = () => {
        let links = [];
        this.props.projectsList.forEach((link) => {
            if (link.text.toLowerCase().includes(this.state.searchedPhrase)) {
                links.push(link);

                links = links.filter(
                    (e, i) => links.findIndex((a) => a['text'] === e['text']) === i,
                );

                this.setState({
                    searchedLinks: links,
                });
            }
        });
    };

    handleClickOutside = (event) => {
        if (
            this.wrapperRef &&
            this.state.childRef.current &&
            !this.state.childRef.current.contains(event.target) &&
            !this.wrapperRef.contains(event.target)
        ) {
            if (this.props.isDesktop) {
                this.props.onInputClose();
            } else {
                this.setState({ searchedLinks: [], searchedPhrase: '' });
            }
        }
    };
    onCloseClick = () => {
        this.setState({ searchedLinks: [], searchedPhrase: '' });
    };

    render() {
        return (
            <>
                <SearchWrapper>
                    {this.props.isDesktop ? (
                        <AiOutlineSearch style={{ cursor: 'default' }} />
                    ) : null}
                    <InputSearch
                        handleRef={this.handleRef}
                        isDesktop={this.props.isDesktop}
                        onChange={(event) => {
                            this.handleSearchInputChange(event);
                            this.clearIfEmpty();
                        }}
                        value={this.state.searchedPhrase}
                        ref={(InputSearch) => (this.searchbar = InputSearch)}
                    />

                    <DropDown ref={(node) => (this.wrapperRef = node)}>
                        {this.state.searchedLinks
                            .filter((e, i) => i <= 5)
                            .map((link, index) => {
                                return (
                                    <DropdownLink
                                        onClick={this.props.onInputClose}
                                        key={index}
                                        to={link.path}
                                    >
                                        {link.text}
                                    </DropdownLink>
                                );
                            })}
                    </DropDown>

                    <AiOutlineClose
                        style={{ fontSize: '1.9rem', zIndex: '10' }}
                        onClick={this.props.isDesktop ? this.props.onInputClose : this.props}
                    />
                </SearchWrapper>
                {this.props.isDesktop ? <Backdrop /> : null}
            </>
        );
    }
}
