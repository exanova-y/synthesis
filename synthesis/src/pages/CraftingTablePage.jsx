import { useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import CraftingTable from '../components/CraftingTable'
import './CraftingTablePage.css'

function CraftingTablePage() {
  const location = useLocation()

  return (
    <div className="crafting-table-page">
      <Navigation currentPath={location.pathname} />
      
      <div className="page-content">
        <main className="main-content">
          <CraftingTable />
        </main>
      </div>
    </div>
  )
}

export default CraftingTablePage
