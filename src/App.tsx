import { RelativeImportTest } from '@/components/RelativeImportTest'
import { Button, Col, Row, Space, Tag } from 'antd'
import styles from './App.module.scss'

export const App = () => {
  const testObj = {
    name: 'test',
  }

  return (
    <Row justify="center" className={styles.app}>
      <Col>
        <Space direction="vertical">
          <div>Green Text From Sass</div>
          <div style={{ color: 'blue' }}>{testObj?.name ?? 'test nullish coalescing operator'} inline-style</div>
          <Tag color="cyan">Cesar fixed Row and Col style import bug</Tag>
          <Button type="primary">Test Modifying Antd Default Theme</Button>
          <RelativeImportTest />
        </Space>
      </Col>
    </Row>
  )
}
