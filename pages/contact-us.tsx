import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from './component/layout/layout'
import Input from './component/input'
import PhoneInput from './component/phone-input'
import Image from 'next/image'
import LeftImage from '../image/leftSide.png'
import RightImage from '../image/rightSide.png'
import LeftImageSm from '../image/leftSide-sm.png'
import RightImageSm from '../image/rightSide-sm.png'
import LogoImage from '../image/Logo.png'
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
      <title>S.Sanctus: --sub title here-- </title>
      <meta name="description" content="<description here>" />
    </Head>
    <Layout>
      <section className="">
        <div className="container mx-auto">
          <div className="flex msm:flex-col md:flex-row md:justify-around msm:justify-center md:items-center w-auto">
            <div className="flex justify-center w-1/3 msm:w-auto mmd:w-auto mlg:w-auto "><Image src={LeftImageSm} alt="ssanctus" /></div>
            <div className="w-1/3 msm:w-auto mmd:w-auto mlg:w-auto">
              <div className="text-center"><Image src={LogoImage} alt="ssanctus" /></div>
              <div className="border min-w-min px-4 py-10">
                <p className="text-center font-family: Segoe UI text-3xl pb-12 mb-8 border-b-4 border-black">To -be, innovative, influential. S.Sanctus is representing fashion under a new vision</p>
                <form className="md:min-w-3/5 mx-auto" onSubmit={form.handleSubmit}>
                  <Input name="fullName" placeholder="Walter White" label="Full Name" value={form.values.fullName} onChange={form.handleChange} />
                  <Input type="email" name="email" placeholder="someone@example.com" value={form.values.email} label="Email Address" onChange={form.handleChange} />
                  <PhoneInput name="phone" placeholder="(+000)(123) 456 7890" label="Phone Number" value={form.values.phone} onChange={form.handleChange} />
                  <div className="flex justify-center pt-30">
                    <button className="btn btn-warning btn-md bg-green-400 px-10 py-5 rounded-lg font-extrabold text-2xl" type="submit" disabled={!(form.isValid && form.dirty)}>Join US</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center msm:w-auto mmd:w-auto mlg:w-auto "><Image src={RightImageSm} alt="ssanctus" /></div>
          </div>
        </div>
      </section>
    </Layout>
  </>

    // <div>
    //   <main className="w-full h-screen flex justify-center items-center">
    //     <Image src={profilePic} alt="left" />
    //     <div className="flex flex-col">
    //       <Image src={profilePic2} alt="left" className="" />
    //       <div className="border-solid border-2 border-black h-full w-full flex flex-col px-3 py-3">
    //         <div className="border-b-4 border-solid border-black w-full my-3">
    //           <div>
    //             <p className="font-4">To - Be, innovative,influential.<br />S.Sanctus is representing fashion under a new vision.</p>
    //           </div>
    //         </div>
    //         <div>
    //           <h2 className="py-2">Full name</h2>
    //           <input type="text" onChange={(e) => { setName(e.target.value) }} className="w-full border-2 border-black text-gray-900 focus:outline-none text-sm" placeholder="name" />
    //         </div>
    //         <div>
    //           <h2 className="py-2">Email</h2>
    //           <input type="text" onChange={(e) => { setEmail(e.target.value) }} className="w-full border-2 border-black text-gray-900 focus:outline-none text-sm" placeholder="email" />
    //         </div>
    //         <div>
    //           <h2 className="py-2">Phone Number</h2>
    //           <input type="text" onChange={(e) => { setPhone(e.target.value) }} className="w-full border-2 border-black text-gray-900 focus:outline-none text-sm" placeholder="phone number" />
    //         </div>
    //         <div className="flex justify-center">
    //           <input type='submit' onClick={(e) => { handleSubmit(e) }} />
    //         </div>
    //       </div>
    //     </div>
    //     <Image src={profilePic1} alt="right" />
    //   </main >
    // </div >

  )
}

export default ContactUs
