import { Button } from 'antd'
import styles from './App.module.scss'

function App() {
  const testObj = {
    name: 'test',
  }
  return (
    <div className={styles.app}>
      <div>Green Text From Sass</div>
      <div style={{ color: 'blue' }}>{testObj?.name ?? 'test nullish coalescing operator'}</div>
      <Button type="primary">Test Modifying Antd Theme</Button>
    </div>
  )
}

export default App
