import { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Modify } from '../common/components'
import { getToken } from '../common/util'
import { TYPE, GROUP } from '../common/constant'

const { Footer, Body, Header } = Modal

export default function Home() {
  const initData = Object.freeze({
    group: 2, type: 1, name: '', date: '', price: 0, count: 0, prev_count: undefined, average_cost: undefined, ratio: undefined,
  })

  const [list, setList] = useState([])
  const [type, setType] = useState('ADD')
  const [data, setData] = useState(initData)
  const [token, setToken] = useState(null)
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let token = getToken()
    if (!token) {
      router.push('/login?target=' + router.pathname)
    }
    setToken(getToken())
  }, [])

  useEffect(() => {
    if (token) {
      queryList()
    }
  }, [token])

  function redirect() {
    router.push('/login?target=' + router.pathname)
  }
  function queryList() {
    fetch('/api/records', { headers: { token }}).then(async res => {
      res = await res.json()
      
      if (res.errno && res.errno === 2)
        return redirect()

      setList(await res)
    }).catch(() => {
      alert('fail')
    })
  }

  function remove(id) {
    if (window.confirm('are you sure?')) {
      fetch('/api/record?id='+id, { method: 'DELETE', headers: {token}}).then(res => {
        if (res.status === 401) redirect()
        if (res.status === 200) {
          queryList()
        }
      })
    }
  }

  function add() {
    setType('ADD')
    setVisible(true)
  }
  function modify(data) {
    setType('MODIFY')

    setData({
      ...data,
      date: new Date(data.date),
      price: data.price / 10000,
      average_cost: data.average_cost ? data.average_cost / 10000 : ''
    })
  
    setVisible(true)
  }

  return (
    <>
      <Button onClick={add}>新增</Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>时间</th>
            <th>名称</th>
            <th>单价</th>
            <th>份数</th>
            <th>总价</th>
            <th>平均成本</th>
            <th>持仓数</th>
            <th>仓位</th>
            <th>操作重量</th>
            <th>盈利率</th>
            <th>计划</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d, i) => {
            const {name, date, price, count, prev_count, average_cost, type, ratio, group, id} = d
            return <tr key={id}>
              <td>{i+1}</td>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td>{name}</td>
              <td>{price / 10000}</td>
              <td>{count}</td>
              <td>{count*price/10000}</td>
              <td>{!average_cost ? '-' : average_cost/10000}</td>
              <td>{!prev_count ? '-' : prev_count}</td>
              <td>{average_cost && prev_count && Math.round(prev_count * average_cost / 10000)}</td>
              <td>{
                (prev_count && average_cost)
                  ? Math.abs(count) * price / (prev_count * average_cost - count * price) > 1
                    ? '建仓'
                    : (Math.abs(count) * price / (prev_count * average_cost - count * price) * 100).toFixed(2) + '%'
                  : '-'
              }</td>
              <td>{ratio}</td>
              <td>{TYPE[type]}</td>
              <td>
                <Button size="sm" onClick={() => remove(id)}>删除</Button>
                {' '}
                <Button size="sm" onClick={() => modify(d)}>修改</Button>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      <Modal show={visible} onExiting={() => setData(initData)}>
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
