'use client';

import React from 'react';

import { languagesAndTools } from '@/data';
import { InfiniteMovingCards } from './ui/InfiniteCards';

const Clients = () => {
  return (
    <section id="technologies" className="py-20">
      <h1 className="heading">
        Technologies and Tools
        <span className="text-purple"> we use</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={languagesAndTools}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
