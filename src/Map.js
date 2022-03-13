import GoogleMapReact from 'google-map-react';
import React from "react";
import Marker from './static/Marker.tsx';
import Position from './static/Position.tsx';
import geolib from 'geolib';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends React.Component {
    static defaultProps = {
      center: {
        lat: 37.7759,
        lng: -122.4245
      },
      zoom: 13
    };
  
    render() {
      const posCords = {"lat" : 37.7759, "long": -122.4245}
      const housingMonsterCords = {"lat" : 37.76085, "long" : -122.41814}
      const deforestationMonsterCords = {"lat" : -2.81395, "long" : -62.39341}
      const goldenGateSightCords = {"lat" : 37.80841, "long" : -122.47505}
      const ferryBuildingSightCords = {"lat" : 37.79512, "long" : -122.39380}
      const sfCityHallSightCords = {"lat" : 37.77938, "long" : -122.41839}
      const alcatrazIslandSightCords = {"lat" : 37.82673, "long" : -122.42307}
      const dixieFireMonsterCords = {"lat" : 40.08915, "long" : -121.24296}

      function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      }

      return (

        <div style={{ height: '70vh', width: '95%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyD2Hi_ftU2JKYazyhEHllr4xvvfezA_ZJU' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
          
          <Position
            lat= {posCords["lat"]}
            lng= {posCords["long"]}
            name="Current Location"
            color="blue"
          />
          
          <Marker
            lat= {housingMonsterCords["lat"]}
            lng= {housingMonsterCords["long"]}
            name="Housing Monster"
            color="red"
            desc="Housing affordability in San Francisco has reached a crisis point. With rents and home prices spiraling upward since the Great Recession, there has been no shortage of policy proposals envisioned to alleviate the city’s affordability problem. However, affordable and low-income housing options continue to be in short supply in the Bay Area, especially with the dissolution of redevelopment agencies in California, which has eliminated a major source of funding for these affordable housing. Just recently, UC Berkeley was ordered by the California Supreme Court to cut enrollment by 30% to alleviate the housing crisis in the City of Berkeley. Let's fight housing insecurity and in-affordability together."
            img="buildingmonster.png"
            AssetNum="GEOS0001"
            IssueAccount="SCZQKI2IEW3HU762LFK7RNVA6IIVS23DFDH4JKW6Q737KLWRVT4KVFHY"
          />

          <Marker
            lat= {deforestationMonsterCords["lat"]}
            lng= {deforestationMonsterCords["long"]}
            name="Deforestation Monster"
            color="red"
            desc="All major tropical forests—including those in the Americas, Africa, Southeast Asia, and Indonesia—are disappearing, mostly to make way for human food production, including livestock and crops. Although tropical deforestation meets some human needs, it also has profound, sometimes devastating, consequences, including social conflict and human rights abuses, extinction of plants and animals, and climate change—challenges that affect the whole world. The South American rainforest, for example, influences regional and perhaps even global water cycles, and it's key to the water supply in Brazilian cities and neighboring countries. The Amazon actually helps furnish water to some of the soy farmers and beef ranchers who are clearing the forest. The loss of clean water and biodiversity from all forests could have many other effects we can’t foresee, touching even your morning cup of coffee. Let's fight deforestation together."
            img="deforestationmonsterpixel.png"
            AssetNum=""
            IssueAccount=""
          />

          <Marker
            lat= {dixieFireMonsterCords["lat"]}
            lng= {dixieFireMonsterCords["long"]}
            name="Dixie Wildfire Monster"
            color="red"
            desc="In late August, emergency crews in a remote forested area of Northern California battled the Dixie fire, which at nearly a million acres became the second largest fire in state history. Over several weeks, the operation grew to a scale rarely seen before: Thousands of personnel were deployed, as well as hundreds of bulldozers, aircraft and other equipment, along with millions of gallons of water and flame retardant. Officials spent more than $610 million over three months to bring the fire under control — by far the most expensive suppression campaign in California history, according to the head of Cal Fire. The Dixie fire shows that as wildfires have grown in size, so has the magnitude of the effort to combat them. But as government budgets become strained and extreme drought and the effects of climate change alter the landscape, battling megafires—massive blazes that spread quickly and burn at high intensity—is increasingly costly, raising questions about the long-term sustainability of the firefight. Let's find ways to work together to fight wildfires and more importantly, prevent them from happening in the first place."
            img="dixiefiremonsterpixel.png"
            AssetNum=""
            IssueAccount=""
          />

          <Marker
            lat= {goldenGateSightCords["lat"]}
            lng= {goldenGateSightCords["long"]}
            name="The Golden Gate Bridge"
            color="green"
            desc="The Golden Gate Bridge is an iconic structure connecting the city of San Francisco to Marin County, California. It spans almost two miles across the Golden Gate, the narrow strait where San Francisco Bay opens to meet the Pacific Ocean. The dream of connecting San Francisco to its northern neighbors became a reality when construction commenced in 1933. Given the chance for steady employment amid the Great Depression, construction crews braved treacherous conditions as the roadway and towers took shape over open water. The Golden Gate Bridge, opened to the public in 1937, has endured as a picture-perfect landmark and an engineering marvel."
            img="goldengatebridgepixel.png"
            AssetNum=""
            IssueAccount=""
          />
          
          <Marker
            lat= {ferryBuildingSightCords["lat"]}
            lng= {ferryBuildingSightCords["long"]}
            name="The Ferry Building"
            color="green"
            desc="San Francisco’s Ferry Building is one of the city’s most iconic buildings, serving as a hotspot for tourists and locals alike. It’s a center for events, pop-ups, a farmers’ market, and countless excellent merchants who sell their wares daily in the building’s many stalls. When’s the last time you explored this beautiful and famous landmark? Come on by to grab an NFT and learn more about the Ferry Building’s history!"
            img="ferrybuildingpixel.png"
            AssetNum=""
            IssueAccount=""
          />

          <Marker
            lat= {sfCityHallSightCords["lat"]}
            lng= {sfCityHallSightCords["long"]}
            name="San Francisco City Hall"
            color="green"
            desc="Affectionately known as the People’s Palace, San Francisco City Hall is the seat of government for the City and County of San Francisco and a destination historic landmark. Designed by Arthur Brown, Jr., this Beaux-Arts building originally opened in 1915 as a monument to the City Beautiful movement. It's important to remember that local governments often have a more significant impact on the lives of their residents and voters than state or even the Federal government. With the ability to impact people's day-to-day lives and quality of life, it is essential for citizens to be engaged members of the public dialogue and decision-making process."
            img="sfcityhallpixel.png"
            AssetNum="GEOS0002"
            IssueAccount="GAXT2LYVDPE5GF5OQQAJH24PU6FVZPN7RB4X35OJMMTFTBAUKMTG3J35"
          />
          
          <Marker
            lat= {alcatrazIslandSightCords["lat"]}
            lng= {alcatrazIslandSightCords["long"]}
            name="Alcatraz Island"
            color="green"
            desc="Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary. In 1969, the Indians of All Tribes occupied Alcatraz for 19 months in the name of freedom and Native American civil rights. Although the last inmates were transferred off the island in 1963, the main prison block—with its steel bars, claustrophobic (9 x 5-foot) cells, mess hall, library and dark holes, is still structurally intact. We invite you to explore Alcatraz's complex history and dark beauty. "
            img="alcatrazislandpixel.png"
            AssetNum=""
            IssueAccount=""
          />

          </GoogleMapReact>
        </div>
      );
    }
  }
  
  export default SimpleMap;