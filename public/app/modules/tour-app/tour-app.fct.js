+angular.module("TourApp").factory("TourFct", [
  "WizioConfig",
  "LoadingSpinnerFct",
  "AWSFct",
  "$resource",
  "$q",
  "$state",
  "ModalBuilderFct",
  function(WizioConfig, LoadingSpinnerFct, AWSFct, $resource, $q, $state, ModalBuilderFct) {
    var oliverTour1NavPointData = {
      "Living Room": [
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Kitchen.JPG"
          ],
          x: -1.956718303847157,
          y: -11.003825509139007,
          z: 79.09135111023357
        },
        {
          name: "Bedroom",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Bedroom.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Bedroom.JPG"
          ],
          x: -28.771719389273983,
          y: -44.05539357860129,
          z: 60.10127484152777
        }
      ],
      Kitchen: [
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG"
          ],
          x: 10.100554885708416,
          y: -27.9621769489923,
          z: -74.11873755360743
        }
      ],
      Bedroom: [
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG"
          ],
          x: -57.663832475042426,
          y: -16.74474852237985,
          z: -52.738920743493566
        }
      ],
      Bathroom: [
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG"
          ],
          x: -65.95214723343491,
          y: 16.565422201566253,
          z: 41.84428654270273
        }
      ]
    };
    var demo2NavPointData = {
      Kitchen: [
        {
          name: "Living Room 1A",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG"
          ],
          x: -37.83302423438883,
          y: -23.887932263485503,
          z: 66.26118159297842
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG"
          ],
          x: 76.03126039157019,
          y: -20.516106410727943,
          z: 13.228800666034985
        },
        {
          name: "Bedroom 2B",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG"
          ],
          x: 51.46960534739629,
          y: -38.12001001395069,
          z: 47.773876110820936
        }
      ],
      "Living Room 1A": [
        {
          name: "Living Room 1B",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201B.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201B.JPG"
          ],
          x: -39.72214362283113,
          y: -61.299292629931344,
          z: 32.45309765460117
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: 79.22804207031004,
          y: -9.251616825258207,
          z: -3.305694769773291
        }
      ],
      "Living Room 1B": [
        {
          name: "Living Room 1A",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG"
          ],
          x: -39.665988883745776,
          y: -53.90104315529159,
          z: 43.70677815882279
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: -66.5980419404161,
          y: -9.143432627821513,
          z: 43.05867773192678
        }
      ],
      Entry: [
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG"
          ],
          x: -42.05202519224541,
          y: -54.04913561614946,
          z: 41.12740798167007
        },
        {
          name: "Bedroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%201A.JPG"
          ],
          x: 10.199102435578487,
          y: -40.57818657723854,
          z: 68.04321312620597
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: 55.41727665373684,
          y: -50.960070027002494,
          z: 26.7756352059294
        }
      ],
      "Bedroom 2B": [
        {
          name: "Bedroom 2A",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG"
          ],
          x: -55.187059210958736,
          y: -49.060515485102485,
          z: 30.521441559305536
        },
        {
          name: "Bathroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG"
          ],
          x: -66.10713130198664,
          y: -39.62320222997712,
          z: -21.174932529746446
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: -76.32124169747618,
          y: -7.994100023331047,
          z: -22.102090567960296
        }
      ],
      "Bedroom 2A": [
        {
          name: "Bedroom 2B",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG"
          ],
          x: -54.06252904115818,
          y: -50.47086566933213,
          z: -30.28279672393353
        },
        {
          name: "Bathroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG"
          ],
          x: -50.95977299801837,
          y: -47.96546835392181,
          z: 38.593017248554034
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG"
          ],
          x: -58.92837142149881,
          y: -21.19117567888254,
          z: 49.543212629736495
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: -46.66175585168978,
          y: -27.693564162976905,
          z: 58.57336311212281
        }
      ],
      "Bedroom 1": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG"
          ],
          x: 35.37251243975546,
          y: -48.725995092916484,
          z: 52.49567220134528
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG"
          ],
          x: 46.56283179378777,
          y: -15.807975804995202,
          z: 62.98646309731784
        }
      ],
      "Bathroom 2": [
        {
          name: "Bedroom 2A",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG"
          ],
          x: -59.5625074120316,
          y: -49.602287351455985,
          z: 19.520632794873926
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: -53.42720947173446,
          y: -58.44021503762819,
          z: -10.864597526152163
        }
      ],
      "Bathroom 1": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG"
          ],
          x: 45.03022895052353,
          y: -53.61612159724618,
          z: 38.48819550511335
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG"
          ],
          x: 31.68819824747702,
          y: -33.958101579324165,
          z: 64.96439828111268
        },
        {
          name: "Bedroom 2B",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG"
          ],
          x: 34.139137863947894,
          y: -14.584565862806524,
          z: 70.70294870033122
        }
      ],
      "Lounge 1": [],
      "Lounge 2": [],
      Lobby: [],
      "Roof Deck": [],
      Gym: [],
      "Yoga Studio": []
    };
    // {x: -34.174059151117135, y: -57.40047926997227, z: -74.29311145878253}
    var demoNavPointData = {
      Entry: [
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG"
          ],
          x: -24.67597847218936,
          y: -46.78692854842413,
          z: -59.92733005233575
        },

        //x:-93.98956625899233; y:-22.01652570489952; z:25.42540093321215
        // {
        //   name: 'Kitchen (A)',
        //   targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
        //   x: -79.48534191009881, y: -7.996181508575717, z: -1.231394385815475,
        // },
        {
          name: "Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG"
          ],
          x: -68.46727270164223,
          y: -16.224253439270964,
          z: 37.809471436886966
        },
        {
          name: "Roof Deck Entrance",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG"
          ],
          x: 75.54889871917383,
          y: 10.87510409006834,
          z: 23.66884423714624
        },
        {
          name: "Front Door",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Front%20Door.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Front%20Door.JPG"
          ],
          x: 56.18197439688711,
          y: -40.35876827036579,
          z: 40.0366500722304
        },
        {
          name: "Kitchen (B)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG"
          ],
          x: -76.43654262457481,
          y: -16.394112856986762,
          z: 16.62998325498207
        },
        // {
        //   name: 'Dining Room',
        //   targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
        //   x: -78.28087382741609, y: -7.45939489111009, z: 13.981534108014747
        // },
        {
          name: "Bedroom 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG"
          ],
          x: -45.006067271964,
          y: -37.04623242335778,
          z: 54.6268324808534
        },
        {
          name: "Kitchen Bar",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG"
          ],
          x: -73.73635041617703,
          y: -30.193910160286244,
          z: -6.282225647723552
        },
        {
          name: "Bedroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG"
          ],
          x: 72.56797742440844,
          y: -32.31454606149795,
          z: -8.642250178433015
        }

        // {
        //   name: 'navpoint2',
        //   targetImageURLs: [],
        //   x:1 , y:1 , z:1
        // },
        // {
        //   name: 'navpoint3',
        //   targetImageURLs: [],
        //   x:1 ,y:1 ,z:1
        // },
        // {
        //   name: 'navpoint4',
        //   targetImageURLs: [],
        //   x: 1 ,y:1 ,z:1
        // }
      ],
      "Kitchen Bar": [
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG"
          ],
          x: 75.68871871059841,
          y: -25.782473816847602,
          z: -0.08270511190721638
        },
        {
          name: "Kitchen (A)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG"
          ],
          x: -75.03600297688962,
          y: -25.16818881899685,
          z: -10.889205076081344
        },
        {
          name: "Kitchen (B)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG"
          ],
          x: -69.60032891093103,
          y: -23.116913375477232,
          z: 31.757896385433597
        },
        {
          name: "Bedoom 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG"
          ],
          x: 32.420980545019965,
          y: -12.15525245343724,
          z: 72.08752276687676
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG"
          ],
          x: -15.898674034228758,
          y: -21.044776483978563,
          z: 75.457641508394
        },
        {
          name: "Dining Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG"
          ],
          x: -78.82819769186337,
          y: -13.321145714945917,
          z: -0.505076087394993
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 63.62010134791568,
          y: -16.721771313732205,
          z: 45.378297158330874
        }
      ],
      "Kitchen (B)": [
        {
          name: "Kitchen (A)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG"
          ],
          x: -48.787519513153654,
          y: -62.82652408157212,
          z: -7.4907098047695655
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 24.505292763300606,
          y: -18.21877441088947,
          z: -73.90024678771728
        },
        {
          name: "Dining Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG"
          ],
          x: -23.519091475816296,
          y: -25.61284402075323,
          z: 72.00592892152646
        },
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG"
          ],
          x: -2.4030563835844796,
          y: -6.206708843438521,
          z: -79.6301996861747
        },
        {
          name: "Kitchen Bar",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG"
          ],
          x: -21.22833370791187,
          y: -20.14787087201096,
          z: -74.30595634898303
        },
        {
          name: "Bedroom 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG"
          ],
          x: 43.28457003346052,
          y: -6.447204379657471,
          z: -66.83133130213041
        }
      ],
      "Bathroom 1": [
        {
          name: "Kitchen Bar",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG"
          ],
          x: 6.693030971848671,
          y: -12.317329658804073,
          z: -78.68766750503936
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 9.823975295105372,
          y: -56.955487017069665,
          z: -55.21599043201977
        }
      ],
      "Bedroom 3": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 50.18045332136242,
          y: -40.67702848539835,
          z: 47.0406506658143
        }
      ],
      "Bedroom 1": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 80.00937821747625,
          y: -25.090949654716198,
          z: -54.183330758558924
        },
        {
          name: "Bedroom 1 Bathroom",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG"
          ],
          x: -0.1557031761603048,
          y: -30.965486528817916,
          z: -73.74047624423687
        }
      ],
      "Bedroom 1 Bathroom": [
        {
          name: "Bedroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG"
          ],
          x: 72.26494480385664,
          y: -32.5753956730429,
          z: -9.787865048768284
        },
        {
          name: "Bedroom 1 Shower",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG"
          ],
          x: 4.855732108089368,
          y: -52.04390395286445,
          z: -60.49659738204781
        }
      ],
      "Roof Deck Entrance": [
        {
          name: "Roof Deck",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG"
          ],
          x: -79.49418642311474,
          y: 5.3945502075537695,
          z: -5.6072197828780785
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 0.05398530019681987,
          y: -58.230545863678955,
          z: -54.76776861591455
        }
      ],
      "Roof Deck": [],
      "Living Room": [
        {
          name: "Bedroom 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG"
          ],
          x: -16.559508557534322,
          y: -18.966018607863727,
          z: 75.90156855580643
        },
        {
          name: "Kitchen Bar",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG"
          ],
          x: -68.15749506623037,
          y: -41.652873822733675,
          z: 2.595960581822391
        },
        {
          name: "Kitchen (A)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG"
          ],
          x: -78.66364135491956,
          y: -12.22184320548033,
          z: -7.367123469464119
        },
        {
          name: "Kitchen (B)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG"
          ],
          x: -75.94769677344792,
          y: -11.45760733958001,
          z: 21.91449809859979
        },
        {
          name: "Dining Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG"
          ],
          x: -79.14877173649712,
          y: -9.197903563110904,
          z: 4.93956007943796
        },
        {
          name: "Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG"
          ],
          x: -62.391260228010076,
          y: -8.193092188839803,
          z: 49.14899680043497
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 40.40693113139813,
          y: -30.11907306983374,
          z: 61.98436979418509
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG"
          ],
          x: -53.02284400571702,
          y: -19.009825044210427,
          z: 56.70437691540638
        }
      ],
      "Kitchen (A)": [
        {
          name: "Kitchen (B)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG"
          ],
          x: 61.9013954867453,
          y: -48.893486093078465,
          z: 12.91711028177364
        },
        {
          name: "Living Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG"
          ],
          x: -3.481202291064159,
          y: -8.478415426567702,
          z: -79.31035852415167
        },
        {
          name: "Bedroom 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG"
          ],
          x: 51.681080002757994,
          y: -18.05124061006973,
          z: -58.268406445009234
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 28.708159928112757,
          y: -17.308023206233624,
          z: -72.48070017921494
        },
        {
          name: "Roof Deck Entrance",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG"
          ],
          x: 32.02476813301238,
          y: -2.1258837127753756,
          z: -73.19165794655123
        },
        {
          name: "Dining Room",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG"
          ],
          x: 6.712230637860337,
          y: -21.369595379575518,
          z: 76.6780449564129
        }
      ],
      "Dining Room": [
        {
          name: "Kitchen (B)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG"
          ],
          x: -69.26301519227484,
          y: -30.578539364053366,
          z: -25.559731275353084
        },
        {
          name: "Kitchen (A)",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG"
          ],
          x: -74.1593098179842,
          y: -29.39548407515361,
          z: 3.8321681555662317
        }
      ],
      "Bedroom 2": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 65.13322901717494,
          y: -28.24755889365415,
          z: -36.66820985565202
        }
      ],
      "Stairs (A)": [],
      "Bedroom 1 Closet": [
        {
          name: "Bedroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG"
          ],
          x: 63.22558339336651,
          y: -39.36794452676155,
          z: -28.950850103714522
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 73.24615309040661,
          y: -28.930283773916578,
          z: -13.32986726969765
        }
      ],
      "Bedroom 1": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: 61.71177702889843,
          y: -20.14863751163123,
          z: -46.572563880591844
        },
        {
          name: "Bedroom 1 Bathroom",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG"
          ],
          x: 0.9044295011480834,
          y: -33.44669890302853,
          z: -72.55738349459274
        }
      ],
      "Bedroom 1 Bathroom": [
        {
          name: "Bedroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG"
          ],
          x: 79.14211675943608,
          y: -4.533115330487696,
          z: -9.87477422819117
        },
        {
          name: "Bedroom 1 Shower",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG"
          ],
          x: -0.21708628397924382,
          y: -30.838308588733906,
          z: -73.79588902192917
        }
      ],
      "Roof Deck Entrance": [
        {
          name: "Roof Deck",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG"
          ],
          x: -79.55640720004651,
          y: 4.699337211455989,
          z: -4.941177126756023
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: -0.865996064342045,
          y: -57.85888469044413,
          z: -55.127273847740284
        }
      ],
      "Roof Deck": [],
      "Bedroom 1 Shower": [
        {
          name: "Bedroom 1 Bathroom",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG"
          ],
          x: 34.91804456590426,
          y: -48.09891363620616,
          z: 53.379445404781826
        }
      ],
      "Front Door": [
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG"
          ],
          x: -78.61201634717985,
          y: 7.667170605794345,
          z: -11.733800187040881
        }
      ]
    };

    var pierreHageTour1 = {
      /*Done*/
      /*Done*/
      Entry: [
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG"
          ],
          x: 64.93461120223576,
          y: -28.81801525187898,
          z: 36.595094333186125
        },
        {
          name: "Living Room 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG"
          ],
          x: 71.93293375004002,
          y: -23.910354681065847,
          z: -25.263097581709278
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG"
          ],
          x: 58.680897220153604,
          y: -18.281144359388172,
          z: -51.09912865260296
        }
      ],
      Kitchen: [
        {
          name: "Living Room 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG"
          ],
          x: -37.83302423438883,
          y: -23.887932263485503,
          z: 66.26118159297842
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG"
          ],
          x: -25.831044217062676,
          y: -31.586824255323183,
          z: 68.66521387562847
        },
        {
          name: "Master Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG"
          ],
          x: 17.822633114788303,
          y: -13.395241350256228,
          z: 76.7336813220103
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG"
          ],
          x: -24.165219117161953,
          y: -12.274400954965914,
          z: 75.24467161053053
        },
        {
          name: "Living Room 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%203.JPG"
          ],
          x: 74.7275840498858,
          y: -9.480547609497696,
          z: -26.512417694071193
        },
        {
          name: "Living Room 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%202.JPG"
          ],
          x: 65.08666606040114,
          y: -28.07980357505235,
          z: 36.895728558862146
        }
        // {
        //   name: 'Balcony',
        //   targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Balcony.JPG','https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Balcony.JPG'],
        //     x:12.838403270237679, y:-17.431289456270015, z:-76.8681686822389
        // }
      ],
      /*Done*/
      "Living Room 1": [
        {
          name: "Living Room 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%202.JPG"
          ],
          x: 38.87833294607096,
          y: -56.08100144220999,
          z: -41.64851090316998
        },
        {
          name: "Living Room 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%203.JPG"
          ],
          x: 55.87096597214198,
          y: -7.425169319007493,
          z: -56.57081803714386
        },
        {
          name: "Master Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG"
          ],
          x: -8.511973929736294,
          y: -48.16198456196699,
          z: 63.182156127540836
        },
        {
          name: "Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bedroom%202.JPG"
          ],
          x: -71.67595968428014,
          y: -35.02056436468944,
          z: -3.8784278659166045
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG"
          ],
          x: -56.104401094304336,
          y: -26.685910086458268,
          z: 50.30056565099422
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG"
          ],
          x: -70.24562294666107,
          y: -27.278366609909103,
          z: 26.392633094392867
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG"
          ],
          x: -41.41791801461254,
          y: -38.09950716935994,
          z: -56.77448660473013
        }
      ],
      /*Done*/
      "Living Room 2": [
        {
          name: "Living Room 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG"
          ],
          x: -47.30962385332534,
          y: -42.15864123457259,
          z: 48.684857598471716
        },
        {
          name: "Living Room 3",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%203.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%203.JPG"
          ],
          x: 57.683594810244514,
          y: -8.837693948187994,
          z: -54.52207969813883
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG"
          ],
          x: -77.98596994216746,
          y: -17.387784741101623,
          z: 1.1409402677716256
        },
        {
          name: "Master Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG"
          ],
          x: -39.41915481184804,
          y: -11.849668973449704,
          z: 68.56231245651622
        },
        {
          name: "Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bedroom%202.JPG"
          ],
          x: -72.96260050577035,
          y: -16.246081766859852,
          z: 28.041386184778244
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG"
          ],
          x: -55.982097894322,
          y: -20.705174128487396,
          z: 53.06985965826725
        }
      ],
      /*done*/
      "Living Room 3": [
        {
          name: "Living Room 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%202.JPG"
          ],
          x: 71.1974961443066,
          y: -28.42681178115385,
          z: 22.577970808289695
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG"
          ],
          x: 48.015921457377935,
          y: -5.575952421273921,
          z: 63.63564405426527
        }
      ],
      /*done*/
      "Master Bedroom 2": [
        {
          name: "Living Room 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG"
          ],
          x: -45.43935121906715,
          y: -47.89024509756261,
          z: -44.999287155933516
        },
        {
          name: "Kitchen",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG"
          ],
          x: -63.94859693013029,
          y: -28.9774005658829,
          z: -38.15455667978502
        },
        {
          name: "Master Bedroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%201.JPG"
          ],
          x: 66.41447194155653,
          y: -33.98127953649429,
          z: -28.618410733528233
        },
        {
          name: "Master Bedroom Closet",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%20Closet.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%20Closet.JPG"
          ],
          x: 35.429269497895866,
          y: -50.71464700187471,
          z: 50.5920760343842
        }
      ],
      /*done*/
      "Master Bedroom 1": [
        {
          name: "Master Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG"
          ],
          x: 66.70382496380796,
          y: -29.941155214643164,
          z: 32.21138705862328
        },
        {
          name: "Master Bedroom Closet",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%20Closet.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%20Closet.JPG"
          ],
          x: 74.82953551414558,
          y: -27.20684802998988,
          z: -6.450209278839476
        }
      ],
      /*done*/
      "Master Bedroom Closet": [
        {
          name: "Master Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%202.JPG"
          ],
          x: 45.08146003553401,
          y: -61.0540788556294,
          z: -25.190063193059057
        },
        {
          name: "Bathroom 1",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%201.JPG"
          ],
          x: -67.63843864711573,
          y: -42.33371572449357,
          z: -4.123060534514599
        }
      ],
      /*done*/
      "Bathroom 1": [
        {
          name: "Master Bedroom Closet",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%20Closet.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Master%20Bedroom%20Closet.JPG"
          ],
          x: 63.58063414181805,
          y: -47.695456069220995,
          z: 8.3438832091549
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG"
          ],
          x: 8.968842401322949,
          y: -38.93652896006292,
          z: -69.16762256806484
        }
      ],
      "Bedroom 2": [
        {
          name: "Bathroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bathroom%202.JPG"
          ],
          x: -43.35073040122827,
          y: -49.26804546856826,
          z: -45.55393715481792
        },
        {
          name: "Entry",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Entry.JPG"
          ],
          x: 51.55403507199278,
          y: -24.147015870162246,
          z: 56.127025082533024
        }
      ],
      "Bathroom 2": [
        {
          name: "Bedroom 2",
          targetImageURLs: [
            "https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bedroom%202.JPG",
            "https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Bedroom%202.JPG"
          ],
          x: -47.7352731582462,
          y: -49.96265745768528,
          z: 40.076535939554844
        }
      ],
      // 'Balcony': [
      //   {
      //     name: 'Kitchen',
      //     targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Kitchen.JPG'],
      //     x:-61.41552223264219, y:-36.81316326686976, z:-35.61847867219822
      //   },
      // ],
      "Lounge 1": [],
      "Lounge 2": [],
      "Gym 1": [],
      "Gym 2": [],
      "Gym 3": []
    };

    var washingtonDCTourData = {
      pubid: "f11bea7a-1e53-417f-bf55-8de4ae660264",
      "Living Room": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Living%20Room.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Living%20Room.JPG"
      ],
      Kitchen: [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Kitchen.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Kitchen.JPG"
      ],
      "Downstairs Hallway": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Downstairs%20Hallway.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Downstairs%20Hallway.JPG"
      ],
      "Upstairs Hallway": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Upstairs%20Hallway.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Upstairs%20Hallway.JPG"
      ],
      "Bathroom 1": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Bathroom%201.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Bathroom%201.JPG"
      ],
      "Bathroom 2": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Bathroom%202.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Bathroom%202.JPG"
      ],
      "Bathroom 3": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Bathroom%203.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Bathroom%203.JPG"
      ],
      "Bedroom 1": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Bedroom%201.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Bedroom%201.JPG"
      ],
      "Bedroom 2": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Bedroom%202.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Bedroom%202.JPG"
      ],
      "Bedroom 3": [
        "https://cdn.wizio.co/800x400/" + this.pubid + "/Bedroom%203.JPG",
        "https://cdn.wizio.co/" + this.pubid + "/Bedroom%203.JPG"
      ]
    };

    var washingtonDCTour = {
      "Living Room": [
        {
          name: "Downstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 76.34940410768908,
          y: -7.365072051089269,
          z: -22.28424357776132
        },
        {
          name: "Upstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 21.58821060370848,
          y: 29.347160911802842,
          z: -71.1116711167352
        }
      ],
      "Downstairs Hallway": [
        {
          name: "Kitchen",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -75.24677733678249,
          y: -18.862962390454374,
          z: -19.115364200716574
        },
        {
          name: "Living Room",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 76.93746159211462,
          y: -21.38286240779331,
          z: -1.690845224339131
        },
        {
          name: "Bathroom 1",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 45.91180202124604,
          y: -46.54015192876554,
          z: -45.948053351852955
        }
      ],
      Kitchen: [
        {
          name: "Downstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -70.63974468312792,
          y: -25.854793638151428,
          z: -26.829392257350957
        }
      ],
      "Upstairs Hallway": [
        {
          name: "Living Room",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 14.433878136803814,
          y: -65.47841209529052,
          z: 43.5466293666279
        },
        {
          name: "Bedroom 3",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -77.04311042958523,
          y: -14.618318202955823,
          z: -15.305756821522653
        },
        {
          name: "Bedroom 1",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 10.415791003638475,
          y: -38.323141488709624,
          z: -69.285766495794
        },
        {
          name: "Bedroom 2",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 72.58013425927531,
          y: -33.02064817804915,
          z: -4.218058474766019
        },
        {
          name: "Bathroom 2",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 78.43989793659357,
          y: -5.905534214782643,
          z: 13.964173733222289
        }
      ],
      "Bedroom 3": [
        {
          name: "Upstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -77.44179913821007,
          y: -15.869296947918086,
          z: -11.200050334932541
        },
        {
          name: "Bathroom 3",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -66.48157432476506,
          y: -31.582009341309135,
          z: 31.1200788829713
        }
      ],
      "Bedroom 2": [
        {
          name: "Upstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 4.6190231134188,
          y: -29.193674048839274,
          z: -74.19252195068074
        }
      ],
      "Bedroom 1": [
        {
          name: "Upstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -37.268254634212894,
          y: -32.02357443828241,
          z: 63.031549930833535
        }
      ],
      "Bathroom 3": [
        {
          name: "Bedroom 3",
          targetImageURLs: washingtonDCTourData[this.name],
          x: -75.23730201039183,
          y: -23.084101303639518,
          z: 13.618266722565973
        }
      ],
      "Bathroom 2": [
        {
          name: "Upstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 74.74495796599511,
          y: -13.080070423573426,
          z: -25.15307963503159
        },
        {
          name: "Bedroom 2",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 70.59073660898059,
          y: -36.04463818287101,
          z: -10.148690170985775
        }
      ],
      "Bathroom 1": [
        {
          name: "Downstairs Hallway",
          targetImageURLs: washingtonDCTourData[this.name],
          x: 7.257166072076741,
          y: -48.22802565502748,
          z: 63.32825829852722
        }
      ]
    };
    function getContent(currentState) {
      return $q(function(resolve, reject) {
        var activeListingId;
        var apartmentPubId;
        var currentState = $state.current.name;
        var apiResource = $resource(WizioConfig.baseAPIURL + "activelisting/:activelistingid", {
          activelistingid: "@activelistingid"
        });
        if (currentState === "LandingPage") {
          activeListingId = WizioConfig.LandingPage.activeListingId();
        } else if (currentState === "Demo" || currentState === "Product") {
          activeListingId = WizioConfig.DemoPage.activeListingId();
        } else if (currentState === "ListingDemo1") {
          activeListingId = "a3885803-1100-450f-931d-fbb53b6ed410";
        } else if (currentState === "Listing") {
          activeListingId = $state.params.listingUUID;
        } else {
          activeListingId = $state.params.apitoken || $state.params.activelistingid;
          apartmentpubid = $state.params.apartmentpubid;
        }

        var query = {
          activelistingid: activeListingId
        };
        apiResource.get(query, function(results) {
          if (results.Media[0].pinRequired) {
            requestTourPasswordModal({
              activelistingid: activeListingId
            }).then(function(response) {
              console.dir(response);
              return resolve(response);
            });
          } else {
            return resolve(results);
          }
        });
      });
    }
    /**
     * Build the initial photo URL, set the inital photo index,
     * Build the floorplan URL if necessary
     * @param {Object} media   Object of photos organized by type
     * @param {[type]} SubscriptionApartmentPubId CHAR(36) - Public ID for SubscriptionApartment
     */
    function prepMedia(media) {
      var photoIndex;
      var floorplan = false;
      var progressivePhotoUrls;
      var state = $state.current.name;
      var SubscriptionApartmentPubId = media.vrphoto[0].SubscriptionApartmentPubId;
      var photoUrl;

      if (media.vrphoto[0].Floor_Plan !== null) {
        floorplan = buildFloorPlanUrl(SubscriptionApartmentPubId);
      }

      for (var i = 0; i < media.vrphoto.length; i++) {
        media.vrphoto[i].imageUrls = [
          WizioConfig.CLOUDFRONT_DISTRO +
            "800x400/" +
            SubscriptionApartmentPubId +
            "/" +
            media.vrphoto[i].title +
            ".JPG",
          WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + media.vrphoto[i].title + ".JPG"
        ];
        media.vrphoto[i].floorplan = floorplan;
      }

      return media;
    }

    function requestTourPasswordModal(data) {
      return $q(function(resolve, reject) {
        ModalBuilderFct.buildComplexModal(
          "md",
          "public/app/modules/unitapp/viewtemplates/pinrequired.modal.html",
          "PinRequiredModalCtrl",
          data
        ).then(function(response) {
          return resolve(response);
        });
      });
    }

    function buildFloorPlanUrl(SubscriptionApartmentPubId) {
      var floorplan = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/floorplan.png";
      return floorplan;
    }
    return {
      prepMedia: prepMedia,
      getContent: getContent,
      demoNavPointData: demoNavPointData,
      demo2NavPointData: demo2NavPointData,
      pierreHageTour1: pierreHageTour1,
      washingtonDCTour: washingtonDCTour
    };
  }
]);
