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
          name: 'Bedoom 3',
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
          x: 0.19169354216278028, y: -39.330158622092924, z: -91.8884056859725
        },
      ],
      'Bedroom 1 Bathroom': [
        {
          name: 'Bedroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG'],
          x: 73.50834370112983, y: -28.820307152537232, z: -11.933460784355878
        },
        {
          name: 'Bedroom 1 Shower',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG'],
          x: 4.279531818032266, y: -51.50969009239002, z: -60.95991573080533
        },
      ],
      'Roof Deck Entrance': [
        {
          name: 'Roof Deck',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG'],
          x: -79.47425359524867, y: 5.535798590596353, z: -5.881667065699233
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: -1.8959450849408954, y: -56.84599939303976, z: -56.16902957428028
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
          x: 80.66833074742436, y: -48.729184909813746, z: -32.94312556104816
        },
        {
          name: 'Roof Deck Entrance',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG'],
          x: 98.65598654322956, y: 1.43010110590722, z: -15.121168249692527
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 63.780272669552225,
          y: -50.69078521877128,
          z: 57.86909364562255
        }, ],
        'Bedroom 1': [{
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
            x:61.71177702889843, y:-20.14863751163123, z:-46.572563880591844
          },
          {
            name: 'Bedroom 1 Bathroom',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG'],
            x: 0.19169354216278028,
            y: -39.330158622092924,
            z: -91.8884056859725
          },
        ],
        'Bedroom 1 Bathroom': [{
            name: 'Bedroom 1',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201.JPG'],
            x: 92.64091966670057,
            y: -34.223749796641386,
            z: -14.389851404223583
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
            x: -99.32555800022469,
            y: 7.431523450569111,
            z: -7.297747091348125
          },
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
            x: -2.3755642780243362,
            y: -72.00421677659435,
            z: -69.1868370952269
          },
        ],
        'Roof Deck': [],
        'Bedroom 1 Shower': [{
            name: 'Bedroom 1 Bathroom',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Bathroom.JPG'],
            x: 39.61346166965599,
            y: -61.933780893264434,
            z: 67.64490915798896
          },
          {
            name: 'Entry',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', 'https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
            x: 92.32960573290812,
            y: -35.5947480280705,
            z: -13.126615358123813
          },
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
                  // LoadingSpinnerFct.hide('vrPlayerLoader');
                  return resolve(response);
                })
            } else {
              // LoadingSpinnerFct.hide('vrPlayerLoader');
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
        console.dir('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
        console.dir(media);
        console.dir('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
        var photoIndex;
        var floorplan = false;
        var progressivePhotoUrls;
        var state = $state.current.name;
        var SubscriptionApartmentPubId = buildSubscriptionApartmentPubId(media)
        var photoUrl;
        console.dir('1')
        if (media.vrphoto[0].Floor_Plan !== null) {
          floorplan = buildFloorPlanUrl(SubscriptionApartmentPubId);
        }
        console.dir('2')

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

      function buildSubscriptionApartmentPubId(media) {
        var SubscriptionApartmentPubId
        if ($state.current.name === 'Demo') {
          SubscriptionApartmentPubId = media.vrphoto[0].SubscriptionApartmentPubId;

        } else {
          SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment(media.vrphoto[0].SubscriptionApartmentPubId);

        }
        return SubscriptionApartmentPubId;
      }

      function buildFloorPlanUrl(SubscriptionApartmentPubId) {
        var floorplan = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + '/floorplan.png';
        return floorplan;
      }
      return {
        prepMedia: prepMedia,
        getContent: getContent,
        demoNavPointData: demoNavPointData

      }
    }
  ])
