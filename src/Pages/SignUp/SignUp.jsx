import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload } from '../../api/utils'
import { FaGoogle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../../hooks/useAxiosPublic'

const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const { handleSignUp, updateUserProfile, handleGoogleLogin, loading, user } = useAuth()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { name, email, password, image } = data;
      const photoURL = await imageUpload(image[0]);
      const result = await handleSignUp(email, password);
      await updateUserProfile(name, photoURL);
      const userInfo = {
        name: name,
        email: email,
        photoURL,
        badge: 'bronze'
      }
      axiosPublic.post('/users', userInfo)
        .then(res => {
          if (res.data.insertedId) {
            reset()
            toast.success('Signup Successful');
            navigate('/');
          }
        })
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const data = await handleGoogleLogin()
      const userInfo = {
        name: data.user.displayName,
        email: data.user.email
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res.data);
        toast.success('Signup Successful');
        navigate('/');  
      })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter Your Name Here"
                className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-lime-500 bg-gray-200 text-gray-900`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                type='file'
                id='image'
                {...register('image', { required: 'Image is required' })}
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter Your Email Here"
                className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-lime-500 bg-gray-200 text-gray-900`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                id='password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                placeholder="*******"
                className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-lime-500 bg-gray-200 text-gray-900`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FaGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/signIn'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
