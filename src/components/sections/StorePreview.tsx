import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { ProductCard } from '../ui/ProductCard'
import { LoadingScreen } from '../common/LoadingScreen'
import { DataState } from '../ui/DataState'
import { useContent } from '../../hooks/useContent'
import { getProducts } from '../../services/products'

export function StorePreview() {
  const { result, loading, error, retry } = useContent(getProducts)
  return <section id="store" className="section store-preview"><div className="container"><Reveal><SectionHeading label="03 / DEVELOPER RESOURCES" aside={<><p>Go beyond the interface. Explore the code, architecture and thinking behind the build.</p><Link to="/store" className="text-link">Explore the collection <ArrowUpRight /></Link></>}>BUILD FASTER.<br /><em>LEARN DEEPER.</em></SectionHeading></Reveal>{loading ? <LoadingScreen compact /> : error ? <DataState error={error} retry={retry} /> : result?.data.length ? <div className="product-grid">{result.data.slice(0,3).map((product, i) => <Reveal key={product.id} delay={i * .07}><ProductCard product={product} /></Reveal>)}</div> : <DataState empty />}<div className="store-preview-note"><span className="demo-label">Demo catalogue · checkout not enabled</span><span className="eyebrow">BUILT TO UNDERSTAND. DESIGNED TO EXTEND.</span></div></div></section>
}
