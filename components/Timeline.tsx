import { useState } from 'react';

const Divider = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-600 w-full my-8" />
  );
};

const Year = ({ children }) => {
  return (
    <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  );
};

const Step = (props) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2 text-green-700 dark:text-green-300">
        <span className="sr-only">Check</span>
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </g>
        </svg>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {props.title}
        </p>
      </div>
      <p className="text-gray-700 dark:text-gray-400 ml-6">{props.children}</p>
    </li>
  );
};

const FullTimeline = () => (
  <>
    <Divider />
    <Year>2018</Year>
    <ul>
      <Step title="Started dsmtech.io 🤘🏻">
        Reflecting on my recent job search, I realized there wasn't a
        centralized listing of all the Des Moines tech companies. So...I created
        it.
      </Step>
      <Step title="Joined Hy-Vee 🛒">
        It was time for a change in my career, and Hy-Vee came calling. The best
        part was reducing my commute time by an hour/day.
      </Step>
    </ul>
    <Divider />
    <Year>2016</Year>
    <ul>
      <Step title="Graduated College 🎓">
        One of my most cherished accomplishments. I worked my ass off to get
        this degree.
      </Step>
      <Step title="Family Roadtrip 🚗">
        To celebrate graduating, my family and I did a road trip down the
        Pacific Coast Highway in California. An unforgettable experience.
      </Step>
      <Step title="Full-Time at Workiva">
        I was offered and accepted a full-time offer with Workiva, as well as
        the opportunity to continue my internship until graduation.
      </Step>
      <Step title="Moved to Des Moines 🏙">
        I moved Downtown DSM into a quaint 1BR apartment. Des Moines has always
        felt like home growing up ~45 minutes away.
      </Step>
    </ul>
    <Divider />
    <Year>2015</Year>
    <ul>
      <Step title="Started at Workiva 🔥">
        This internship meant a lot to me. Being able to work part-time while
        still getting my school work done was huge.
      </Step>
      <Step title="Started Tutoring Programming">
        Why not make a little extra money and sharpen my skills? I taught Python
        to ISU Freshman.
      </Step>
      <Step title="Second Internship">
        Spent the summer in (beautiful?) Cedar Rapids, IA working at Rockwell
        Collins.
      </Step>
    </ul>
    <Divider />
    <Year>2014</Year>
    <ul>
      <Step title="Took a Semester Off">
        I opted to stay at my internship full-time throughout the fall.
      </Step>
      <Step title="Landed First Internship">
        Finally felt like I understood this whole programming thing. My
        interviewing skills weren't great, but I managed to snag my first
        internship.
      </Step>
    </ul>
    <Divider />
    <Year>2011</Year>
    <ul>
      <Step title="Graduated High School">
        My hometown had about 1000 people, in total. My graduating class was 36.
      </Step>
      <Step title="Started at Iowa State University 🌪❤️">
        I've been a die-hard Cyclone fan my whole life. It was a no-brainer that
        I was going to ISU, especially since they have a great Engineering
        program.
      </Step>
      <Step title="Learned How To Program">
        CS 101. Our professor asked a simple question - "Who here has prior
        programming experience?". About 80% of the class raised their hands. I
        knew it was going to be an uphill battle from here.
      </Step>
      <Step title="Wanted To Dropout of College">
        I didn't pick up programming right away. It didn't help we learned C to
        start – I'm glad I stuck with it, though.
      </Step>
    </ul>
    <Divider />
    <Year>1998</Year>
    <ul>
      <Step title="First Computer">
        I remember many nights playing Age of Empires, Lego Island, and
        Runescape.
      </Step>
    </ul>
    <Divider />
    <Year>1997</Year>
    <ul>
      <Step title="Became a Pokémon Master">
        Every time we'd go to Target, I would beg my mom to get a pack of
        Pokémon cards. Sorry, mom.
      </Step>
    </ul>
    <Divider />
    <Year>1993</Year>
    <ul>
      <Step title="Born 👶🏼🍼" />
    </ul>
  </>
);

export default function Timeline() {
  const [isShowingFullTimeline, showFullTimeline] = useState(false);

  return (
    <>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
        Timeline
      </h3>
      <Year>2021</Year>
      <ul>
        <Step title="Joined Datadog 🐶">
          I'm extremely excited about this new role helping develop new features on Datadog
        </Step>
        <Step title="Graduate from École Polytechnique">
          After many years
        </Step>
      </ul>
      <Divider />
    </>
  );
}
