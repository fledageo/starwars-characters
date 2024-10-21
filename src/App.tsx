import { CharsList } from './features/Characters/Characters'
import { Header } from './components/Header/Header'

const App = () => {
  return (
    <>
      <div className="mainContainer">
        <Header />
        <CharsList />
      </div>
    </>
  )
}
export default App