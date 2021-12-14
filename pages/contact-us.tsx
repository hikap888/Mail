import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from './component/layout/layout'
import Input from './component/input'
import PhoneInput from './component/phone-input'
import Image from 'next/image'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';


interface DataProps {
  name: string,
  email: string,
  phone: string
}

const ContactUs: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const schema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
  });
  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      console.log('summbite');
      const data: DataProps = {
        name: values.fullName,
        email: values.email,
        phone: values.phone
      }
      handleSubmit(data);
    },
  });

  const handleSubmit = (data: DataProps) => {
    console.log('data == ', data)
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setPhone('')
      }
    })
  }
  return (<>
    <Head>
      <title>S.Sanctus</title>
      <meta name="description" content="<description here>" />
    </Head>
    <Layout>
      <section className="">
        <div className="container mx-auto">
          <div className="flex msm:flex-col md:flex-row md:justify-around msm:justify-center md:items-center w-auto">
            <div className="flex justify-center w-1/3 msm:w-auto mmd:w-auto mlg:w-auto "><Image src="/leftSide.png" alt="ssanctus" width={375} height={600} /></div>
            <div className="w-1/3 msm:w-auto mmd:w-auto mlg:w-auto">
              <div className="text-center mb-4"><Image src="/Logo.png" alt="ssanctus" width={300} height={72} /></div>
              <div className="border min-w-min px-4 py-5">
                <p className="text-center font-serif text-3xl pb-12 mb-8 border-b-4 border-black">To be, innovative, influential. S.Sanctus is representing fashion under a new vision</p>
                <form className="md:min-w-3/5 mx-auto" onSubmit={form.handleSubmit}>
                  <Input name="fullName" placeholder="Walter White" label="Full Name" value={form.values.fullName} onChange={form.handleChange} />
                  <Input type="email" name="email" placeholder="someone@example.com" value={form.values.email} label="Email Address" onChange={form.handleChange} />
                  <PhoneInput name="phone" placeholder="(+000)(123) 456 7890" label="Phone Number" value={form.values.phone} onChange={form.handleChange} />
                  <div className="flex justify-center">
                    <button className="btn btn-warning btn-md bg-black px-10 py-5 rounded-lg font-extrabold text-2xl text-white" type="submit" disabled={!(form.isValid && form.dirty)}>Join US</button>
                  </div>
                </form>
                <p className="text-center font-serif text-base text-gray-500 mt-6">By signing up below, you agree to stay in touch with S.Sanctus. We will use your personal information to provide you updates on our official launch.</p>
              </div>
            </div>
            <div className="flex justify-center msm:w-auto mmd:w-auto mlg:w-auto "><Image src="/rightSide.png" alt="ssanctus" width={375} height={600} /></div>
          </div>
        </div>
      </section>
    </Layout>
  </>
  )
}

export default ContactUs
