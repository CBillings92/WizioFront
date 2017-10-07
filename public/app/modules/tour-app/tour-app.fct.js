angular.module('TourApp')
  .factory('TourFct', [
    'WizioConfig',
    'LoadingSpinnerFct',
    'AWSFct',
    '$resource',
    '$q',
    '$state',
    'ModalBuilderFct',
    function(
      WizioConfig,
      LoadingSpinnerFct,
      AWSFct,
      $resource,
      $q,
      $state,
      ModalBuilderFct
    ) {
      var oliverTour1NavPointData = {
        'Living Room': [
          {
            name: 'Kitchen',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Kitchen.JPG'],
            x:-1.956718303847157, y:-11.003825509139007, z:79.09135111023357
          },
          {
            name: 'Bedroom',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Bedroom.JPG','https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Bedroom.JPG'],
            x:-28.771719389273983, y:-44.05539357860129, z:60.10127484152777
          }
        ],
        'Kitchen': [
          {
            name: 'Living Room',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG'],
            x:10.100554885708416, y:-27.9621769489923, z:-74.11873755360743
          }
        ],
        'Bedroom': [
            {
              name: 'Living Room',
              targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG'],
              x:-57.663832475042426, y:-16.74474852237985, z:-52.738920743493566
            }

        ],
        'Bathroom': [
          {
            name: 'Living Room',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/15d1881a-8e37-4139-adc7-895475c3e33f/Living%20Room.JPG'],
            x:-65.95214723343491, y:16.565422201566253, z:41.84428654270273
          }
        ]
      }
      var demo2NavPointData = {
        'Kitchen': [
          {
          name: 'Living Room 1A',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG'],
            x:-37.83302423438883, y:-23.887932263485503, z:66.26118159297842
          },
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG'],
              x:76.03126039157019, y:-20.516106410727943, z:13.228800666034985
          },
          {
            name: 'Bedroom 2B',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG'],
              x:51.46960534739629, y:-38.12001001395069, z:47.773876110820936
          }
        ],
        'Living Room 1A': [
          {
            name: 'Living Room 1B',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201B.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201B.JPG'],
            x:-39.72214362283113, y:-61.299292629931344, z:32.45309765460117
          },
          {
            name: 'Kitchen',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
            x:79.22804207031004, y:-9.251616825258207, z:-3.305694769773291
          }
        ],
        'Living Room 1B': [
            {
              name: 'Living Room 1A',
              targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Living%20Room%201A.JPG'],
              x:-39.665988883745776, y:-53.90104315529159, z:43.70677815882279
            },
            {
              name: 'Kitchen',
              targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
              x:-66.5980419404161, y:-9.143432627821513, z:43.05867773192678
            },
        ],
        'Entry': [
          {
            name: 'Bathroom 1',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG'],
            x:-42.05202519224541, y:-54.04913561614946, z:41.12740798167007
          },
          {
            name: 'Bedroom 1',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%201A.JPG'],
            x:10.199102435578487, y:-40.57818657723854, z:68.04321312620597
          },
          {
            name: 'Kitchen',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
            x:55.41727665373684, y:-50.960070027002494, z:26.7756352059294
          }
        ],
        'Bedroom 2B': [
          {
            name: 'Bedroom 2A',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG'],
            x:-55.187059210958736, y:-49.060515485102485, z:30.521441559305536
          },
          {
            name: 'Bathroom 2',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG'],
            x:-66.10713130198664, y:-39.62320222997712, z:-21.174932529746446
          },
            {
              name: 'Kitchen',
              targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
              x:-76.32124169747618, y:-7.994100023331047, z:-22.102090567960296
            }
        ],
        'Bedroom 2A': [
          {
            name: 'Bedroom 2B',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG'],
            x:-54.06252904115818, y:-50.47086566933213, z:-30.28279672393353
          },
          {
            name: 'Bathroom 2',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%202.JPG'],
            x:-50.95977299801837, y:-47.96546835392181, z:38.593017248554034
          },
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG'],
            x:-58.92837142149881, y:-21.19117567888254, z:49.543212629736495
          },
          {
            name: 'Kitchen',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
            x:-46.66175585168978, y:-27.693564162976905, z:58.57336311212281
          }

        ],
        'Bedroom 1': [
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG'],
            x:35.37251243975546, y:-48.725995092916484, z:52.49567220134528
          },
          {
            name: 'Bathroom 1',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bathroom%201.JPG'],
            x:46.56283179378777, y:-15.807975804995202, z:62.98646309731784
          },
        ],
        'Bathroom 2': [
          {
            name: 'Bedroom 2A',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202A.JPG'],
            x:-59.5625074120316, y:-49.602287351455985, z:19.520632794873926
          },
          {
            name: 'Kitchen',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
            x:-53.42720947173446, y:-58.44021503762819, z:-10.864597526152163
          }
        ],
        'Bathroom 1': [
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Entry.JPG'],
            x:45.03022895052353, y:-53.61612159724618, z:38.48819550511335
          },
          {
            name: 'Kitchen',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Kitchen.JPG'],
            x:31.68819824747702, y:-33.958101579324165, z:64.96439828111268
          },
          {
            name: 'Bedroom 2B',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG','https://d1mze0h82dkhhe.cloudfront.net/e22f3445-8ee2-41a2-8787-8d01ed44d581/Bedroom%202B.JPG'],
            x:34.139137863947894, y:-14.584565862806524, z:70.70294870033122
          }
        ],
        'Lounge 1': [],
        'Lounge 2': [],
        'Lobby': [],
        'Roof Deck': [],
        'Gym': [],
        'Yoga Studio': []
      }
      // {x: -34.174059151117135, y: -57.40047926997227, z: -74.29311145878253}
      var demoNavPointData = {
        'Entry': [{
            name: 'Living Room',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
            x: -24.67597847218936, y: -46.78692854842413, z: -59.92733005233575
          },

        //x:-93.98956625899233; y:-22.01652570489952; z:25.42540093321215
        // {
        //   name: 'Kitchen (A)',
        //   targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
        //   x: -79.48534191009881, y: -7.996181508575717, z: -1.231394385815475,
        // },
        {
          name: 'Bedroom 2',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG'],
          x: -68.46727270164223, y: -16.224253439270964, z: 37.809471436886966
        },
        {
          name: 'Roof Deck Entrance',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG'],
          x: 75.54889871917383, y: 10.87510409006834, z: 23.66884423714624
        },
        {
          name: 'Front Door',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Front%20Door.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Front%20Door.JPG'],
          x: 56.18197439688711, y: -40.35876827036579, z: 40.0366500722304
        },
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -76.43654262457481, y: -16.394112856986762, z: 16.62998325498207
        },
        // {
        //   name: 'Dining Room',
        //   targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
        //   x: -78.28087382741609, y: -7.45939489111009, z: 13.981534108014747
        // },
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: -45.006067271964, y: -37.04623242335778, z: 54.6268324808534
        },
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: -73.73635041617703, y: -30.193910160286244, z: -6.282225647723552
        },
        {
          name: 'Bedroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG'],
          x: 72.56797742440844, y: -32.31454606149795, z: -8.642250178433015
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
      'Kitchen Bar': [
        {
          name: 'Living Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
          x: 75.68871871059841, y: -25.782473816847602, z: -0.08270511190721638
        },
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -75.03600297688962, y: -25.16818881899685, z: -10.889205076081344
        },
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -69.60032891093103, y: -23.116913375477232, z: 31.757896385433597
        },
        {
          name: 'Bedoom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: 32.420980545019965, y: -12.15525245343724, z: 72.08752276687676
        },
        {
          name: 'Bathroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG'],
          x: -15.898674034228758, y: -21.044776483978563, z: 75.457641508394
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -78.82819769186337, y: -13.321145714945917, z: -0.505076087394993
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 63.62010134791568, y: -16.721771313732205, z: 45.378297158330874
        },
      ],
      'Kitchen (B)': [
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -48.787519513153654, y: -62.82652408157212, z: -7.4907098047695655
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 24.505292763300606, y: -18.21877441088947, z: -73.90024678771728
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -23.519091475816296, y: -25.61284402075323, z: 72.00592892152646
        },
        {
          name: 'Living Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
          x: -2.4030563835844796, y: -6.206708843438521, z: -79.6301996861747
        },
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: -21.22833370791187, y: -20.14787087201096, z: -74.30595634898303
        },
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: 43.28457003346052, y: -6.447204379657471, z: -66.83133130213041
        }
      ],
      'Bathroom 1': [
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: 6.693030971848671, y: -12.317329658804073, z: -78.68766750503936
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 9.823975295105372, y: -56.955487017069665, z: -55.21599043201977
        },
      ],
      'Bedroom 3': [
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 50.18045332136242, y: -40.67702848539835, z: 47.0406506658143
        },
      ],
      'Bedroom 1': [
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 80.00937821747625, y: -25.090949654716198, z: -54.183330758558924
        },
        {
          name: 'Bedroom 1 Bathroom',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG'],
          x:-0.1557031761603048, y:-30.965486528817916, z:-73.74047624423687
        },
      ],
      'Bedroom 1 Bathroom': [
        {
          name: 'Bedroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG'],
          x:72.26494480385664, y:-32.5753956730429, z:-9.787865048768284
        },
        {
          name: 'Bedroom 1 Shower',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG'],
          x:4.855732108089368, y:-52.04390395286445, z:-60.49659738204781
        },
      ],
      'Roof Deck Entrance': [
        {
          name: 'Roof Deck',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG'],
          x:-79.49418642311474, y:5.3945502075537695, z:-5.6072197828780785
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x:0.05398530019681987, y:-58.230545863678955, z:-54.76776861591455
        },
      ],
      'Roof Deck' :[],
      'Living Room': [
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: -16.559508557534322, y: -18.966018607863727, z: 75.90156855580643
        },
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: -68.15749506623037, y: -41.652873822733675, z: 2.595960581822391
        },
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -78.66364135491956, y: -12.22184320548033, z: -7.367123469464119
        },
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -75.94769677344792, y: -11.45760733958001, z: 21.91449809859979
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -79.14877173649712, y: -9.197903563110904, z: 4.93956007943796
        },
        {
          name: 'Bedroom 2',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG'],
          x: -62.391260228010076, y: -8.193092188839803, z: 49.14899680043497
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 40.40693113139813, y: -30.11907306983374, z: 61.98436979418509
        },
        {
          name: 'Bathroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG'],
          x: -53.02284400571702, y: -19.009825044210427, z: 56.70437691540638
        }
      ],
      'Kitchen (A)': [
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: 61.9013954867453, y: -48.893486093078465, z: 12.91711028177364
        },
        {
          name: 'Living Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
          x: -3.481202291064159, y: -8.478415426567702, z: -79.31035852415167
        },
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: 51.681080002757994, y: -18.05124061006973, z: -58.268406445009234
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 28.708159928112757, y: -17.308023206233624, z: -72.48070017921494
        },
        {
          name: 'Roof Deck Entrance',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG'],
          x: 32.02476813301238, y: -2.1258837127753756, z: -73.19165794655123
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: 6.712230637860337, y: -21.369595379575518, z: 76.6780449564129
        },
      ],
      'Dining Room': [
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -69.26301519227484, y: -30.578539364053366, z: -25.559731275353084
        },
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -74.1593098179842, y: -29.39548407515361, z: 3.8321681555662317
        },
      ],
      'Bedroom 2': [
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x:65.13322901717494, y:-28.24755889365415,z:-36.66820985565202
        },
      ],
      'Stairs (A)': [],
      'Bedroom 1 Closet': [
        {
          name: 'Bedroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG'],
        x:63.22558339336651, y:-39.36794452676155, z:-28.950850103714522
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
        x:73.24615309040661, y:-28.930283773916578, z:-13.32986726969765
        }, ],
        'Bedroom 1': [{
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
            x:61.71177702889843, y:-20.14863751163123, z:-46.572563880591844
          },
          {
            name: 'Bedroom 1 Bathroom',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG'],
            x:0.9044295011480834, y:-33.44669890302853, z:-72.55738349459274
          },
        ],
        'Bedroom 1 Bathroom': [{
            name: 'Bedroom 1',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG'],
          x:79.14211675943608, y:-4.533115330487696, z:-9.87477422819117
          },
          {
            name: 'Bedroom 1 Shower',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG'],
            x:-0.21708628397924382,y:-30.838308588733906, z:-73.79588902192917
          },
        ],
        'Roof Deck Entrance': [{
            name: 'Roof Deck',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG'],
            x:-79.55640720004651, y:4.699337211455989, z:-4.941177126756023
          },
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
            x:-0.865996064342045, y:-57.85888469044413, z:-55.127273847740284
          },
        ],
        'Roof Deck': [],
        'Bedroom 1 Shower': [{
            name: 'Bedroom 1 Bathroom',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG'],
            x:34.91804456590426, y:-48.09891363620616, z:53.379445404781826
          }
        ],
        'Front Door': [{
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x:-78.61201634717985, y:7.667170605794345, z:-11.733800187040881
        }]
      }
      function getContent(currentState) {
        return $q(function(resolve, reject) {
          var activeListingId;
          var apartmentPubId;
          var currentState = $state.current.name;
          var apiResource = $resource(
            WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {
              'activelistingid': '@activelistingid'
            }
          )

          if (currentState === 'LandingPage') {
            activeListingId = WizioConfig.LandingPage.activeListingId();
          } else if (currentState === 'Demo' || currentState === 'Product') {
            activeListingId = WizioConfig.DemoPage.activeListingId();
          } else {
            activeListingId = $state.params.apitoken || $state.params.activelistingid;
            apartmentpubid = $state.params.apartmentpubid;
          }

          var query = {
            activelistingid: activeListingId
          }
          apiResource.query(query, function(results) {
            if (results[0].pinRequired) {
              requestTourPasswordModal({
                  activelistingid: activeListingId
                })
                .then(function(response) {
                  return resolve(response);
                })
            } else {
              return resolve(results);
            }
          })
        })
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
            WizioConfig.CLOUDFRONT_DISTRO + '800x400/' + SubscriptionApartmentPubId + "/" + media.vrphoto[i].title + '.JPG',
            WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + media.vrphoto[i].title + '.JPG'
          ]
          media.vrphoto[i].floorplan = floorplan;
        }

        return media
      }

      function requestTourPasswordModal(data) {
        return $q(function(resolve, reject) {
          ModalBuilderFct.buildComplexModal(
              'md',
              'public/app/modules/unitapp/viewtemplates/pinrequired.modal.html',
              'PinRequiredModalCtrl',
              data
            )
            .then(function(response) {
              return resolve(response);
            })
        })
      }

      function buildFloorPlanUrl(SubscriptionApartmentPubId) {
        var floorplan = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + '/floorplan.png';
        return floorplan;
      }
      return {
        prepMedia: prepMedia,
        getContent: getContent,
        demoNavPointData: demoNavPointData,
        demo2NavPointData: demo2NavPointData
      }
    }
  ])
