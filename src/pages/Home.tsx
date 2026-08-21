import React, { useMemo, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faChartLine,
  faCheckCircle,
  faCloud,
  faCode,
  faGlobe,
  faHeadset,
  faLaptopCode,
  faMicrochip,
  faNetworkWired,
  faServer,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/forms/ContactForm';
import './Home.css';

const svgToDataUri = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const createTechVisual = (
  kind:
    | 'hero'
    | 'software'
    | 'hardware'
    | 'network'
    | 'ai'
    | 'operations'
    | 'retail'
    | 'property'
    | 'education',
  accent: string,
  accentSoft: string
) => {
  const commonDefs = `
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#071220"/>
        <stop offset="55%" stop-color="#0b1f39"/>
        <stop offset="100%" stop-color="#08111b"/>
      </linearGradient>
      <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#132746"/>
        <stop offset="100%" stop-color="#0c1730"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentSoft}"/>
        <stop offset="100%" stop-color="${accent}"/>
      </linearGradient>
      <radialGradient id="glow" cx="70%" cy="25%" r="60%">
        <stop offset="0%" stop-color="${accentSoft}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
  `;

  const commonGrid = `
    <rect width="1600" height="900" rx="42" fill="url(#bg)"/>
    <rect x="0" y="0" width="1600" height="900" rx="42" fill="url(#glow)"/>
    <g stroke="rgba(109,152,255,0.14)" stroke-width="2">
      <path d="M0 90 H1600"/><path d="M0 180 H1600"/><path d="M0 270 H1600"/><path d="M0 360 H1600"/>
      <path d="M0 450 H1600"/><path d="M0 540 H1600"/><path d="M0 630 H1600"/><path d="M0 720 H1600"/>
      <path d="M0 810 H1600"/><path d="M160 0 V900"/><path d="M320 0 V900"/><path d="M480 0 V900"/>
      <path d="M640 0 V900"/><path d="M800 0 V900"/><path d="M960 0 V900"/><path d="M1120 0 V900"/>
      <path d="M1280 0 V900"/><path d="M1440 0 V900"/>
    </g>
  `;

  const visuals = {
    hero: `
      <rect x="94" y="82" width="310" height="64" rx="32" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
      <text x="132" y="121" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#dfeaff" font-weight="700">Control Layer</text>
      <text x="94" y="215" font-family="Arial, Helvetica, sans-serif" font-size="62" fill="#ffffff" font-weight="800">AI command center</text>
      <rect x="92" y="272" width="540" height="248" rx="34" fill="url(#panel)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="136" y="316" width="214" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
      <rect x="136" y="356" width="380" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="136" y="396" width="302" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <g transform="translate(920 128)">
        <rect x="0" y="0" width="430" height="520" rx="44" fill="rgba(8,18,34,0.84)" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="216" cy="238" r="128" fill="rgba(12,25,48,0.94)" stroke="${accentSoft}" stroke-opacity="0.42" stroke-width="10"/>
        <circle cx="216" cy="238" r="78" fill="url(#accent)"/>
        <circle cx="216" cy="238" r="166" fill="none" stroke="${accentSoft}" stroke-opacity="0.22" stroke-width="2"/>
        <circle cx="216" cy="238" r="198" fill="none" stroke="${accentSoft}" stroke-opacity="0.15" stroke-width="2" stroke-dasharray="12 12"/>
        <path d="M216 16 V92 M216 384 V458 M32 238 H106 M326 238 H400" stroke="${accentSoft}" stroke-width="6" stroke-linecap="round"/>
        <path d="M86 104 L138 156 M294 320 L346 372 M294 156 L346 104 M86 372 L138 320" stroke="${accentSoft}" stroke-width="6" stroke-linecap="round"/>
        <rect x="58" y="58" width="128" height="42" rx="21" fill="rgba(255,255,255,0.06)"/><text x="80" y="86" font-family="Arial" font-size="22" fill="#eff6ff" font-weight="700">Live</text>
        <rect x="250" y="58" width="128" height="42" rx="21" fill="rgba(255,255,255,0.06)"/><text x="264" y="86" font-family="Arial" font-size="22" fill="#eff6ff" font-weight="700">Systems</text>
        <rect x="88" y="430" width="252" height="26" rx="13" fill="${accentSoft}" fill-opacity="0.32"/>
      </g>
    `,
    software: `
      <rect x="70" y="88" width="340" height="70" rx="35" fill="rgba(255,255,255,0.05)"/><text x="108" y="132" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Software Engineering</text>
      <rect x="86" y="224" width="660" height="436" rx="42" fill="rgba(9,20,38,0.92)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="136" y="280" width="286" height="184" rx="24" fill="url(#panel)"/>
      <rect x="176" y="328" width="146" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
      <rect x="176" y="366" width="202" height="18" rx="9" fill="rgba(255,255,255,0.09)"/>
      <rect x="176" y="404" width="132" height="18" rx="9" fill="${accentSoft}" fill-opacity="0.38"/>
      <rect x="446" y="276" width="248" height="320" rx="28" fill="rgba(16,34,64,0.9)" stroke="rgba(255,255,255,0.08)"/>
      <text x="486" y="330" font-family="Arial" font-size="34" fill="#ffffff" font-weight="800">Code Stack</text>
      <g stroke="${accentSoft}" stroke-width="8" stroke-linecap="round">
        <path d="M514 392 L478 428 L514 464"/>
        <path d="M624 392 L660 428 L624 464"/>
        <path d="M566 486 L604 372"/>
      </g>
      <g transform="translate(878 186)">
        <rect width="580" height="470" rx="42" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="48" y="54" width="484" height="292" rx="28" fill="url(#panel)"/>
        <path d="M84 286 C154 204, 236 222, 306 166 C380 110, 432 250, 510 184" fill="none" stroke="${accentSoft}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="154" cy="222" r="10" fill="${accent}"/><circle cx="306" cy="166" r="10" fill="${accentSoft}"/><circle cx="510" cy="184" r="10" fill="${accent}"/>
        <rect x="76" y="372" width="160" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="110" y="405" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Web</text>
        <rect x="256" y="372" width="160" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="280" y="405" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">API</text>
        <rect x="436" y="372" width="96" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="456" y="405" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">UX</text>
      </g>
    `,
    hardware: `
      <rect x="86" y="104" width="366" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="124" y="147" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Hardware Integration</text>
      <g transform="translate(146 240)">
        <rect x="0" y="40" width="376" height="258" rx="34" fill="rgba(12,24,46,0.94)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="48" y="0" width="282" height="96" rx="22" fill="url(#panel)"/>
        <rect x="90" y="30" width="198" height="16" rx="8" fill="rgba(255,255,255,0.14)"/>
        <rect x="90" y="58" width="128" height="14" rx="7" fill="${accentSoft}" fill-opacity="0.38"/>
        <circle cx="188" cy="170" r="84" fill="rgba(17,33,62,0.96)" stroke="${accentSoft}" stroke-opacity="0.44" stroke-width="10"/>
        <circle cx="188" cy="170" r="36" fill="url(#accent)"/>
        <g stroke="${accentSoft}" stroke-width="8" stroke-linecap="round">
          <path d="M188 48 V86"/><path d="M188 254 V292"/><path d="M66 170 H104"/><path d="M272 170 H310"/>
          <path d="M104 86 L130 112"/><path d="M246 228 L272 254"/><path d="M104 254 L130 228"/><path d="M246 112 L272 86"/>
        </g>
      </g>
      <g transform="translate(820 190)">
        <rect width="640" height="478" rx="42" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="82" y="80" width="470" height="300" rx="34" fill="url(#panel)"/>
        <rect x="128" y="130" width="120" height="120" rx="22" fill="rgba(255,255,255,0.06)"/>
        <rect x="274" y="120" width="156" height="146" rx="22" fill="rgba(255,255,255,0.05)"/>
        <rect x="456" y="138" width="58" height="104" rx="18" fill="rgba(255,255,255,0.06)"/>
        <path d="M248 190 H274 M430 190 H456 M188 250 V312 M352 266 V344 M485 244 V330" stroke="${accentSoft}" stroke-width="8" stroke-linecap="round"/>
        <circle cx="188" cy="190" r="12" fill="${accent}"/><circle cx="352" cy="190" r="12" fill="${accentSoft}"/><circle cx="485" cy="190" r="12" fill="${accent}"/>
        <rect x="94" y="404" width="186" height="48" rx="24" fill="rgba(255,255,255,0.06)"/><text x="130" y="436" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Sensors</text>
        <rect x="304" y="404" width="208" height="48" rx="24" fill="rgba(255,255,255,0.06)"/><text x="334" y="436" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Connected POS</text>
      </g>
    `,
    network: `
      <rect x="96" y="86" width="426" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="132" y="130" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Networking Infrastructure</text>
      <g transform="translate(98 240)">
        <rect width="560" height="420" rx="38" fill="rgba(10,22,41,0.88)" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="278" cy="210" r="114" fill="rgba(14,30,56,0.96)" stroke="${accentSoft}" stroke-opacity="0.38" stroke-width="10"/>
        <circle cx="278" cy="210" r="46" fill="url(#accent)"/>
        <circle cx="110" cy="118" r="22" fill="${accent}"/><circle cx="446" cy="118" r="22" fill="${accent}"/><circle cx="100" cy="306" r="22" fill="${accentSoft}"/><circle cx="446" cy="302" r="22" fill="${accentSoft}"/>
        <path d="M132 118 H200 L240 176 M424 118 H358 L316 176 M122 306 H210 L240 240 M424 302 H346 L316 240" stroke="${accentSoft}" stroke-width="8" stroke-linecap="round" fill="none"/>
        <rect x="168" y="28" width="214" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="206" y="61" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Cloud mesh</text>
      </g>
      <g transform="translate(782 190)">
        <rect width="694" height="478" rx="42" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="70" y="76" width="554" height="318" rx="34" fill="url(#panel)"/>
        <path d="M140 312 C224 212, 320 238, 404 180 C474 130, 546 198, 608 126" fill="none" stroke="${accentSoft}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="140" cy="312" r="10" fill="${accentSoft}"/><circle cx="404" cy="180" r="10" fill="${accent}"/><circle cx="608" cy="126" r="10" fill="${accentSoft}"/>
        <rect x="92" y="420" width="176" height="48" rx="24" fill="rgba(255,255,255,0.06)"/><text x="118" y="452" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">High uptime</text>
        <rect x="294" y="420" width="176" height="48" rx="24" fill="rgba(255,255,255,0.06)"/><text x="320" y="452" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Cloud secure</text>
        <rect x="494" y="420" width="120" height="48" rx="24" fill="rgba(255,255,255,0.06)"/><text x="522" y="452" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">LAN</text>
      </g>
    `,
    ai: `
      <rect x="104" y="88" width="236" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="142" y="132" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">AI Systems</text>
      <g transform="translate(128 214)">
        <rect width="1348" height="476" rx="42" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="70" y="66" width="320" height="190" rx="28" fill="url(#panel)"/>
        <rect x="116" y="104" width="188" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
        <rect x="116" y="144" width="156" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
        <rect x="116" y="184" width="214" height="18" rx="9" fill="${accentSoft}" fill-opacity="0.36"/>
        <circle cx="898" cy="160" r="110" fill="rgba(15,27,51,0.9)" stroke="${accentSoft}" stroke-opacity="0.42" stroke-width="10"/>
        <circle cx="898" cy="160" r="56" fill="url(#accent)"/>
        <circle cx="898" cy="160" r="144" fill="none" stroke="${accentSoft}" stroke-opacity="0.18" stroke-width="2"/>
        <path d="M898 8 V58 M898 262 V312 M744 160 H794 M1002 160 H1052 M790 52 L828 90 M968 230 L1006 268 M968 90 L1006 52 M790 268 L828 230" stroke="${accentSoft}" stroke-width="7" stroke-linecap="round"/>
        <rect x="1082" y="72" width="176" height="52" rx="26" fill="rgba(255,255,255,0.06)"/><text x="1112" y="106" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Copilots</text>
        <rect x="1060" y="210" width="206" height="52" rx="26" fill="rgba(255,255,255,0.06)"/><text x="1088" y="244" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Workflow AI</text>
        <rect x="734" y="328" width="220" height="54" rx="27" fill="rgba(255,255,255,0.06)"/><text x="760" y="363" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Decision support</text>
      </g>
    `,
    operations: `
      <rect x="88" y="90" width="352" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="128" y="133" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Healthcare platform</text>
      <rect x="82" y="210" width="1434" height="500" rx="44" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="126" y="264" width="468" height="230" rx="32" fill="url(#panel)"/>
      <rect x="172" y="314" width="248" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
      <rect x="172" y="354" width="210" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="172" y="396" width="330" height="18" rx="9" fill="${accentSoft}" fill-opacity="0.36"/>
      <rect x="142" y="530" width="286" height="108" rx="24" fill="rgba(7,16,30,0.9)"/><path d="M182 604 C220 552, 282 566, 324 528 C372 484, 418 596, 474 550" fill="none" stroke="${accentSoft}" stroke-width="10" stroke-linecap="round"/>
      <g transform="translate(760 190)">
        <circle cx="300" cy="198" r="120" fill="rgba(15,27,51,0.92)" stroke="${accentSoft}" stroke-opacity="0.42" stroke-width="10"/>
        <circle cx="300" cy="198" r="62" fill="url(#accent)"/>
        <circle cx="300" cy="198" r="158" fill="none" stroke="${accentSoft}" stroke-opacity="0.18" stroke-width="2"/>
        <path d="M300 26 V76 M300 322 V370 M126 198 H176 M424 198 H474 M174 74 L212 112 M388 284 L426 322 M388 112 L426 74 M174 322 L212 284" stroke="${accentSoft}" stroke-width="7" stroke-linecap="round"/>
        <rect x="430" y="136" width="214" height="54" rx="27" fill="rgba(255,255,255,0.06)"/><text x="454" y="171" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Process visibility</text>
        <rect x="242" y="308" width="196" height="54" rx="27" fill="rgba(255,255,255,0.06)"/><text x="270" y="343" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Service control</text>
      </g>
    `,
    retail: `
      <rect x="90" y="92" width="288" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="126" y="136" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Retail POS</text>
      <rect x="84" y="208" width="1432" height="500" rx="44" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="126" y="264" width="512" height="230" rx="32" fill="url(#panel)"/>
      <rect x="168" y="314" width="218" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
      <rect x="168" y="354" width="194" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="168" y="396" width="352" height="18" rx="9" fill="${accentSoft}" fill-opacity="0.36"/>
      <rect x="146" y="528" width="344" height="110" rx="24" fill="rgba(7,16,30,0.9)"/><path d="M184 608 C240 528, 294 564, 352 520 C420 466, 476 592, 540 544" fill="none" stroke="${accentSoft}" stroke-width="10" stroke-linecap="round"/>
      <g transform="translate(884 178)">
        <circle cx="256" cy="204" r="124" fill="rgba(15,27,51,0.92)" stroke="${accentSoft}" stroke-opacity="0.42" stroke-width="10"/>
        <circle cx="256" cy="204" r="66" fill="url(#accent)"/>
        <circle cx="256" cy="204" r="162" fill="none" stroke="${accentSoft}" stroke-opacity="0.18" stroke-width="2"/>
        <path d="M256 34 V84 M256 324 V374 M86 204 H136 M376 204 H426 M134 84 L172 122 M340 286 L378 324 M340 122 L378 84 M134 324 L172 286" stroke="${accentSoft}" stroke-width="7" stroke-linecap="round"/>
        <rect x="378" y="144" width="220" height="54" rx="27" fill="rgba(255,255,255,0.06)"/><text x="406" y="179" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Inventory sync</text>
        <rect x="194" y="324" width="228" height="54" rx="27" fill="rgba(255,255,255,0.06)"/><text x="222" y="359" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Branch analytics</text>
      </g>
    `,
    property: `
      <rect x="90" y="92" width="314" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="126" y="136" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Property data</text>
      <rect x="82" y="210" width="1436" height="502" rx="44" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="122" y="258" width="500" height="244" rx="30" fill="url(#panel)"/>
      <path d="M180 434 L252 352 L336 396 L408 314 L520 360" fill="none" stroke="${accentSoft}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="252" cy="352" r="12" fill="${accent}"/><circle cx="336" cy="396" r="12" fill="${accentSoft}"/><circle cx="408" cy="314" r="12" fill="${accent}"/><circle cx="520" cy="360" r="12" fill="${accentSoft}"/>
      <g transform="translate(806 186)">
        <rect width="576" height="456" rx="40" fill="rgba(10,22,41,0.86)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="72" y="62" width="432" height="280" rx="28" fill="url(#panel)"/>
        <path d="M154 140 L234 112 L312 160 L382 126 L436 196 L346 260 L226 244 Z" fill="rgba(255,255,255,0.06)" stroke="${accentSoft}" stroke-width="6"/>
        <circle cx="234" cy="112" r="11" fill="${accent}"/><circle cx="382" cy="126" r="11" fill="${accent}"/><circle cx="346" cy="260" r="11" fill="${accentSoft}"/>
        <rect x="86" y="372" width="164" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="112" y="405" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Asset maps</text>
        <rect x="272" y="372" width="210" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="304" y="405" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Market data</text>
      </g>
    `,
    education: `
      <rect x="86" y="94" width="340" height="68" rx="34" fill="rgba(255,255,255,0.05)"/><text x="124" y="138" font-family="Arial" font-size="34" fill="#eef5ff" font-weight="700">Education admin</text>
      <rect x="84" y="214" width="1432" height="494" rx="44" fill="rgba(10,22,41,0.82)" stroke="rgba(255,255,255,0.08)"/>
      <rect x="124" y="266" width="486" height="232" rx="30" fill="url(#panel)"/>
      <rect x="162" y="308" width="138" height="138" rx="18" fill="rgba(255,255,255,0.06)"/>
      <rect x="324" y="306" width="238" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
      <rect x="324" y="346" width="210" height="18" rx="9" fill="rgba(255,255,255,0.08)"/>
      <rect x="324" y="386" width="172" height="18" rx="9" fill="${accentSoft}" fill-opacity="0.36"/>
      <g transform="translate(780 176)">
        <rect width="628" height="470" rx="40" fill="rgba(10,22,41,0.86)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="76" y="64" width="476" height="314" rx="28" fill="url(#panel)"/>
        <rect x="116" y="108" width="188" height="84" rx="16" fill="rgba(255,255,255,0.07)"/>
        <rect x="330" y="108" width="178" height="84" rx="16" fill="rgba(255,255,255,0.05)"/>
        <rect x="116" y="220" width="188" height="110" rx="16" fill="rgba(255,255,255,0.05)"/>
        <rect x="330" y="220" width="178" height="110" rx="16" fill="rgba(255,255,255,0.07)"/>
        <rect x="94" y="400" width="190" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="120" y="433" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Unified records</text>
        <rect x="304" y="400" width="210" height="50" rx="25" fill="rgba(255,255,255,0.06)"/><text x="334" y="433" font-family="Arial" font-size="24" fill="#eef6ff" font-weight="700">Admin control</text>
      </g>
    `
  };

  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
      ${commonDefs}
      ${commonGrid}
      ${visuals[kind]}
    </svg>
  `);
};

const premiumVisuals = {
  hero: createTechVisual('hero', '#4b5dff', '#35d8ff'),
  software: createTechVisual('software', '#5b6bff', '#44e0ff'),
  hardware: createTechVisual('hardware', '#3f86ff', '#52f0ff'),
  network: createTechVisual('network', '#4f67ff', '#40d6ff'),
  ai: createTechVisual('ai', '#6b5cff', '#43e3ff'),
  operations: createTechVisual('operations', '#4b67ff', '#35e3ff'),
  retail: createTechVisual('retail', '#426eff', '#50ebff'),
  property: createTechVisual('property', '#5363ff', '#47dfff'),
  education: createTechVisual('education', '#545fff', '#5ae8ff')
};

const capabilities = [
  {
    icon: faCode,
    title: 'Software Engineering',
    description: 'We design and build secure web apps, portals, internal tools, and scalable digital products.',
    image: premiumVisuals.software,
    points: ['Custom website solutions', 'Scalable web applications'],
    leftNotes: [
      'Custom software platforms built around your workflow.',
      'Web systems that are fast, secure, and ready to scale.',
      'Dashboards and portals that make operations easier to manage.'
    ],
    rightNotes: [
      'Modern interfaces that feel premium from the first click.',
      'API-ready architecture for future growth and integrations.',
      'Reliable engineering for internal and customer-facing tools.'
    ]
  },
  {
    icon: faMicrochip,
    title: 'Hardware Integration',
    description: 'We connect devices, sensors, POS systems, biometrics, and edge hardware into reliable workflows.',
    image: premiumVisuals.hardware,
    points: ['Connected devices and sensors', 'Operational hardware automation'],
    leftNotes: [
      'Smart integrations for POS, sensors, and business devices.',
      'Operational visibility across your hardware footprint.',
      'Stable connections between physical tools and software platforms.'
    ],
    rightNotes: [
      'Fewer manual processes across branches and field teams.',
      'Reliable device data flowing into your core systems.',
      'Infrastructure designed for real-world business environments.'
    ]
  },
  {
    icon: faNetworkWired,
    title: 'Networking & Infrastructure',
    description: 'We deploy cloud, on-prem, and hybrid infrastructure with performance, uptime, and security in mind.',
    image: premiumVisuals.network,
    points: ['Secure cloud deployment', 'High-uptime network systems'],
    leftNotes: [
      'Cloud, hybrid, and on-prem environments designed to stay available.',
      'Network performance planning for growing companies.',
      'Secure infrastructure that supports business continuity.'
    ],
    rightNotes: [
      'Faster operations across teams, sites, and platforms.',
      'Better visibility across services, traffic, and access.',
      'A stronger foundation for AI, apps, and enterprise systems.'
    ]
  },
  {
    icon: faServer,
    title: 'AI Systems',
    description: 'We turn AI into practical business tools with automation, analytics, copilots, and intelligent operations.',
    image: premiumVisuals.ai,
    points: ['Intelligent business automation', 'AI workflow integration'],
    leftNotes: [
      'Automate workflows, support, and internal business processes.',
      'Use AI to reduce delays and improve team efficiency.',
      'Transform complex operations into clearer, smarter workflows.'
    ],
    rightNotes: [
      'AI systems tailored to the needs of your industry.',
      'Practical automation instead of vague AI promises.',
      'Sharper decision-making through intelligent analytics.'
    ]
  }
];

const differentiators = [
  'Clear technical strategy from interface to infrastructure',
  'Production-ready systems across AI, software, hardware, and networking',
  'Clean user experiences that build confidence from the first visit',
  'Delivery built for businesses in Ghana, Zambia, and beyond'
];

const showcaseProjects = [
  {
    title: 'Hospital Operations Platform',
    category: 'AI + Software',
    image: '/images/hospital-system.jpeg',
    description: 'A modern operating layer for appointments, patient workflows, reporting, and service visibility.',
    stats: ['Realtime workflows', 'Operational visibility']
  },
  {
    title: 'Retail POS & Device Stack',
    category: 'Hardware + Cloud',
    image: '/images/pos-system.jpeg',
    description: 'Connected payment, inventory, and branch-level dashboards built for fast-moving retail teams.',
    stats: ['Connected devices', 'Branch analytics']
  },
  {
    title: 'HR Management System',
    category: 'Enterprise Software',
    image: '/images/analytics-system.jpeg',
    description: 'A people operations platform for staff records, attendance, leave, payroll visibility, and internal reporting.',
    stats: ['Workforce visibility', 'Process automation']
  },
  {
    title: 'Church Management System',
    category: 'Community Platform',
    image: '/images/church-system.jpeg',
    description: 'Member records, communications, programs, finance tracking, and church operations in one connected system.',
    stats: ['Member records', 'Church operations']
  },
  {
    title: 'Banking & Microfinance Platform',
    category: 'Fintech Operations',
    image: '/images/hotel-system.jpeg',
    description: 'A secure operational system for branches, customer servicing, loan workflows, reporting, and decision support.',
    stats: ['Branch controls', 'Financial reporting']
  },
  {
    title: 'Online Loan Application',
    category: 'Digital Lending',
    image: '/images/loan-system.jpeg',
    description: 'Digital loan onboarding with application tracking, credit review steps, and customer communication flows.',
    stats: ['Faster approvals', 'Loan tracking']
  },
  {
    title: 'Local Language AI Model App',
    category: 'Applied AI',
    image: '/images/restaurant-system.jpeg',
    description: 'An AI experience designed for local language interactions, smart assistance, and more accessible digital support.',
    stats: ['Local language support', 'AI assistance']
  },
  {
    title: 'Property Intelligence Suite',
    category: 'Software + Analytics',
    image: '/images/property-system.jpeg',
    description: 'Operations, listings, and insight tools that help property teams manage assets with clarity.',
    stats: ['Portfolio insight', 'Decision support']
  },
  {
    title: 'School Management System',
    category: 'Platform Engineering',
    image: '/images/school-system.jpeg',
    description: 'Admissions, billing, class operations, and reporting brought into one dependable digital system.',
    stats: ['Unified records', 'Smart administration']
  }
];

const deliverySteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'We map the business workflow, the infrastructure gap, and the highest-value automation opportunities.'
  },
  {
    step: '02',
    title: 'Architect',
    description: 'We align software, hardware touchpoints, networking, and security before development begins.'
  },
  {
    step: '03',
    title: 'Build',
    description: 'We ship clean interfaces, stable services, and the integrations your operations depend on.'
  },
  {
    step: '04',
    title: 'Scale',
    description: 'We support optimization, rollout, analytics, and new AI capabilities as your business grows.'
  }
];

const leadership = [
  {
    name: 'Hodalor Prince',
    role: 'Co-Founder, Senior Developer',
    bio: 'Focuses on engineering systems that are dependable, maintainable, and ready for real operations.'
  },
  {
    name: 'Seth Donkor',
    role: 'CEO, Marketing Lead',
    bio: 'Connects technical delivery with market opportunity, commercial strategy, and client growth.'
  },
  {
    name: 'Abdellah Alhassan',
    role: 'Co-Founder, Lead Developer',
    bio: 'Leads full-stack product execution across web platforms, backend services, and integrations.'
  },
  {
    name: 'Emmanuel Baffour Kyei',
    role: 'UX/UI, Brand Experience',
    bio: 'Shapes visual systems and interfaces that make advanced technology feel clear and trustworthy.'
  }
];

const technologyStack = [
  { name: 'React', type: 'Frontend', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Python', type: 'Backend', logo: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'MongoDB', type: 'Database', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Google Cloud', type: 'Infrastructure', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
  { name: 'Supabase', type: 'Platform', logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Cloudinary', type: 'Media pipeline', logo: 'https://cdn.simpleicons.org/cloudinary/3448C5' },
  { name: 'Firebase', type: 'Realtime services', logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Node.js', type: 'Runtime', logo: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { name: 'Cloudflare', type: 'Edge network', logo: 'https://cdn.simpleicons.org/cloudflare/F38020' }
];

const clients = [
  'EMMANUEL BAFFOUR ENTERPRISE',
  'DECENT PHONES',
  'IKEST PHONES',
  'TOPREKO.COM'
];

const metricCards = [
  { label: 'Core capability', value: 'AI + Software + Hardware + Network' },
  { label: 'Delivery focus', value: 'Operational systems that scale' },
  { label: 'Regional footprint', value: 'Ghana and Zambia' }
];

const floatingStats = [
  { value: '1500+', label: 'Projects delivered', className: 'tech-float-card--one' },
  { value: '1150+', label: 'Client interactions improved', className: 'tech-float-card--two' },
  { value: '24/7', label: 'Automation-ready operations', className: 'tech-float-card--three' }
];

const marqueeTags = [
  'AI automation',
  'Enterprise software',
  'Cloud infrastructure',
  'Networking systems',
  'Hardware integration',
  'Operational analytics',
  'Premium UX',
  'Secure delivery'
];

const RobotArtwork: React.FC = () => (
  <svg
    viewBox="0 0 640 760"
    className="tech-robot-svg"
    role="img"
    aria-label="Futuristic robotic illustration"
  >
    <defs>
      <linearGradient id="robotBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#081221" />
        <stop offset="50%" stopColor="#0e2342" />
        <stop offset="100%" stopColor="#07111d" />
      </linearGradient>
      <linearGradient id="robotMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c2d0e3" />
        <stop offset="50%" stopColor="#7e96b6" />
        <stop offset="100%" stopColor="#41516f" />
      </linearGradient>
      <linearGradient id="robotAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3de2ff" />
        <stop offset="100%" stopColor="#4b5dff" />
      </linearGradient>
      <radialGradient id="robotGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="rgba(61,226,255,0.95)" />
        <stop offset="100%" stopColor="rgba(61,226,255,0)" />
      </radialGradient>
    </defs>

    <rect width="640" height="760" rx="40" fill="url(#robotBg)" />
    <circle cx="500" cy="118" r="140" fill="url(#robotGlow)" opacity="0.35" />
    <circle cx="180" cy="620" r="160" fill="url(#robotGlow)" opacity="0.18" />

    <g stroke="rgba(84,188,255,0.18)" strokeWidth="2" fill="none">
      <path d="M42 96 H250" />
      <path d="M380 86 H602" />
      <path d="M58 664 H290" />
      <path d="M390 684 H596" />
      <path d="M84 178 C180 138, 228 118, 286 152" />
      <path d="M442 158 C510 122, 556 130, 602 178" />
      <path d="M122 704 C224 658, 324 646, 430 684" />
    </g>

    <g>
      <ellipse cx="320" cy="286" rx="166" ry="192" fill="url(#robotMetal)" />
      <path
        d="M250 134 C286 86, 362 84, 412 126 L438 202 C396 182, 340 176, 294 186 L236 198 Z"
        fill="#4fb9ff"
        opacity="0.92"
      />
      <path
        d="M214 198 C248 174, 380 174, 430 204 L456 286 C422 268, 388 256, 330 254 C278 252, 238 264, 200 286 Z"
        fill="#13263f"
        opacity="0.95"
      />
      <path
        d="M214 290 C214 232, 262 208, 318 208 C372 208, 428 232, 430 294 C432 352, 388 424, 322 438 C254 452, 212 368, 214 290 Z"
        fill="#d7deea"
      />
      <path
        d="M262 214 C292 196, 348 194, 382 212 L398 250 C350 236, 286 240, 246 256 Z"
        fill="#38d8ff"
        opacity="0.82"
      />
      <ellipse cx="274" cy="308" rx="18" ry="13" fill="#1b2433" />
      <ellipse cx="356" cy="308" rx="18" ry="13" fill="#1b2433" />
      <path d="M284 362 C306 376, 330 376, 350 362" stroke="#8c5f56" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M216 286 L170 320 L172 374 L220 350" fill="#587496" opacity="0.9" />
      <path d="M430 286 L482 318 L484 376 L426 348" fill="#587496" opacity="0.9" />
      <circle cx="168" cy="350" r="48" fill="#13263f" stroke="#5acfff" strokeWidth="6" />
      <circle cx="474" cy="350" r="48" fill="#13263f" stroke="#5acfff" strokeWidth="6" />
      <path d="M294 432 C286 484, 286 544, 300 618 H366 C372 542, 368 486, 350 436" fill="#8398b7" />
      <path d="M258 616 H396 L416 738 H240 Z" fill="#394a68" />
    </g>

    <g stroke="url(#robotAccent)" strokeWidth="5" strokeLinecap="round">
      <path d="M126 250 C168 256, 178 278, 194 310" />
      <path d="M514 246 C470 260, 456 286, 438 316" />
      <path d="M214 640 C254 622, 286 614, 320 614" />
      <path d="M320 614 C360 614, 392 624, 434 646" />
    </g>

    <g fill="#67d9ff">
      <circle cx="122" cy="246" r="6" />
      <circle cx="518" cy="244" r="6" />
      <circle cx="214" cy="640" r="6" />
      <circle cx="434" cy="646" r="6" />
    </g>
  </svg>
);

const Home: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeCapability, setActiveCapability] = useState(capabilities[0].title);

  const capabilityDetail = useMemo(
    () => capabilities.find((item) => item.title === activeCapability) ?? capabilities[0],
    [activeCapability]
  );

  return (
    <div id="home" className="tech-home">
      <NavigationBar />

      <section id="hero" className="tech-hero">
        <div className="tech-hero__glow tech-hero__glow--left" />
        <div className="tech-hero__glow tech-hero__glow--right" />
        <Container fluid className="tech-shell position-relative">
          <Row className="align-items-center gy-4 tech-hero__row">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="tech-eyebrow">Built for modern operations</span>
                <h1 className="tech-hero__title">
                  We engineer AI, software, hardware, and networking into one powerful business experience.
                </h1>
                <p className="tech-hero__subtitle">
                  Prynova helps companies look forward and operate smarter with premium digital products,
                  intelligent systems, secure infrastructure, and experiences that feel unmistakably high-tech.
                </p>

                <div className="tech-hero__actions">
                  <Button
                    className="tech-primary-btn"
                    onClick={() => setShowContactForm(true)}
                  >
                    Start a Project <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="tech-secondary-btn"
                    href="#solutions"
                  >
                    View Our Work
                  </Button>
                </div>

                <div className="tech-pill-group">
                  {['AI Systems', 'Software Platforms', 'Hardware Integration', 'Cloud & Networking'].map((pill) => (
                    <span key={pill} className="tech-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                className="tech-hero-visual"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="tech-hero-visual__grid" />
                <div className="tech-hero-visual__orb tech-hero-visual__orb--outer" />
                <div className="tech-hero-visual__orb tech-hero-visual__orb--middle" />
                <div className="tech-hero-visual__orb tech-hero-visual__orb--inner" />

                <div className="tech-hero-portrait">
                  <img src={premiumVisuals.hero} alt="Prynova premium technology experience" />
                </div>

                {floatingStats.map((item) => (
                  <div key={item.label} className={`tech-float-card ${item.className}`}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}

                <div className="tech-robot-card">
                  <RobotArtwork />
                </div>

                <div className="tech-command-panel">
                  <div className="tech-command-panel__header">
                    <span>System overview</span>
                    <span className="tech-status-dot">Live</span>
                  </div>

                  <div className="tech-command-panel__grid">
                    {metricCards.map((item) => (
                      <div key={item.label} className="tech-metric-card">
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="tech-command-panel__stack">
                    <div className="tech-stack-card">
                      <span>AI Layer</span>
                      <strong>Automation, copilots, analytics</strong>
                    </div>
                    <div className="tech-stack-card">
                      <span>Application Layer</span>
                      <strong>Web, mobile, dashboards, APIs</strong>
                    </div>
                    <div className="tech-stack-card">
                      <span>Infrastructure Layer</span>
                      <strong>Cloud, hardware, connectivity, security</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="tech-trust-strip">
        <Container fluid className="tech-shell">
          <p className="tech-trust-strip__label">Core technologies in our delivery stack.</p>
          <div className="tech-marquee tech-marquee--dark tech-marquee--stack">
            <div className="tech-marquee__track tech-marquee__track--stack">
              {[...technologyStack, ...technologyStack].map((item, index) => (
                <div key={`${item.name}-${index}`} className="tech-logo-item">
                  <div className="tech-logo-badge">
                    <img src={item.logo} alt={`${item.name} logo`} />
                  </div>
                  <div className="tech-logo-copy">
                    <strong>{item.name}</strong>
                    <span>{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-marquee tech-marquee--light tech-marquee--clients">
            <div className="tech-marquee__track tech-marquee__track--clients">
              {[...clients, ...clients].map((client, index) => (
                <div key={`${client}-${index}`} className="tech-client-line-card">
                  <div className="tech-client-line-card__mark">
                    {client
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <strong>{client}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-marquee tech-marquee--dark tech-marquee--tags">
            <div className="tech-marquee__track">
              {[...marqueeTags, ...marqueeTags].map((tag, index) => (
                <span key={`${tag}-${index}`}>{tag}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="capabilities" className="tech-section tech-section--light tech-section--light-network">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Capabilities</span>
            <h2 className="tech-section__title">Technology capability that runs deeper .</h2>
            <p className="tech-section__copy">
             feel closer to a modern AI product .
            </p>
          </div>

          <div className="tech-service-grid">
            {capabilities.map((capability, index) => (
              <motion.button
                key={capability.title}
                type="button"
                className={`tech-service-card ${activeCapability === capability.title ? 'is-active' : ''}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={() => setActiveCapability(capability.title)}
              >
                <div className="tech-service-card__header">
                  <div className="tech-capability-card__icon">
                    <FontAwesomeIcon icon={capability.icon} />
                  </div>
                  <h3>{capability.title}</h3>
                </div>
                <div className="tech-service-card__image">
                  <img src={capability.image} alt={capability.title} />
                </div>
                <p>{capability.description}</p>
                <ul className="tech-service-card__points">
                  {capability.points.map((point) => (
                    <li key={point}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>

          <div className="tech-ai-stage">
            <div className="tech-ai-stage__column">
              {capabilityDetail.leftNotes.map((item, index) => (
                <motion.div
                  key={item}
                  className="tech-ai-note"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-ai-note__icon">
                    <FontAwesomeIcon icon={capabilityDetail.icon} />
                  </div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="tech-ai-core-wrap">
              <div className="tech-ai-core__ring tech-ai-core__ring--one" />
              <div className="tech-ai-core__ring tech-ai-core__ring--two" />
              <div className="tech-ai-core__ring tech-ai-core__ring--three" />
              <div className="tech-ai-core">
                <span>AI</span>
                <strong>{capabilityDetail.title}</strong>
              </div>
              <div className="tech-ai-core__pulse" />
              <div className="tech-ai-core__pulse tech-ai-core__pulse--delay" />
              <div className="tech-ai-core__chips">
                {['Data', 'Cloud', 'Apps', 'Network'].map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>

            <div className="tech-ai-stage__column">
              {capabilityDetail.rightNotes.map((item, index) => (
                <motion.div
                  key={item}
                  className="tech-ai-note"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-ai-note__icon">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <Row className="g-4 mt-2">
            <Col lg={7}>
              <div className="tech-capability-grid">
                {differentiators.map((item, index) => (
                  <motion.div
                    key={item}
                    className="tech-capability-card tech-capability-card--mini"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <div className="tech-capability-card__icon">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div>
                      <p>{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Col>
            <Col lg={5}>
              <motion.div
                className="tech-highlight-panel"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="tech-highlight-panel__label">Currently selected</span>
                <h3>{capabilityDetail.title}</h3>
                <p>{capabilityDetail.description}</p>
                <div className="tech-highlight-panel__image">
                  <img src={capabilityDetail.image} alt={capabilityDetail.title} />
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="why-us" className="tech-section tech-section--alt">
        <Container fluid className="tech-shell">
          <div className="tech-robot-strip">
            <div className="tech-robot-strip__copy">
              <span className="tech-section__eyebrow">Visual Edge</span>
              <h2 className="tech-section__title">Technology should look as advanced as it works.</h2>
              <p className="tech-section__copy mb-0">
                We combine AI, software, hardware, and networking with strong visual presentation so visitors
                immediately feel they are dealing with a serious modern tech company.
              </p>
            </div>
            <div className="tech-robot-strip__image">
              <RobotArtwork />
            </div>
          </div>

          <Row className="g-4">
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faLaptopCode} />
                <h3>Product-grade UX</h3>
                <p>Interfaces with the polish people expect from a serious technology brand.</p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faCloud} />
                <h3>Scalable delivery</h3>
                <p>Cloud-ready architectures that support growth, uptime, and regional expansion.</p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faShieldAlt} />
                <h3>Trust & reliability</h3>
                <p>Security-minded builds, clean structures, and systems made for business-critical use.</p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faChartLine} />
                <h3>Commercial clarity</h3>
                <p>Messaging that explains value fast, so visitors understand what Prynova actually delivers.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="solutions" className="tech-section tech-section--light tech-section--light-network">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Selected Solutions</span>
            <h2 className="tech-section__title">Proof that looks and feels like a technology company.</h2>
            <p className="tech-section__copy">
              Explore the kind of digital products and operational platforms we design for ambitious teams.
            </p>
          </div>

          <Row className="g-4">
            {showcaseProjects.map((project, index) => (
              <Col lg={6} key={project.title}>
                <motion.div
                  className="tech-showcase-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-showcase-card__image-wrap">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="tech-showcase-card__body">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-showcase-card__meta">
                      {project.stats.map((stat) => (
                        <em key={stat}>{stat}</em>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="process" className="tech-section tech-section--light tech-section--light-network tech-section--process">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Execution Model</span>
            <h2 className="tech-section__title">From first conversation to deployed system.</h2>
            <p className="tech-section__copy">
              A disciplined delivery model helps us turn ambitious ideas into stable, scalable systems.
            </p>
          </div>

          <Row className="g-4">
            {deliverySteps.map((item, index) => (
              <Col lg={3} md={6} key={item.step}>
                <motion.div
                  className="tech-process-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <span className="tech-process-card__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="team" className="tech-section tech-section--alt">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Leadership</span>
            <h2 className="tech-section__title">The people behind the systems.</h2>
            <p className="tech-section__copy">
              Meet the team shaping technology experiences that are practical, ambitious, and ready for the market.
            </p>
          </div>

          <Row className="g-4">
            {leadership.map((member, index) => (
              <Col lg={3} md={6} key={member.name}>
                <motion.div
                  className="tech-team-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-team-card__avatar">
                    {member.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <h3>{member.name}</h3>
                  <strong>{member.role}</strong>
                  <p>{member.bio}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="contact" className="tech-section tech-contact-section">
        <Container fluid className="tech-shell">
          <Row className="g-4 align-items-start">
            <Col lg={5}>
              <span className="tech-section__eyebrow">Contact</span>
              <h2 className="tech-section__title">Let’s build the version of your company people remember.</h2>
              <p className="tech-section__copy">
                Whether you need an AI-driven workflow, a platform rebuild, hardware integration,
                or stronger networking infrastructure, Prynova can help you ship with confidence.
              </p>

              <div className="tech-contact-info">
                <div>
                  <FontAwesomeIcon icon={faGlobe} />
                  <div>
                    <strong>Locations</strong>
                    <span>Accra, Ghana and Lusaka, Zambia</span>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeadset} />
                  <div>
                    <strong>Call</strong>
                    <span>+233 (0) 24 026 2600 | +260 97 459 5105</span>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCloud} />
                  <div>
                    <strong>Email</strong>
                    <span>prynovatechnologies@gmail.com</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={7}>
              <div className="tech-contact-form">
                <ContactForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />

      <Modal
        show={showContactForm}
        onHide={() => setShowContactForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Start Your Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm isModal onClose={() => setShowContactForm(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
