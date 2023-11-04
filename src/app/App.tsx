import './styles/reset.css';
import styles from './styles/app.module.css'
import { Header } from '../widgets/Header';
import { MainContent } from '../widgets/MainContent';
import { Footer } from '../widgets/Footer/ui/Footer';
import FibonacciSpiral from '../widgets/Fibonaci/Fibonaci';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <MainContent>
        <FibonacciSpiral />
      </MainContent>
      <Footer />
    </div>
  )
}

export default App
