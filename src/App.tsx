import Container from './components/Container'
import Footer from './components/Footer'
import Game from './components/Game'
import Navbar from './components/Navbar'

export default function App () {
  return (
    <Container>
      <Navbar />
      <Game />
      <Footer />
    </Container>
  )
}
