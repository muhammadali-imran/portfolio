import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';

// Register once for the whole app. All of these plugins are free in the public `gsap` package.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, TextPlugin, ScrambleTextPlugin);

export { gsap, ScrollTrigger, SplitText, useGSAP };
