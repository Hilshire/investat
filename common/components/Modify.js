import { Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useRouter } from 'next/router'

const { Group, Label, Control, Select } = Form

export default function Modify({data, setData, type, token, queryList}) {
  const router = useRouter()

  function submit(e) {
    e.preventDefault()
    if (!data.date) {
      return alert('choose date')
    }
    let p
    if (type === 'ADD') {
      p = create(data)
    }
    if (type === 'MODIFY' && data.id) {
      p = update(data)
    }
    p.then((res) => {
      if (res.status === 200) {
        queryList()
        alert('success')
      } else if (res.status === 401) {
        router.push('/login?target=' + router.pathname)
      } else {
        throw new Error('error')
      }
    }).catch(e => alert('error'))
  }
  function formatData(data) {
    data = {
      ...data,
      average_cost: data.average_cost ? data.average_cost * 10000 : undefined,
      price: data.price * 100
    }

    Object.keys(data).filter(k => !data[k]).forEach(k => delete data[k])
    return data
  }
  function create(data) {
    return fetch('/api/records', {
      method: 'post',
      headers: {token},
      body: JSON.stringify(formatData(data))
    })
  }
  function update(data) {
    return fetch('/api/record?id='+data.id, {
      method: 'put',
      headers: {token},
      body: JSON.stringify(formatData(data))
    }) 
  }

  return (
    <>
      <Form onSubmit={submit}>
        <Button type="submit"variant="outline-primary">提交</Button>
        <Group>
          <Label>组合</Label>
          <Select onChange={e => setData({ ...data, group: e.target.value }) } required value={data.group}>
            <option value={1}>定投计划</option>
            <option value={2}>股市计划</option>
            <option value={3}>ETF拯救世界</option>
          </Select>
        </Group>
        <Group>
          <Label>类型</Label>
          <Select onChange={e => setData({ ...data, type: e.target.value })} required value={data.type}>
            <option value={1}>货币基金</option>
            <option value={2}>债券基金</option>
            <option value={3}>指数基金</option>
            <option value={4}>股票</option>
          </Select>
        </Group>
        <Group>
          <Label>凭证</Label>
          <Control onChange={e => setData({...data, name: e.target.value})} required value={data.name}></Control>
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
          <Control type="number" onChange={e => setData({ ...data, price: e.target.value })} required value={data.price}></Control>
        </Group>
        <Group>
          <Label>数量</Label>
          <Control type="number" onChange={e => setData({ ...data, count: e.target.value })} required value={data.count}></Control>
        </Group>
        <Group>
          <Label>平均成本</Label>
          <Control type='number' onChange={e => setData({ ...data, average_cost: Math.round(e.target.value) })} value={Math.round(data.average_cost)}></Control>
        </Group>
        <Group>
          <Label>未统计数量</Label>
          <Control type='number' onChange={e => setData({ ...data, prev_count: e.target.value })} value={data.prev_count}></Control>
        </Group>
        <Group>
          <Label>收益率</Label>
          <Control type='number' onChange={e => setData({ ...data, ratio: e.target.value})} value={data.ratio}></Control> %
        </Group>
      </Form>
    </>
  )
}
