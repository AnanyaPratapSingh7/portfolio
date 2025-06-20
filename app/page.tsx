"use client";

import GlitchHeading from './components/GlitchHeading';
import { JSX} from 'react';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadLinksPreset } from 'tsparticles-preset-links';
import IpAndTime from './components/IpAndTime';

export default function Home(): JSX.Element {
  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadLinksPreset(engine);
  };

  return (
    <>
    <div className="absolute inset-0 bg-[url('../public/explorer_green_day.jpg')] bg-cover bg-center filter blur-md z-0" />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: 'links',
          fullScreen: { enable: false },
          background: { color: 'transparent' },
        }}
        className="absolute inset-0 z-0"
      />
      <GlitchHeading/>
      <IpAndTime/>
    </>
  );
}
