import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { APP_NAME } from '../utils/constants'
import { getErrorMessage } from '../utils/errors'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ThemeToggle from '../components/ThemeToggle'

export default function Register() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim() || form.name.trim().length < 3) {
      next.name = 'Name must be at least 3 characters'
    }
    const age = Number(form.age)
    if (!form.age || Number.isNaN(age) || age < 10 || age > 100) {
      next.age = 'Age must be between 10 and 100'
    }
    if (!form.email.trim()) next.email = 'Email is required'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 3) next.password = 'Password must be at least 3 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await signup({
        name: form.name.trim(),
        age: Number(form.age),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
      toast.success('Account created successfully!')
      navigate('/chat', { replace: true })
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh">
      <div className="hidden w-1/2 flex-col justify-between bg-surface-elevated p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-text-primary">
            Join the future
            <br />
            of AI conversations.
          </h2>
          <p className="mt-4 max-w-md text-text-secondary">
            Create your account and start chatting with powerful AI models
            through a clean, professional interface.
          </p>
        </div>
        <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} {APP_NAME}</p>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:text-left">
            <div className="mb-4 flex justify-center lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-text-primary">Create account</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              placeholder="John Doe"
            />
            <Input
              label="Age"
              type="number"
              min={10}
              max={100}
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              error={errors.age}
              placeholder="25"
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              placeholder="Min 3 chars, upper, lower, special"
            />
            <Button type="submit" className="w-full" loading={loading}>
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-accent hover:text-accent-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
