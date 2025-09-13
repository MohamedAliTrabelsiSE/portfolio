import React from 'react'

export default function MediaGallery({ images = [], videos = [] }: { images?: string[]; videos?: string[] }) {
  if (images.length === 0 && videos.length === 0) {
    return <p className='text-gray-500 text-sm'>No media added yet.</p>
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3'>
      {images.map((src, i) => (
        <img key={i} src={src} alt='project' className='rounded-xl border object-cover h-48 w-full' />
      ))}
      {videos.map((src, i) => (
        <video key={i} src={src} controls className='rounded-xl border h-48 w-full object-cover'></video>
      ))}
    </div>
  )
}
