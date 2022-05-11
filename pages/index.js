import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

const { Group, Label, Control, Select } = Form


export default function Home() {
  const [list, setList] = useState([])
  const [data, setData] = useState({})
  useEffect(() => {
    fetch('/api/records').then(async res => {
      setList(await res.json())
    })
  }, [])

  return (
    <>
      {JSON.stringify(data)}
      <Form>
        <Group>
          <Label>组合</Label>
          <Select onChange={e => setData({ ...data, group: e.target.value }) }>
            <option>定投计划</option>
            <option>股市计划</option>
            <option>ETF拯救世界</option>
          </Select>
        </Group>
        <Group>
          <Label>类型</Label>
          <Select onChange={e => setData({ ...data, type: e.target.value })}>
            <option>货币基金</option>
            <option>债券基金</option>
            <option>指数基金</option>
            <option>股票</option>
          </Select>
        </Group>
        <Group>
          <Label>凭证</Label>
          <Control onChange={e => setData({...data, name: e.target.value})}></Control>
        </Group>
        <Group controlId="validationFormik03">
          <Label>Date</Label>

          <DatePicker
            className="form-control"
            onChange={v => setData({ ...data, date: v })}
            customInput={
              <input type="text" />
            }
          />
        </Group>
        <Group>
          <Label>份额</Label>
          <Control type="number" onChange={e => setData({ ...data, name: e.target.value })}></Control>
        </Group>
        <Group>
          <Label>数量</Label>
          <Control type="number" onChange={e => setData({ ...data, count: e.target.value })}></Control>
        </Group>
        <Group>
          <Label>平均成本</Label>
          <Control type='number' onChange={e => setData({ ...data, averageCost: Math.round(e.target.value * 10000) })}></Control>
        </Group>
        <Group>
          <Label>未统计数量</Label>
          <Control type='number' onChange={e => setData({ ...data, prevCount: e.target.value })}></Control>
        </Group>
        <Group>
          <Label>收益率</Label>
          <Control type='number' onChange={e => setData({ ...data, ratio: e.target.value})}></Control> %
        </Group>
      </Form>
      <div>
        {JSON.stringify(list)}
      </div>
    </>
  )
}
