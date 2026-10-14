import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { LoadingScreen } from '../common/LoadingScreen'
import { DataState } from '../ui/DataState'
import { useContent } from '../../hooks/useContent'
import { getProjects } from '../../services/projects'
import { ProjectCylinder } from './ProjectCylinder'

export function Projects() {
  const { result, loading, error, retry } = useContent(getProjects)
  return <section id="projects" className="section projects-section"><div className="container"><Reveal><SectionHeading label="02 / SELECTED WORK" aside={<><p>An exploration of intelligence, interaction and meaningful engineering.</p><span className="demo-label">{result?.data.length ?? 'Explore'} projects & interactive experiences</span></>}>PROJECTS THAT<br /><em>SOLVE REAL PROBLEMS.</em></SectionHeading></Reveal>{loading ? <LoadingScreen compact /> : error ? <DataState error={error} retry={retry} /> : result?.data.length ? <ProjectCylinder projects={result.data} /> : <DataState empty />}{result?.source === 'demo' && <p className="offline-content-note eyebrow">LOCAL DEMO CATALOGUE / CONTENT API OFFLINE</p>}</div></section>
}
