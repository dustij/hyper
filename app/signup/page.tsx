import SignupForm from '@/features/auth/components/signup-form';

export default function page() {
  return (
    <div className='grid min-h-dvh place-items-center bg-background'>
      <div className='min-w-full flex items-center flex-col gap-8'>
        <div className='flex flex-col gap-1 items-center'>
          <h1 className='text-7xl font-semibold'>HYPER</h1>
          <p className='text-caption'>Lets create your free account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
