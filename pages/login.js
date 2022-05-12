import { useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Button } from 'react-bootstrap'

const { Control } = Form

export default function Login() {
    const [key, setKey] = useState('')
    const router = useRouter()

    function login() {
        fetch('/api/login', { body: key, method: 'post' })
            .then(async r => {
                localStorage.setItem('token', (await r.json()).token)
                const t = new URL(location.href).searchParams.get('target')
                if (t) router.push(t)
            })
    }

    return (
        <>
            <Control type="password" value={key} onChange={e => setKey(e.target.value)}></Control>
            <Button onClick={login}>提交</Button>
        </>
    )
}