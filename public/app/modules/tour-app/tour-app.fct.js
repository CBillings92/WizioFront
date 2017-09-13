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
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x:-93.98956625899233,y:-22.01652570489952, z:22.42540093321215,
        },
        {
          name: 'Bedroom 2',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG'],
          x: -85.73378545352107, y: -18.994111449978092, z: 47.530807771383174
        },
        {
          name: 'Roof Deck Entrance',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG'],
          x:94.64300310567502,
          y:12.205923147973039,
          z:29.447807895643194
        },
        {
          name: 'Front Door',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Front%20Door.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Front%20Door.JPG'],
          x: 70.73214969400897, y: -50.58012637193444, z: 49.13347276821803
        },
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -99.2179596968163, y: -11.050914799434647, z: -1.8019759987844262
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -97.54334948086938, y: -10.417950670388876, z: 18.593575131456536
        },
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: -54.860918946048535, y: -45.01809049807804, z: 70.29417245198819
        },
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: -92.87588472915432, y: -36.144163429862374, z: -5.6426962275750725
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
          x: 93.46409398941802, y: -34.87528621381217, z: 3.351127586058901
        },
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -88.44882535073965, y: -29.514226384205735, z: 35.69513962466262
        },
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -91.86421944256762, y: -30.693507299484242, z: -24.341052112145338
        },
        {
          name: 'Bedoom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: 40.29241977585142, y: -22.765596714831688, z: 88.58112154203724
        },
        {
          name: 'Bathroom 1',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bathroom%201.JPG'],
          x: -23.381003914145065, y: -28.153288409059204, z: 92.86213432065612
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -96.30448168231766, y: -25.01683690636636, z: -8.793955970249907
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
          x: -62.221798997194995, y: -77.73507776155536, z: -8.013325595688366
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 29.75489462285954, y: -22.883414532907636, z: -92.65120877374497
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -29.421166973388203, y: -31.332210609589506, z: 90.26871418606875
        },
        {
          name: 'Living Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
          x: -4.386151777794117, y: -7.762338359596566, z: -99.46515016663615
        },
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: -24.946019290105884, y: -23.479515541903936, z: -93.80555724834984
        }
      ],
      'Bathroom 1': [
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: 6.142266825288541, y: -15.680040483590444, z: -98.43965370073934
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 11.140075419583923, y: -70.57719648566797, z: -69.85432355776298
        },
      ],
      'Bedroom 3': [
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 63.780272669552225, y: -50.69078521877128, z: 57.86909364562255
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
          x: 92.64091966670057, y: -34.223749796641386, z: -14.389851404223583
        },
        {
          name: 'Bedroom 1 Shower',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%201%20Shower.JPG'],
          x: 5.494324832554579, y: -65.27195166962075, z: -75.45023690447495
        },
      ],
      'Roof Deck Entrance': [
        {
          name: 'Roof Deck',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck.JPG'],
          x: -99.32555800022469, y: 7.431523450569111, z: -7.297747091348125
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: -2.3755642780243362, y: -72.00421677659435, z: -69.1868370952269
        },
      ],
      'Roof Deck' :[],
      'Living Room': [
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: -19.144525048761267, y: -24.788606881141988, z: 94.8701649154815
        },
        {
          name: 'Kitchen Bar',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG'],
          x: -85.55792127897107, y: -51.51407933176304, z: 2.2544002988446428
        },
        {
          name: 'Kitchen (A)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(A).JPG'],
          x: -98.41627096214006, y: -14.510473427054833, z: -9.286016340471523
        },
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -95.34199248414501, y: -13.878310939841334, z: 26.0754093386381
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: -99.08675149257269, y: -12.412162484393619, z: 1.2313554443599273
        },
        {
          name: 'Bedroom 2',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%202.JPG'],
          x: -78.82549634667457, y: -11.731741833357543, z: 60.12343431200192
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 40.40693113139813, y: -30.11907306983374, z: 61.98436979418509
        },
      ],
      'Kitchen (A)': [
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: 77.9466850427132, y: -59.87169000541459, z: 17.925691662474847
        },
        {
          name: 'Living Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
          x: -3.8772093733597788, y: -11.200507495637803, z: -99.09149719139909
        },
        {
          name: 'Bedroom 3',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Bedroom%203.JPG'],
          x: 63.6584080986192, y: -22.36225801594109, z: -73.65066658837551
        },
        {
          name: 'Entry',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG'],
          x: 38.59073599432507, y: -20.980187376919343, z: -89.70164923893027
        },
        {
          name: 'Roof Deck Entrance',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Roof%20Deck%20Entrance.JPG'],
          x: 39.375078691120244, y: -3.3356739209387927, z: -91.71283511744907
        },
        {
          name: 'Dining Room',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Dining%20Room.JPG'],
          x: 9.198887750891888, y: -28.311988357441514, z: 95.3539331101097
        },
      ],
      'Dining Room': [
        {
          name: 'Kitchen (B)',
          targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20(B).JPG'],
          x: -87.18822650716697, y: -36.833947882929266, z: -31.790146181597216
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
          x: 84.6771630866282, y: -30.692620329937654, z: -43.14251728255893
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
            x: 80.00937821747625,
            y: -25.090949654716198,
            z: -54.183330758558924
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
            x: 5.494324832554579,
            y: -65.27195166962075,
            z: -75.45023690447495
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
        'Front Door': []
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
