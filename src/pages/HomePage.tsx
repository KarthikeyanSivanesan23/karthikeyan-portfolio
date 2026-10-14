import { SEO } from '../components/common/SEO'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { BehindCode } from '../components/sections/BehindCode'
import { CommandCenter } from '../components/sections/CommandCenter'
import { SkillsUniverse } from '../components/sections/SkillsUniverse'
import { Projects } from '../components/sections/Projects'
import { StorePreview } from '../components/sections/StorePreview'
import { Services } from '../components/sections/Services'
import { Contact } from '../components/sections/Contact'

export default function HomePage() {
  return <><SEO title="Full Stack & AI Developer" description="Karthikeyan S builds intelligent full-stack applications, AI-powered systems and immersive 3D web experiences. Explore the engineering lab." /><Hero /><About /><BehindCode /><CommandCenter /><SkillsUniverse /><Projects /><StorePreview /><Services /><Contact /></>
}
