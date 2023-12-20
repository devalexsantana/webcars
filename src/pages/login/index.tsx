import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Input } from '../../components/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../service/firebaseConnect'
import { useEffect } from 'react'

const schema = z.object({
  email: z.string().email("Insira um email valido").nonempty("Campo email obrigatório"),
  password: z.string().nonempty("O campo senha e obrigatório")
})

type FormData = z.infer<typeof schema>

export function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({

    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(()=>{
    async function handleLogout() {
      await signOut(auth)
    }

    handleLogout();
  })

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(()=>{
      console.log("logado")
      navigate("/dashboard", {replace:true})
    }).catch((error) =>{
        console.log("error ao logar")
        console.log(error)
    })
  }

  return (
    <Container>
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
        <Link to="/" className='mb-6 max-w-sm w-full'>
          <img
            src={logoImg}
            className='w-full'

          />
        </Link>

        <form className='bg-white max-w-xl w-full rounded-lg p-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <Input
              placeholder='Digite seu e-mail'
              type='email'
              name='email'
              error={errors.email?.message}
              register={register}

            />
          </div>

          <div className='mb-3'>
            <Input
              placeholder='Digite sua senha'
              type='password'
              name='password'
              error={errors.password?.message}
              register={register}

            />
          </div>


          <button type='submit' className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>Logar</button>
        </form>
        <Link to="/register" >
           Ainda não possuio uma conta? Registre-se
        </Link>
      </div>
    </Container>
  )
}


