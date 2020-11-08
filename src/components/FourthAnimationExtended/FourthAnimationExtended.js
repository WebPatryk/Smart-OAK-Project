import React, { useRef, useEffect } from 'react';
import ImageSrc from '../../assets/images/forest-background-cropped.png';
import { useIntl } from 'gatsby-plugin-intl';
import { scaleImgOnScroll } from './Animate';
import {
    AnimationContentParagraph,
    AnimationContainer,
    AnimationImg,
    AnimationContent,
    AnimationContentHeader,
    AfterAnimationContainer,
    AfterAnimationContentParagraph,
    AfterAnimationContentHeader,
    FourthAnimationExtended,
    Wrapper,
} from './styles.js';

const FourthAnimation = () => {
    const imgRef = useRef(null);
    const intl = useIntl();

    useEffect(() => {
        scaleImgOnScroll(imgRef.current);
    }, []);

    return (
        <FourthAnimationExtended>
            <AnimationContainer>
                <AnimationImg src={ImageSrc} ref={imgRef} />
                <AnimationContent>
                    <AnimationContentHeader>
                        <h2>
                            {intl.formatMessage({
                                id: `fourthAnimationExtendedSection.title1`,
                            })}
                        </h2>
                    </AnimationContentHeader>
                    <AnimationContentParagraph>
                        <p>
                            {intl.formatMessage({
                                id: `fourthAnimationExtendedSection.block1`,
                            })}
                        </p>
                    </AnimationContentParagraph>
                </AnimationContent>
            </AnimationContainer>
            <Wrapper>
                <FourthAnimationExtended>
                    <AfterAnimationContainer>
                        <AfterAnimationContentHeader>
                            <h2>
                                {intl.formatMessage({
                                    id: `fourthAnimationExtendedSection.title2`,
                                })}
                            </h2>
                        </AfterAnimationContentHeader>
                        <AfterAnimationContentParagraph>
                            <p>
                                {intl.formatMessage({
                                    id: `fourthAnimationExtendedSection.block2`,
                                })}
                            </p>
                        </AfterAnimationContentParagraph>
                    </AfterAnimationContainer>
                </FourthAnimationExtended>
            </Wrapper> 
        </FourthAnimationExtended>
    );
};

export default FourthAnimation;
