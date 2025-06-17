import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {Link} from 'react-router-dom'

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (data) => {
    console.log(data); //Backend logic
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-black">
      <form
        className="flex flex-col gap-4 w-96 px-6 py-8 justify-center items-center text-white bg-[#111] border border-[#2a2a2a] rounded-xl"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col items-center gap-0">
          <span className="font-bold text-2xl">Create an Account</span>
          <span className="text-[#ababab]">Start your journey on DeepView.</span>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            placeholder="Your name"
            className="bg-black border border-[#2a2a2a] rounded-xl w-full px-4 py-2 outline-none"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            placeholder="name@email.com"
            className="bg-black border border-[#2a2a2a] rounded-xl w-full px-4 py-2 outline-none"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className="bg-black border border-[#2a2a2a] rounded-xl w-full px-4 py-2 outline-none"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button className="bg-white text-black px-4 py-2 w-full rounded-md cursor-pointer hover:bg-[#ffffffcc]">
          Sign Up
        </button>
        <span>Already have an account? <Link to='/login' className='underline'>Login</Link></span>
      </form>
    </div>
  );
};

export default Signup;
