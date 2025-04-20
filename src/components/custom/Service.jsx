import React from 'react'
import { MapPinned, CalendarClock, PlaneTakeoff, Settings2 } from 'lucide-react' // thin outline icons

function Services() {
  const services = [
    {
      id: '01',
      title: 'Smart Itinerary',
      description:
        'Get automatically generated day-wise plans tailored to your interests, preferences, and budget.',
      icon: <CalendarClock className="h-10 w-10 text-white" />,
    },
    {
      id: '02',
      title: 'Route Optimization',
      description:
        'AI ensures minimum travel time between destinations and optimal travel routes.',
      icon: <MapPinned className="h-10 w-10 text-white" />,
    },
    {
      id: '03',
      title: 'Flight & Hotel Suggestions Using Chatbot',
      description:
        'Receive real-time recommendations for the best flights and accommodations based on your trip.',
      icon: <PlaneTakeoff className="h-10 w-10 text-white" />,
    },
    {
      id: '04',
      title: 'Customizable Plans',
      description:
        'Fine-tune every part of your trip — add, remove, or reorder activities with ease.',
      icon: <Settings2 className="h-10 w-10 text-white" />,
    },
  ]

  return (
    <section className="bg-[#0e0e15] text-white py-20 px-4 md:px-20">
    <div className="text-center mb-16">
      <p className="text-md text-[#bc2a2a] uppercase tracking-wide">Our Services</p>
      <h2 className="text-4xl font-bold">AI Trip Planner Services</h2>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex bg-[#1a1a22] p-10 border border-[#2a2a2a] relative"
        >
          {/* ID on the left, vertical/rotated */}
          <div className="absolute left-4 bottom-6 text-[#333] text-4xl font-semibold opacity-10 rotate-90">
            {service.id}
          </div>
  
          {/* Icon */}
          <div className="flex-shrink-0">
            {service.icon}
          </div>
  
          {/* Content */}
          <div className="ml-8 space-y-3">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {service.description}
            </p>
            <button className="text-sm font-semibold text-white hover:underline">
              EXPLORE SERVICE
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
  
  )
}

export default Services
