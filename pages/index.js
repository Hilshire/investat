import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

const { Group, Label, Control, Select } = Form


export default function Home() {
  const [list, setList] = useState([])
  const [data, setData] = useState({ group: 1, type: 1 })
  useEffect(() => {
    fetch('/api/records').then(async res => {
      setList(await res.json())
    })
  }, [])

  function submit(e) {
    e.preventDefault()
    if (!data.date) {
      return alert('choose date')
    }

    fetch('/api/records', {
      method: 'post',
      body: JSON.stringify(data)
    }).then((res) => {
      if(res.status === 200)
        alert('success')
    })
  }

  return (
    <>
      {JSON.stringify(data)}
      <Form onSubmit={submit}>
        <Button type="submit"variant="outline-primary">提交</Button>
        <Group>
          <Label>组合</Label>
          <Select onChange={e => setData({ ...data, group: e.target.value }) } required defaultValue={1}>
            <option value={1}>定投计划</option>
            <option value={2}>股市计划</option>
            <option value={3}>ETF拯救世界</option>
          </Select>
        </Group>
        <Group>
          <Label>类型</Label>
          <Select onChange={e => setData({ ...data, type: e.target.value })} required defaultValue={1}>
            <option value={1}>货币基金</option>
            <option value={2}>债券基金</option>
            <option value={3}>指数基金</option>
            <option value={4}>股票</option>
          </Select>
        </Group>
        <Group>
          <Label>凭证</Label>
          <Control onChange={e => setData({...data, name: e.target.value})} required></Control>
        </Group>
        <Group controlId="validationFormik03">
          <Label>Date</Label>

          <DatePicker
            className="form-control"
            selected={data.date}
            onChange={v => setData({ ...data, date: v })}
          />
        </Group>
        <Group>
          <Label>份额</Label>
          <Control type="number" onChange={e => setData({ ...data, price: e.target.value })} required></Control>
        </Group>
        <Group>
          <Label>数量</Label>
          <Control type="number" onChange={e => setData({ ...data, count: e.target.value })} required></Control>
        </Group>
        <Group>
          <Label>平均成本</Label>
          <Control type='number' onChange={e => setData({ ...data, averageCost: Math.round(e.target.value * 10000) })} required></Control>
        </Group>
        <Group>
          <Label>未统计数量</Label>
          <Control type='number' onChange={e => setData({ ...data, prevCount: e.target.value })}></Control>
        </Group>
        <Group>
          <Label>收益率</Label>
          <Control type='number' onChange={e => setData({ ...data, ratio: e.target.value})} required></Control> %
        </Group>
      </Form>
      <div>
        {JSON.stringify(list)}
      </div>
    </>
  )
}
