const hospitalList = document.querySelector(".label2")
let hospitalListArray =[]
    // console.log(hospitalList, "here");
         var map_6f4da4b1b3815a0e3f371396e83cfdc1 = L.map(
                "map_6f4da4b1b3815a0e3f371396e83cfdc1", {
                center: [19.2063, 72.8746],
                crs: L.CRS.EPSG3857,
                zoom: 18,
                zoomControl: true,
                preferCanvas: false,
            }
            );

            // Add tile layer
            var tile_layer_7b3a45282cca5101f51bc2b1fefbc13b = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                "attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.",
                "detectRetina": false,
                "maxNativeZoom": 18,
                "maxZoom": 18,
                "minZoom": 0,
                "noWrap": false,
                "opacity": 1,
                "subdomains": "abc",
                "tms": false
            }
            ).addTo(map_6f4da4b1b3815a0e3f371396e83cfdc1);

            // Create a feature group to hold markers
            var feature_group_ab449534ca1a71644dee1bb2aee6b453 = L.featureGroup({}).addTo(map_6f4da4b1b3815a0e3f371396e83cfdc1);

            // Add a marker for the user's location
            var userMarker = null;

            // Function to handle geolocation
            function onLocationFound(e) {
                var radius = e.accuracy / 2;
                var latitude = e.latlng.lat;
                var longitude = e.latlng.lng;
                 findNearbyHospitals(latitude, longitude)
                    // Use the latitude, longitude, and radius values as needed
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                console.log("Radius:", radius);
               
              
                if (userMarker) {
                    map_6f4da4b1b3815a0e3f371396e83cfdc1.removeLayer(userMarker);
                }
                
                userMarker = L.marker(e.latlng).addTo(map_6f4da4b1b3815a0e3f371396e83cfdc1)
                    .bindPopup("You are within " + radius + " meters from this point").openPopup();

                L.circle(e.latlng, radius).addTo(map_6f4da4b1b3815a0e3f371396e83cfdc1);
            }

            // Function to handle geolocation error
            function onLocationError(e) {
                alert(e.message);
            }

            // Options for geolocation
            var geolocationOptions = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            // Try to get user's location
            map_6f4da4b1b3815a0e3f371396e83cfdc1.on('locationfound', onLocationFound);
            map_6f4da4b1b3815a0e3f371396e83cfdc1.on('locationerror', onLocationError);
            map_6f4da4b1b3815a0e3f371396e83cfdc1.locate(geolocationOptions);

            // Additional code for markers and routing control can go here

            
    function findNearbyHospitals(latitude, longitude) {
            // Construct Overpass query to search for hospitals within a bounding box
            var overpassQuery = `[out:json];
    (
        node["amenity"="hospital"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
        way["amenity"="hospital"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
        relation["amenity"="hospital"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
    );
    out;`;

            // Encode the query
            var encodedQuery = encodeURIComponent(overpassQuery);

            // URL for Overpass API
            var overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;

            // Fetch hospitals using Overpass API
            fetch(overpassUrl)
                .then(response => response.json())
                .then(data => {
                    // Parse the JSON response and extract hospital information
                    var hospitals = [];

                    data.elements.forEach(element => {
                        if (element.tags && element.tags.amenity === "hospital") {
                            var hospital = {
                                name: element.tags.name,
                                lat: element.lat,
                                lon: element.lon
                            };
                            hospitals.push(hospital);
                        }
                    });

                    // Limit the number of hospitals to 10
                    hospitals = hospitals.slice(0, 10);

                    // Process the list of nearby hospitals
                    if (hospitals.length > 0) {
                        console.log("Nearby hospitals:");
                        // console.log(hospitals);
                        hospitals.forEach(hospital => {
                            hospitalListArray.push(hospital)
                        });
                    } else {
                        console.log("No hospitals found nearby.");
                    }
                })
                .catch(error => {
                    console.error('Error fetching nearby hospitals:', error);
                });
        }

        console.log(hospitalListArray, "array");
    //creating hospital list
  




// typing Animation
var typed = new Typed(".typing",{
    strings:["GIVE WAY TO AMBULANCE","SAVE LIVES!!"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})

// aside
const nav = document.querySelector(".nav");
       navList = nav.querySelectorAll("li"),
       totalNavList = navList.length,
       allSection = document.querySelectorAll(".section"),
       totalSection = allSection.length;

       for(let i=0;i<totalNavList;i++)
       {

           const a = navList[i].querySelector("a");
           a.addEventListener("click", function()
        {
                    removeBackSection();
                    for(let j=0;j<totalNavList;j++)
                    {
                        if(navList[j].querySelector("a").classList.contains("active"))
                        {
                            addBackSection(j);
                        //   allSection[j].classList.add("back-section");
                        }
                        navList[j].querySelector("a").classList.remove("active");
                    }
                       this.classList.add("active")
                       showSection(this);
                       if(window.innerWidth < 1200)
                       {
                           asideSectionTogglerBtn();
                       }

           })

       }

       function removeBackSection()
        {
            for(let i=0;i<totalSection;i++)
              {
                allSection[i].classList.remove("back-section");
              }
        }

        function addBackSection(num)
       {
            allSection[num].classList.add("back-section");
       }

       function showSection(element)
       {
           for(let i=0;i<totalSection;i++)
           {
               allSection[i].classList.remove("active");
           }
           const target = element.getAttribute("href").split("#")[1];
           document.querySelector("#" + target).classList.add("active");
       }


      function updateNav(element)
      {
          for(let i=0;i<totalNavList;i++)
          {
              navList[i].querySelector("a").classList.remove("active");
              const target = element.getAttribute("href").split("#")[1];

              if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
              {
                navList[i].querySelector("a").classList.add("active");
              }
          }
      }


      document.querySelector(".hire-me").addEventListener("click", function()
      {
          const sectionIndex = this.getAttribute("data-section-index");

          showSection(this);
          updateNav(this);
          removeBackSection();
          addBackSection(sectionIndex);
      })

      const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");
      navTogglerBtn.addEventListener("click", () =>
      {
          asideSectionTogglerBtn();
      })


      function asideSectionTogglerBtn()
      {
          aside.classList.toggle("open");
          navTogglerBtn.classList.toggle("open");
          for(let i=0;i<totalSection;i++)
          {
              allSection[i].classList.toggle("open");
          }
      }

      