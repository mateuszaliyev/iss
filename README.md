# ISS

> **Note**: This application is now being maintained by the
> [Student Research Group of Computer Science - "Code"](https://github.com/skni-kod)
> organisation under the [SpaceTag](https://github.com/skni-kod/spacetag) name.

## About

This project was submitted for the 2022
[NASA International Space Apps Challenge](https://www.spaceappschallenge.org/)
hackathon by
[500 International Space Station](https://2022.spaceappschallenge.org/challenges/2022-challenges/track-the-iss/teams/500-international-space-station)
— a team of four [Rzeszów University of Technology](https://w.prz.edu.pl/en/)'s
Computer Engineering majors and
[Student Research Group of Computer Science - "Code"](https://kod.prz.edu.pl/)
members.

We took on the
[Track the Space Station in 3D](https://2022.spaceappschallenge.org/challenges/2022-challenges/track-the-iss)
challenge. Applications that track the International Space Station are easy to
find online, but their features and capabilities vary. Our challenge was to
build and publish an open-source web application that tracks the space station
in three dimensions.

<details>
<summary>Track the Space Station in 3D challenge details</summary>

#### The Challenge

Applications that track the International Space Station are easy to find online,
but their features and capabilities vary. Your challenge is to build and publish
an open-source web application that tracks the space station in three
dimensions.

#### Background

Many space station trackers are available online, but they often have limited
features and capabilities. For example, some are bidimensional and do not
provide 3D depictions. Other trackers provide some 3D depictions but show the
Station as a dot or a 2D icon instead of a 3D model. Many that do provide full
3D depictions are desktop applications and are not readily accessible via a web
browser. And many trackers that are fully 3D and web-based are closed-source —
there's no way to access the code to learn how they work or to improve them.

Users would benefit from an open-source web application that tracks the space
station and fully depicts the Earth, the space station orbit, and the Station
itself in three dimensions.

#### Objectives

Your challenge is to use open-source software and information available from
NASA to build a feature-rich web application (i.e., an application on a website
that is accessible via a web browser — not a desktop application) that tracks
the space station and provides interactive, 3D visualizations of Earth, the
space station orbit, and the Station itself. Think about the interesting
features that someone using your app might appreciate. You can be inspired by
features available in existing apps (you may use NASA materials consistent with
the provided guidance, but be careful not to copy or infringe upon the creative
work of others), and feel free to include your own ideas, as well. Get creative!

- Your documentation should mention which NASA-produced components you utilized.
- The application should be published under an open-source license.

#### Potential Considerations

As you design your application, you may (but are not required to) consider the
following:

- Your app can provide a wide variety of useful and fun features! For example,
  your space station tracker could:
  - Allow users to browse the position of the space station across time
    (including future and past positions)
  - Predict overhead passes given a geographical location
  - Determine uplink/downlink connection availability by computing the line of
    sight to available ground stations
  - Display space debris conjunction alerts in the orbital trajectory
  - Display accurate representations of solar panel orientation
  - Include historic visualizations showing how the space station looked at
    different periods in its lifetime — from launch of its first module to the
    last module launched in 2021
- NASA produces several components that you could use when developing your app,
  including software, orbital parameters, data on ground station link
  availability, 3D models, etc. (see Resources tab at the top of the page).
- Users may need assistance to learn how to use your app; consider providing
  documentation to accompany your app.
- Don’t forget to make your web application easily accessible; e.g., users click
  on a link and then the app runs in their web browsers. You could provide the
  link to your app in documentation to accompany your app. Remember to provide
  proper attributions for data and software components you use that come from
  NASA and other parties. You could list such attributions in the documentation
  to accompany your app or in an “About” section within the app. For instance,
  if you use the NASA WorldWind and TLE.js software libraries, include them in
  your list of attributions.

Consider using your favorite search engine to look for other existing examples
of 3D space station (or satellite) tracker applications. Key words to help with
your research include:

- "WorldWindLabs SpaceBirds"
- "JSatTrak"
- stuff in space
- orbit visualization
- satellite tracker

Additional search engine key words that could yield helpful information include:

- Two-line element sets
- SGP4
- TLE.js
- Satellite.js
- ISS TLE data
- ISS orbital parameters
- NASA Near Space Network
- 3D model format converter
- Free static web publishing

*For data and resources related to this challenge, refer to the Resources tab at
the top of the page. More resources may be added before the hackathon begins.*

*NASA does not endorse any non-U.S. Government entity and is not responsible for
information contained on non-U.S. Government websites. For non-U.S. Government
websites, participants must comply with any data use parameters of that specific
website.*

</details>

### High-level Project Summary

Our main goal was to develop an universal, modular satellite tracking tool,
enabling users to see real time position of the space objects, including the
International Space Station. Our web application is built using 3D Models of
Earth, ISS and satellite points, providing real time positions and trajectories.
Application allows of adding any number of custom satellites by providing a TLE
format satellite parameters, which will be displayed over the globe. The user is
also able to see the ISS in close-up and admire the high quality NASA model. By
providing the modularity to add custom satellites, the user can adjust the tool
to their personal needs, tracking the chosen satellites in time and space.

### Detailed Project Description

Our project solves the issue of tracking satellites in three dimensions in a
readable, human friendly format - a web application. We couldn't find such a
solution which would provide the ability to add custom satellite parameters
(TLEs) to track your chosen objects in space. The application displays a globe
with satellites, including the ISS, orbiting Earth. It also displays the
trajectory of the satellite in certain time range. By the end of the hackathon
we managed to achieve a working tool, allowing users to analyze the ISS from
up-close and see custom satellite data from a certain period of time. The user
is able to check position of the satellite by providing a date in the graphical
user interface.

The application has a great educational value, teaching the user about Earth and
space science. The project itself can be easily extended to support debris data
displaying and earth-satellite connectivity.

The project was created using
[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
as a rendered for [Three.js](https://threejs.org/) library, wrapped by the
[Next.js](https://nextjs.org/) framework,
[Tailwind CSS](https://tailwindcss.com/) and
[React Query](https://tanstack.com/query/v4/docs/adapters/react-query). We
developed the solution using
[Visual Studio Code](https://code.visualstudio.com/) and its
[Live Share](https://code.visualstudio.com/learn/collaboration/live-share)
functionality.

### Space Agency Data

Our application calculates the position of the satellites and ISS using Two-Line
element parameters available on the
[CelesTrak website](http://celestrak.org/NORAD/elements/). We also utilized
NASA-produced textures and models mentioned in the [references](#references)
below.

### Hackathon Journey

Our team had no experience with Three.js library, so we had to learn everything
on the spot (that's why we mostly didn't sleep during the hackathon 🙂). We
found playing with three dimension graphics very rewarding, as we could
immediately see the effects of our work.

### References

- [International Space Station 3D Model](https://solarsystem.nasa.gov/resources/2378/international-space-station-3d-model/)
- [October, Blue Marble Next Generation w/ Topography](https://visibleearth.nasa.gov/images/74468/october-blue-marble-next-generation-w-topography)
- [Topography](https://visibleearth.nasa.gov/images/73934/topography)
- [Starmap](https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004856/starmap_random_2020_4k_print.jpg)
- [Sun Texture Map from NASA Solar Dynamics Observatory (30.4nm)](https://www.fddb.org/fulldome-images/nasa-solar-dynamics-observatory-sun-at-30-4nm/)
- [CelesTrak: Current GP Element Sets](http://celestrak.org/NORAD/elements/)

and various images:

- https://www.nasa.gov/sites/default/files/styles/946xvariable_height/public/9900389.jpg?itok=DUKSFFdQ
- https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2019/01/the_space_station_s_robotic_arm_as_it_scans_the_columbus_module/19206434-6-eng-GB/The_Space_Station_s_robotic_arm_as_it_scans_the_Columbus_module_article.gif
- https://www.nasa.gov/sites/default/files/thumbnails/image/tv-nrt.gif)
- https://www.nasa.gov/sites/default/files/thumbnails/image/kibo_installation_time_lapse_1.gif

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

Clone the repository.

```bash
git clone https://github.com/mateuszaliyev/iss.git

# or

git clone git@github.com:mateuszaliyev/iss.git
```

Go to the project directory.

```bash
cd iss
```

Install dependencies.

```bash
pnpm install
```

Generate Visual Studio Code configuration.

```bash
pnpm vscode:generate
```

Rename [`.env.example`](./.env.example) file to `.env` and replace the
placeholder values with your environment variables.

## Usage

Run the development server.

```bash
pnpm dev
```

Lint code with ESLint.

```bash
pnpm lint
```

Build application for production.

```bash
pnpm build
```

Start production server.

```bash
pnpm start
```

## Authors

- Konrad Bochenek ([@Kazan1520](https://github.com/Kazan1520))
- Mariusz Dąbrowski ([@marioooo0o](https://github.com/marioooo0o))
- Mateusz Aliyev ([@mateuszaliyev](https://github.com/mateuszaliyev))
- Mateusz Herda ([@mherda64](https://github.com/mherda64))

## License

[MIT](./LICENSE)
