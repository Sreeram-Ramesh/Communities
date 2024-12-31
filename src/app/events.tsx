"use client"
import React from 'react';
import events from '../data/events.json';
import { MapPin } from 'phosphor-react';

type EventCardProps = {
    communityname: string;
    title: string;
    date: string;
    location: string;
    venue: string;
    link: string;
};

const Events = () => {
    const EventCard: React.FC<EventCardProps> = ({ communityname, title, date, location, venue, link }) => (
        <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:shadow-md transition-shadow border rounded-lg"
    >
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="inline-block bg-white border-2 border-black text-black text-xs px-2 py-1 rounded-md">
                {communityname}
            </div>

            <h3 className="text-xl text-black font-medium mt-3 mb-2">{title}</h3>

            <div className="flex-row items-center text-sm text-gray-600 space-y-2">
                <div className='flex items-center space-x-2'>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                        {location}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                        {date}
                    </span>
                </div>

                <span className="text-xs flex items-start pt-8 mb-2">
                    <MapPin size={16} />
                    {venue}
                </span>
            </div>
        </div>
        </a>
    );

    const monthlyEvents = events.filter(event => {
        const currentDate = new Date();
        const eventDate = new Date(event.eventDate);
        return eventDate.getMonth() === currentDate.getMonth(); 
    });

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        const currentDate = new Date();
    
        const eventYear = eventDate.getFullYear();
        const currentYear = currentDate.getFullYear();
        const eventMonth = eventDate.getMonth();
        const currentMonth = currentDate.getMonth();

        return (eventYear === currentYear && eventMonth > currentMonth) || (eventYear > currentYear);
    });
    

    return (
        <main className="p-4 mx-4 md:mx-8 lg:mx-16 bg-white rounded-xl">
            <section>
                <h2 className="text-lg font-normal mb-3 ">
                    <span className='text-black font-semibold text-[30px]'>this month</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {monthlyEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            communityname={event.communityName}
                            location={event.location}
                            title={event.eventName}
                            date={event.eventDate}
                            venue={event.eventVenue}
                            link={event.eventLink}
                        />
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-lg font-normal mb-3 ">
                    <span className='text-black font-semibold text-[30px]'>upcoming</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {upcomingEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            communityname={event.communityName}
                            title={event.eventName}
                            location={event.location}
                            date={event.eventDate}
                            venue={event.eventVenue}
                            link={event.eventLink}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Events;
