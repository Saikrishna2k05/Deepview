import React from 'react'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="text-white h-[calc(100vh-8rem)] px-8 py-10 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <p className="text-xl leading-relaxed mb-6">
          At <span className="font-semibold">DeepView</span>, we believe that meaningful ideas deserve a space where they can be explored, expressed, and elevated.
          Our platform is built for curious minds — a place where readers find depth in every scroll, and writers share insights that go beyond the surface.
        </p>

        <p className="text-xl leading-relaxed mb-6">
          Whether you're a storyteller, a thinker, or a seeker of knowledge, DeepView invites you to:
        </p>

        <ul className="text-xl space-y-3 mb-6 pl-4 list-disc marker:text-white">
          <li><span className="font-medium">✍️ Write</span> with purpose</li>
          <li><span className="font-medium">📖 Read</span> with intent</li>
          <li><span className="font-medium">🔍 Engage</span> with depth</li>
        </ul>

        <p className="text-xl leading-relaxed mb-4">
          We’re more than a blogging platform — we’re a movement for deeper perspectives, thoughtful conversations.
        </p>

        <p className="text-xl leading-relaxed">
          <Link to="/login" className="text-blue-400 underline hover:text-blue-300">
            Join us
          </Link>
          , and dive beneath the surface.
        </p>
      </div>
    </div>
  )
}

export default About
