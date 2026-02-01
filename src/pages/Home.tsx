import Hero from '../components/Hero'
import LatestVideo from '../components/LatestVideo'
import WhatYoullLearn from '../components/WhatYoullLearn'
import PopularPrompts from '../components/PopularPrompts'
import LatestTutorials from '../components/LatestTutorials'
import ToolsCovered from '../components/ToolsCovered'
import AdvancedResources from '../components/AdvancedResources'
import BuiltForRealWork from '../components/BuiltForRealWork'

import type { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LatestVideo />
        <WhatYoullLearn />
        <PopularPrompts />
        <LatestTutorials />
        <ToolsCovered />
        <AdvancedResources />
        <BuiltForRealWork />
      </main>
    </div>
  )
}

export default Home
