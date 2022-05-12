import { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Modify } from '../common/components'
import { getToken } from '../common/util'

const { Footer, Body, Header } = Modal

export default function Home() {
  const [list, setList] = useState([])
  const [type, setType] = useState('ADD')
  const [data, setData] = useState({ group: 1, type: 1 })
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  let token

  useEffect(() => {
    token = getToken()

    if (!token) {
      router.push('/login?target=' + router.pathname)
    }

    queryList()
  }, [])

  function queryList() {
    fetch('/api/records', { headers: { token }}).then(async res => {
      res = await res.json()
      
      if (res.errno && res.errno === 2)
        router.push('/login?target=' + router.pathname)

      setList(await res)
    }).catch(() => {
      alert('fail')
    })
  }

  function remove(id) {
    fetch('/api/record?id='+id, { method: 'DELETE', headers: {token}}).then(res => {
      if (res.status === 200) {
        queryList()
      }
    })
  }

  function add() {
    setType('ADD')
    setVisible(true)
  }
  function modify(data) {
    setType('MODIFY')
    if (data.date) {
      setData({ ...data, date: new Date(data.date)})
    }
    setVisible(true)
  }

  return (
    <>
      <Button onClick={add}>新增</Button>
      <Table>
        <thead>
          <tr><th>#</th><th>时间</th><th>名称</th><th>单价</th><th>份数</th><th>总价</th><th>平均成本</th><th>盈利率</th><th>操作</th></tr>
        </thead>
        <tbody>
          {list.map((d, i) => {
            const {name, date, price, count, prev_count, average_cost, type, ratio, group, id} = d
            return <tr key={id}>
              <td>{i+1}</td><td>{date}</td><td>{name}</td><td>{price}</td><td>{count}</td><td>cost</td><td>{average_cost}</td><td>{ratio}</td>
              <td>
                <Button size="sm" onClick={() => remove(id)}>删除</Button>
                {' '}
                <Button size="sm" onClick={() => modify(d)}>修改</Button>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      <Modal show={visible} onExiting={() => setData({ group: 1, type: 1 })}>
        <Header>
          {type === 'ADD' ? '新增' : '修改'}
        </Header>
        <Body>
          <Modify data={data} setData={setData} type={type} queryList={queryList} token={token}></Modify>
        </Body>
        <Footer>
          <Button onClick={() => setVisible(false)}>关闭</Button>
        </Footer>
      </Modal>
    </>
  )
}
