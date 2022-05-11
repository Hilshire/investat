import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'


export default function Home() {
  const [list, setList] = useState([])
  useEffect(() => {
    queryList()
  }, [])

  function queryList() {
    fetch('/api/records').then(async res => {
      setList(await res.json())
    })
  }

  function remove(id) {
    fetch('/api/record?id='+id, { method: 'DELETE'}).then(res => {
      if (res.status === 200) {
        queryList()
      }
    })
  }

  return (
    <>
      <Table>
        <thead>
          <tr><th>#</th><th>时间</th><th>名称</th><th>单价</th><th>份数</th><th>总价</th><th>平均成本</th><th>盈利率</th><th>操作</th></tr>
        </thead>
        <tbody>
          {list.map(({name, date, price, count, prevCount, averageCost, type, ratio, group, id}, i) => <tr key={id}>
            <td>{i+1}</td><td>{date}</td><td>{name}</td><td>{price}</td><td>{count}</td><td>cost</td><td>{averageCost}</td><td>{ratio}</td>
            <td><Button onClick={() => remove(id)}>删除</Button></td>
          </tr>)}
        </tbody>
      </Table>
      <div>
        {JSON.stringify(list)}
      </div>
    </>
  )
}
