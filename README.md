# Real-Time Bus Tracker

## Overview

This project uses asynchronous Javascript functions to provide real time bus tracking on a map.  The project pulls data from [WMATA](https://www.wmata.com) (Washington Metropolitan Area Transit Authority) using their developer API.  Users can select a desired bus route offered by WMATA and see an animated presentation of the available stops in the chosen direction.

## How To Run

1.  Once the map loads, select the bus route using the Bus Route dropdown list.  Once a route is selected, press the Enter key.  A Direction dropdown list will appear.
2.  Select a direction from the Direction dropdown list.
3.  Press the Show Stops button to see an animated view of the stops along the selected route.

## Roadmap

- [ ] Add a "Reset" button thats removes all route markers and resets the map to the default position.
- [ ] Add a "Track" button that make an API call that will provide the current position of the bus that refreshes every 15 seconds.
- [ ] Add a grid with a left pane and move the map controls off the map and into it.

## License Information

This Real-Tiime Bus Tracker is available under the MIT License.  See the LICENSE file for more info.

<a href="https://dfoxster.github.io/Bus-Tracker/site/index.html">View Demo</a>